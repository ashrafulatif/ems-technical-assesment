"use client";
import React from "react";
import CustomButton from "../button/customButton";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleCreateEvent = () => {
    router.push("/create-event");
  };

  return (
    <div className="max-w-6xl mx-auto py-16 text-center min-h-screen relative z-10">
      <div className="px-4 py-2 flex flex-col items-center w-full my-20">
        <button className="bg-gray-200 text-gray-600 py-1 px-4 rounded-full border border-gray-300 hover:bg-gray-300 text-xs cursor-pointer transition duration-150 backdrop-blur-md font-bold">
          EMS just got better in September 2025?{" "}
        </button>

        <div>
          <h1 className="font-medium mt-10 text-7xl text-black tracking-tight text-center">
            Magically simplify <br />
            events and planning
          </h1>
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto">
            Create events, manage RSVPs, and keep everything organized, all in
            one place. Set up in minutes. Back to focusing on what matters.
          </p>
        </div>
        <div className="mt-10 flex items-center gap-4">
          <CustomButton label="Create Event" onClick={handleCreateEvent} />
          <CustomButton
            label="Learn More →"
            className="outline-1 outline-teal-600/50 bg-teal-600/5 hover:bg-teal-600/20"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
