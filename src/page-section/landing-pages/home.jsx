import React from "react";
import Hero from "../../components/hero/Hero";
import AllEvents from "../event-sections/all-events/all-events";

const HomeSection = () => {
  return (
    <div className=" relative overflow-hidden z-10">
      {/* Main content (Navbar + Hero) */}
      <div className="relative z-10">
        <Hero />
      </div>

      {/* Divider */}
      <div className="relative w-full z-10">
        {/* Horizontal Line */}
        <div className="h-px w-full bg-gradient-to-r from-neutral-300 to-neutral-200 opacity-50 pointer-events-none"></div>

        {/* AAll events */}
        <div className="max-w-6xl mx-auto p-4">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
