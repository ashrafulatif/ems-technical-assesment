"use client";
import React from "react";
import { useEvents } from "@/context/EventsContext";
import { Calendar, MapPin, Tag, Trash2 } from "lucide-react";
import EventTable from "@/components/events-table/events-table";

const MyEventsView = () => {
  const { myEvents, loading, deleteEvent, statistics } = useEvents();

  const handleDeleteEvent = async (eventToDelete) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const result = await deleteEvent(eventToDelete.id);
      if (!result.success) {
        alert("Error deleting event: " + result.error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns = [
    {
      header: "Event Title",
      key: "title",
      render: (value) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      header: "Description",
      key: "description",
      render: (value) => (
        <div className="text-gray-600 max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      header: "Date",
      key: "date",
      render: (value) => (
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
          {formatDate(value)}
        </div>
      ),
    },
    {
      header: "Location",
      key: "location",
      render: (value) => (
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
          {value}
        </div>
      ),
    },
    {
      header: "Category",
      key: "category",
      render: (value) => (
        <div className="flex items-center">
          <Tag className="h-4 w-4 mr-2 text-gray-400" />
          <span
            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
              value === "Conference"
                ? "bg-blue-100 text-blue-800"
                : value === "Workshop"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {value}
          </span>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-600">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto min-h-screen">
      <div className="mb-6 md:mb-8">
        <h1 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          My Events
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and view all your created events.
        </p>
      </div>

      {/* Events Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
        <div className="bg-teal-600/10 border border-teal-600/50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-teal-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-teal-600">Total Events</p>
              <p className="text-2xl font-semibold text-teal-900">
                {statistics.myEvents}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-sky-600/50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Tag className="h-8 w-8 text-sky-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-sky-600">Categories</p>
              <p className="text-2xl font-semibold text-sky-900">
                {statistics.categories}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-purple-600/10 border border-purple-600/50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-purple-600">Locations</p>
              <p className="text-2xl font-semibold text-purple-900">
                {statistics.locations}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <EventTable
        columns={columns}
        data={myEvents}
        onRowAction={handleDeleteEvent}
        actionLabel="Delete"
        emptyMessage="No events found. Create your first event to get started!"
      />
    </div>
  );
};

export default MyEventsView;
