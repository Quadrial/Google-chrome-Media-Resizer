import React, { useState } from "react";

const ImageBackgroundRemover: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
      setProcessedImage(null); // Reset processed output
    }
  };

  const removeBackgroundUsingAPI = async () => {
    if (!file) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "9PY3QNF8o91AgE9fPZmGSH9H",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${errorText}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Background removal failed:", error);
        alert("Error removing background: " + error.message);
      } else {
        console.error("Unknown error:", error);
        alert("An unknown error occurred.");
      }
    }
  };

  const downloadImage = () => {
    if (processedImage) {
      const link = document.createElement("a");
      link.href = processedImage;
      link.download = "background-removed.png";
      link.click();
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-md flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Background Remover</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="mb-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      />
      {preview && (
        <div>
          <div className="mb-4 flex flex-col items-center">
            <h2 className="text-lg font-semibold">Original Image:</h2>
            <img
              src={preview}
              alt="Original Preview"
              className="max-w-full h-auto rounded-md mt-5"
            />
          </div>
          <button
            onClick={removeBackgroundUsingAPI}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-pink-500"
          >
            Remove Background
          </button>
        </div>
      )}
      {processedImage && (
        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-lg font-semibold">Processed Image:</h2>
          <img
            src={processedImage}
            alt="Processed Preview"
            className="max-w-full h-auto"
          />
          <button
            onClick={downloadImage}
            className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageBackgroundRemover;
