import { modals } from "@mantine/modals";
import Image from "next/image";
import { type FC } from "react";
import ImageEditor from "./ImageEditor";
import RequestModal from "./RequestModal";

type CardProps = {
  id: string;
  title: string;
  src: string;
};

const Card: FC<CardProps> = ({ src, title, id }) => {
  return (
    <div className="mb-4 flex h-auto max-w-full flex-col rounded-md text-lg font-extrabold shadow-md transition-shadow duration-200 ">
      <Image
        src={src}
        alt={title}
        width={400}
        height={300}
        className="w-full rounded-t-md"
      />
      <div className="flex justify-between">
        <button
          className="w-full rounded-bl-md bg-black py-4 text-center text-white transition-transform duration-100 hover:scale-105"
          onClick={() => {
            modals.open({
              children: <ImageEditor src={src} title={title} />,
              withinPortal: true,
              size: "auto",
              className: "w-fit",
            });
          }}
        >
          Edit
        </button>
        <button
          className="w-full rounded-br-md bg-white py-4 transition-transform duration-100 hover:scale-105 "
          onClick={() => {
            modals.open({
              title: "Request an edit",
              children: <RequestModal id={id} />,
            });
          }}
        >
          Request Edit
        </button>
      </div>
    </div>
  );
};

export default Card;
