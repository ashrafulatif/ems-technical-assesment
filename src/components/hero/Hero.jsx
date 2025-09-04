import React from "react";
import CustomButton from "../button/customButton";

const Hero = () => {
  return (
    <div className="max-w-6xl mx-auto py-16 text-center min-h-screen relative z-10">
      <div className="px-4 py-2 flex flex-col items-center w-full my-20">
        <button className="bg-gray-200 text-gray-600 py-1 px-4 rounded-full border border-gray-300 hover:bg-gray-300 text-xs cursor-pointer transition duration-150 backdrop-blur-md font-bold">
          EMS just got better in September 2025?{" "}
        </button>

        <div>
          <h1 className="font-medium mt-10 text-7xl text-black tracking-tight text-center">
            Magically simplify <br /> accounting and taxes
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Automated bookkeeping, effortless tax filing, real‑time insights.
            Set up in 10 mins. Back to building by 3:13am.
          </p>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <CustomButton label="Start Free Trial" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
