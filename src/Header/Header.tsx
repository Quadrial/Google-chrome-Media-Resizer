import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="relative ">
         {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Logo and Title */}
      <div className=" relative flex items-center justify-between px-[10vw] p-4 z-10 border-b border-gray-600">
        <div className="flex items-center space-x-4">
          <img src="logo1.png" alt="Logo" className="h-12 w-12 rounded-full" />
          <h1 className="text-xl font-bold">PixiQuad</h1>
        </div>
        <nav className="flex space-x-4">
          <Link to="/image-background-remover" className="hover:text-blue-400">
            Background Remover
          </Link>
          <Link to="/media-resizer" className="hover:text-blue-400">
            Media Resizer
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
