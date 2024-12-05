import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header/Header";
import MediaResizer from "./MediaResizer/MediaResizer";
import ImageBackgroundRemover from "./MediaResizer/ImageBackgroundRemover";

const App: React.FC = () => {
  return (
    <div className="w-[550px] lg:w-full md:w-full sm:w-full h-full bg-gray-800 text-white flex flex-col">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/media-resizer" element={<MediaResizer />} />
          <Route path="/image-background-remover" element={<ImageBackgroundRemover />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
