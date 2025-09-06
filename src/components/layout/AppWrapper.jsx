import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const AppWrapper = ({ children }) => {
  return (
    <div className="radial-hero-bg relative overflow-hidden z-10">
      {/* Background lines */}
      <div className="max-w-6xl mx-auto absolute inset-0 h-full w-full">
        <div className="absolute inset-y-0 left-0 w-px h-full bg-gradient-to-b from-neutral-300 to-neutral-200 opacity-50 z-0 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-px h-full bg-gradient-to-b from-neutral-300 to-neutral-200 opacity-50 z-0 pointer-events-none"></div>
      </div>

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Page content */}
      <div className="relative z-10 mt-16">{children}</div>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default AppWrapper;
