import React from "react";
import Navbar from "../../components/navbar/navbar";
import Hero from "../../components/hero/Hero";
import Image from "next/image";
import AllEvents from "../event-sections/all-events/all-events";

const HomeSection = () => {
  return (
    <div className="radial-hero-bg relative overflow-hidden z-10">
      {/* Background lines */}
      <div className="max-w-6xl mx-auto absolute inset-0 h-full w-full">
        <div className="absolute inset-y-0 left-0 w-px h-full bg-gradient-to-b from-neutral-300 to-neutral-200 opacity-50 z-0 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-px h-full bg-gradient-to-b from-neutral-300 to-neutral-200 opacity-50 z-0 pointer-events-none"></div>
      </div>

      {/* Main content (Navbar + Hero) */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
      </div>

      {/* Divider + Image */}
      <div className="relative w-full z-10">
        {/* Horizontal Line */}
        <div className="h-px w-full bg-gradient-to-r from-neutral-300 to-neutral-200 opacity-50 pointer-events-none"></div>

        {/* Image */}
        <div className="max-w-6xl mx-auto p-4">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
