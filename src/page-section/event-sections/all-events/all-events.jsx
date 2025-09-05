"use client";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useEvents } from "@/context/EventsContext";
import EventCard from "@/components/event-card/EventCard";

const AllEvents = () => {
  const { allEvents, loading, error, filterEvents, categories } = useEvents();

  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const searchValue = watch("search");
  const categoryValue = watch("category");

  const filteredEvents = useMemo(() => {
    return filterEvents(allEvents, searchValue, categoryValue);
  }, [allEvents, searchValue, categoryValue, filterEvents]);

  if (loading)
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-gray-600">Loading events...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-center min-h-[200px]">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto">
      <h2 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8">
        All Events
      </h2>

      {/* Search and Filter Section */}
      <div className="mb-6 md:mb-8 space-y-4 md:space-y-0 md:flex md:gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-teal-600" />
          </div>
          <input
            {...register("search")}
            type="text"
            placeholder="Search events by title..."
            className="block w-full pl-10 pr-3 py-4 border border-teal-600 rounded-full leading-5 bg-teal-900/5 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 text-sm"
          />
        </div>

        <div className="md:w-48">
          <select
            {...register("category")}
            className="block w-full px-4 py-4 border border-teal-600 rounded-full bg-teal-600/5 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <EventCard key={event.id || index} event={event} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center min-h-[200px]">
            <p className="text-gray-600 text-lg">No events found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
