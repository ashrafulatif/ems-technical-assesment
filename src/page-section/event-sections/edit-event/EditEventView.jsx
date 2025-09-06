"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEvents } from "@/context/EventsContext";
import EventForm from "@/components/event-form/EventForm";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const EditEventView = ({ params }) => {
  const { getEventById, updateEvent, isEventEditable, loading } = useEvents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const event = getEventById(params.id);
  const canEdit = isEventEditable(params.id);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const result = updateEvent(params.id, data);

      if (result.success) {
        toast.success("Event updated successfully!");
        router.push(`/events/${params.id}`);
      } else {
        console.error("Error updating event:", result.error);
        toast.error(`Error updating event: ${result.error}`);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Error updating event");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-600">Loading event details...</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px] flex-col">
          <div className="text-red-600 text-lg mb-4">Event not found</div>
          <button
            onClick={() => router.back()}
            className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!canEdit) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[400px] flex-col">
          <div className="text-red-600 text-lg mb-4">
            This event cannot be edited
          </div>
          <p className="text-gray-600 mb-4">
            Only events you created can be edited.
          </p>
          <button
            onClick={() => router.back()}
            className="flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center text-teal-600 hover:text-teal-700 font-medium mb-6 transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      <div className="mb-6 md:mb-8">
        <h1 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          Edit Event
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Update the details of your event below.
        </p>
      </div>

      {/* Form Container */}
      <div className="bg-teal-600/5 rounded-lg shadow-sm border border-teal-600/50 border-dashed p-6 md:p-8">
        <EventForm
          initialData={event}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEdit={true}
        />
      </div>

      {/* Event Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Event ID:</span> {event.id}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Created:</span>{" "}
          {new Date(event.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default EditEventView;
