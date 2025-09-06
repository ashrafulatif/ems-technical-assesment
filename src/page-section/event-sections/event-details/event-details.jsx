"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEvents } from "@/context/EventsContext";
import {
  Calendar,
  MapPin,
  Tag,
  Clock,
  ArrowLeft,
  Trash2,
  Edit,
} from "lucide-react";

const EventDetails = ({ params }) => {
  const { getEventById, deleteEvent, isEventEditable, loading } = useEvents();
  const router = useRouter();

  const event = getEventById(params.id);
  const canEdit = isEventEditable(params.id);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const result = await deleteEvent(params.id);
      if (result.success) {
        router.push("/my-events");
      } else {
        alert("Error deleting event: " + result.error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCreatedAt = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Conference":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "Workshop":
        return "bg-green-100 text-green-800 border-green-200";
      case "Meetup":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

      {/* Event Details Card */}
      <div className="bg-slate-100/90 rounded-lg shadow-sm border border-teal-700/40 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600/5 to-teal-600/30 px-6 py-8 border-b border-gray-200">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {event.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {event.createdAt && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Created {formatCreatedAt(event.createdAt)}
                  </div>
                )}
                {!canEdit && (
                  <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    API Event
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons only show lcal */}
            {canEdit && (
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => router.push(`/edit-events/${event.id}`)}
                  className="flex items-center px-3 py-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors duration-200"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Event Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center p-4 bg-blue-600/10 border border-sky-600/50 rounded-lg">
              <Calendar className="h-8 w-8 text-sky-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-sky-600">Event Date</p>
                <p className="text-lg font-semibold text-sky-900">
                  {formatDate(event.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-teal-600/10 border border-teal-600/50 rounded-lg">
              <MapPin className="h-8 w-8 text-teal-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-teal-600">Location</p>
                <p className="text-lg font-semibold text-teal-900">
                  {event.location}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-violet-600/10 border border-violet-600/50 rounded-lg">
              <Tag className="h-8 w-8 text-violet-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-violet-600">Category</p>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getCategoryColor(
                    event.category
                  )}`}
                >
                  {event.category}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {event.description}
              </p>
            </div>
          </div>

          {/* Event ID (for reference) */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              Event ID: <span className="font-mono">{event.id}</span>
              {canEdit && (
                <span className="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  Editable
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
