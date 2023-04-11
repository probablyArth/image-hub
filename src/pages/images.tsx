import { type NextPage } from "next";
import { useState, type FC, useEffect } from "react";
import { api } from "~/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import { type Image as ImageI } from "@prisma/client";
import Card from "~/components/Card";

const divideIntoGrids = (cards: ImageI[], chunkSize: number) => {
  const res: ImageI[][] = [];
  let curr = 0;
  cards.forEach((card) => {
    if (!res[curr]) {
      res.push([card]);
    } else {
      res[curr]?.push(card);
    }

    if (curr == chunkSize - 1) {
      curr = 0;
    } else {
      curr += 1;
    }
  });
  console.log({ res });
  return res;
};

const Row: FC<{ images: ImageI[] }> = ({ images }) => {
  return (
    <div className="flex flex-col gap-2">
      {images.map((image, idx) => {
        return (
          <Card src={image.src} key={idx} title={image.title} id={image.id} />
        );
      })}
    </div>
  );
};

const Images: NextPage = () => {
  const [from, setFrom] = useState(0);
  const [images, setImages] = useState<ImageI[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const query = api.image.getAll.useQuery(
    { count: 10, from },
    { enabled: false }
  );
  console.log({ from });
  useEffect(() => {
    if (query.data) {
      if (query.data.images.length < 10) {
        setHasMore(false);
        return;
      }
      setImages((prev) => [...prev, ...query.data.images]);
    }
  }, [query]);

  useEffect(() => {
    fetchNext();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNext = () => {
    void query.refetch().then(() => setFrom((prev) => prev + 10));
  };

  if (query.isError)
    return (
      <div className="rounded-md bg-red-500 p-4 text-white shadow-sm">
        Oops! An error occurred
      </div>
    );

  if (!images) return <h1>Loading</h1>;

  return (
    <div className="bg-neutral-100 p-4">
      <InfiniteScroll
        dataLength={images.length}
        hasMore={hasMore}
        next={fetchNext}
        loader={<span />}
        endMessage={<span />}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"
      >
        {divideIntoGrids(images, 4).map((grid, idx) => {
          return <Row images={grid} key={idx} />;
        })}
      </InfiniteScroll>
      {query.isLoading && query.isPaused && (
        <h1 className="rounded-md bg-white p-4 shadow-md">Loading</h1>
      )}
      {!hasMore && (
        <h1 className="rounded-md bg-white p-4 shadow-md">
          {"Well, looks like you've reached the end my friend"}
        </h1>
      )}
    </div>
  );
};

export default Images;
