"use client";
import React, { useState } from "react";
import { useEvents } from "@/context/EventsContext";
import EventForm from "@/components/event-form/EventForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateEventView = () => {
  const { createEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = createEvent(data);

      if (result.success) {
        toast.success("Event created successfully!");
        router.push("/my-events");
      } else {
        toast.error(`Error creating event: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Error creating event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          Create New Event
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Fill in the details below to create a new event.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-teal-600/5 rounded-lg shadow-sm border border-teal-600/50 border-dashed p-6 md:p-8">
        <EventForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEdit={false}
        />
      </div>
    </div>
  );
};

export default CreateEventView;
