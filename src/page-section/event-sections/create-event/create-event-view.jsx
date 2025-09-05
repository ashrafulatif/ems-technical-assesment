"use client";
import React, { useState } from "react";
import { useEvents } from "@/context/EventsContext";
import { CheckCircle } from "lucide-react";
import EventForm from "@/components/event-form/EventForm";

const CreateEventView = () => {
  const { createEvent } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = createEvent(data);

      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        console.error("Error creating event:", result.error);
        alert("Error creating event: " + result.error);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event");
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

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-800 text-sm font-medium">
              Event created successfully!
            </p>
          </div>
        </div>
      )}

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
