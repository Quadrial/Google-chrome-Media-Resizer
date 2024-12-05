import React, { useState, useEffect } from "react";

interface ResizedVideo {
  src: string;
  width: number;
  height: number;
}

const MediaResizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [currentDimensions, setCurrentDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [resizedMedia, setResizedMedia] = useState<
    string | ResizedVideo | null
  >(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
      setResizedMedia(null); // Reset resized output
      setCurrentDimensions(null); // Reset current dimensions
    }
  };

  const extractDimensions = () => {
    if (file?.type.startsWith("image/")) {
      const img = new Image();
      img.src = preview!;
      img.onload = () => {
        setCurrentDimensions({ width: img.width, height: img.height });
      };
    } else if (file?.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = preview!;
      video.onloadedmetadata = () => {
        setCurrentDimensions({
          width: video.videoWidth,
          height: video.videoHeight,
        });
      };
    }
  };

  useEffect(() => {
    if (preview) {
      extractDimensions();
    }
  }, [preview]);

  const resizeMedia = () => {
    const newWidth = parseInt(width, 10);
    const newHeight = parseInt(height, 10);

    if (!newWidth || !newHeight) {
      alert("Please enter valid dimensions.");
      return;
    }

    if (file && file.type.startsWith("image/")) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.src = preview!;
      img.onload = () => {
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx?.drawImage(img, 0, 0, newWidth, newHeight);
        const resizedImage = canvas.toDataURL("image/png"); // Resized as PNG
        setResizedMedia(resizedImage);
      };
    } else if (file && file.type.startsWith("video/")) {
      setResizedMedia({ src: preview!, width: newWidth, height: newHeight });
    }
  };

  const downloadMedia = () => {
    if (typeof resizedMedia === "string") {
      // For images
      const link = document.createElement("a");
      link.href = resizedMedia;
      link.download = "resized-image.png";
      link.click();
    } else if (resizedMedia && "src" in resizedMedia) {
      // For videos (no actual resizing happens here, just a placeholder for logic)
      const link = document.createElement("a");
      link.href = resizedMedia.src;
      link.download = "resized-video.mp4"; // Adjust format if needed
      link.click();
    }
  };

  return (
    <>
      <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Media Resizer</h1>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileUpload}
          className="mb-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        />
        {preview && (
          <div>
            {currentDimensions && (
              <div className="mb-2 text-gray-700">
                <p className="text-[20px]">Current Dimensions:</p>
                <p>Width: {currentDimensions.width}px</p>
                <p>Height: {currentDimensions.height}px</p>
              </div>
            )}
            <div className="mb-4">
              {file?.type.startsWith("image/") ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full h-auto"
                />
              ) : (
                <video
                  src={preview}
                  controls
                  className="max-w-full h-auto"
                ></video>
              )}
            </div>
            <div className="flex flex-col justify-center sm:flex-row gap-2 mb-4">
              <input
                type="number"
                placeholder="Width (px)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Height (px)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              onClick={resizeMedia}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-pink-500"
            >
              Resize
            </button>
          </div>
        )}
        {resizedMedia && (
          <div className="mt-4 flex flex-col items-center ">
            <h2 className="text-lg font-semibold">Resized Media:</h2>
            {typeof resizedMedia === "string" ? (
              <img
                src={resizedMedia}
                alt="Resized"
                className="max-w-full h-auto rounded-md"
              />
            ) : (
              <video
                src={resizedMedia.src}
                width={resizedMedia.width}
                height={resizedMedia.height}
                controls
              ></video>
            )}
            <button
              onClick={downloadMedia}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Download
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MediaResizer;
