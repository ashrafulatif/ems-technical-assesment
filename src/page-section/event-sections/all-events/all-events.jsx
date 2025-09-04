"use client";
import React, { useState, useEffect } from "react";
import mockEventsAPI from "@/utils/__api__/events";
import EventCard from "@/components/event-card/EventCard";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await mockEventsAPI.getAllMockEvents();
        console.log("data: ", data);
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
    <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto ">
      <h2 className="text-black text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-8">
        All Events
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {events.length > 0 ? (
          events.map((event, index) => (
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
