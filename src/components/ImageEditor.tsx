import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type MutableRefObject,
  type FC,
} from "react";

const ImageEditor: FC<{ src: string; title: string }> = ({ src, title }) => {
  const [error, setError] = useState("");

  const imageCanvas =
    useRef<HTMLCanvasElement>() as MutableRefObject<HTMLCanvasElement | null>;

  const handleCanvasClick: MouseEventHandler = (e) => {
    const canvas = imageCanvas.current;
    if (!canvas) return setError("error loading canvas, please refresh");
    const ctx = canvas.getContext("2d");
    if (!ctx) return setError("error loading canvas");
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const radius = 10;
    ctx.clearRect(x - radius, y - radius, radius * 2, radius * 2);
  };

  const handleDownloadClick = () => {
    const canvas = imageCanvas.current;
    if (!canvas) return setError("error loading canvas");
    const link = document.createElement("a");
    link.download = "edited-image.png";
    link.href = canvas.toDataURL();
    link.click();
  };
  useEffect(() => {
    const image = new Image();
    const context = imageCanvas.current?.getContext("2d");
    if (!context) return setError("error loading canvas");
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      context.drawImage(image, 0, 0, 500, 500);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 ">
      <div>
        <h1 className="w-full rounded-sm p-4 text-center text-xl">
          Editing <mark>{title}</mark>
        </h1>
        <p className="text-center text-neutral-500">
          click on pixels below to erase them!
        </p>
      </div>
      {error && (
        <div className="w-full rounded-sm bg-red-500 p-4 text-sm text-white">
          {error}
        </div>
      )}
      <canvas
        ref={imageCanvas}
        width={500}
        onClick={handleCanvasClick}
        height={500}
      ></canvas>
      <div className="flex gap-4">
        <button
          onClick={handleDownloadClick}
          className="rounded-sm bg-black p-4 font-bold text-white"
        >
          Download edited image
        </button>
      </div>
    </div>
  );
};

export default ImageEditor;
