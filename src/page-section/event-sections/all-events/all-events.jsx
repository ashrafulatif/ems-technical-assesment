"use client";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { useEvents } from "@/context/EventsContext";
import EventCard from "@/components/event-card/EventCard";
import Pagination from "@/components/pagination/pagination";

const AllEvents = () => {
  const { allEvents, loading, error, filterEvents, categories } = useEvents();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const { register, watch } = useForm({
    defaultValues: {
      search: "",
      category: "",
    },
  });

  const searchValue = watch("search");
  const categoryValue = watch("category");

  // Filter events on search and category
  const filteredEvents = useMemo(() => {
    return filterEvents(allEvents, searchValue, categoryValue);
  }, [allEvents, searchValue, categoryValue, filterEvents]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = startIndex + eventsPerPage;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, categoryValue]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      <div className="mb-6 md:mb-8">
        <h2 className="text-neutral-800 text-xl md:text-2xl lg:text-3xl font-semibold mb-2">
          All Events
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Discover and explore events from our platform and your created events.
        </p>
      </div>

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

      {/* Results Info */}
      {filteredEvents.length > 0 && (
        <div className="mb-6 flex justify-between items-center text-sm text-gray-600">
          <span>
            Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)}{" "}
            of {filteredEvents.length} events
          </span>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {currentEvents.length > 0 ? (
          currentEvents.map((event, index) => (
            <EventCard key={event.id || index} event={event} />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-2">No events found.</p>
              <p className="text-gray-500 text-sm">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllEvents;
