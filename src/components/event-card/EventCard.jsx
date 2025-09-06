import React from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const EventCard = ({ event }) => {
  const router = useRouter();

  const handleDetailView = () => {
    router.push(`/events/${event.id}`);
  };
  return (
    <div className="bg-teal-600/5 rounded-lg border border-dashed border-teal-600 hover:bg-teal-600/10 transition-colors duration-200 p-6 w-full h-full max-w-sm">
      {/* Event Badge */}
      {event.category && (
        <span className="inline-block px-3 py-1 text-xs font-medium text-teal-600 bg-teal-600/15 rounded-full mb-3">
          {event.category}
        </span>
      )}

      {/* Event Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {event.title || event.name}
      </h3>

      {/* Event Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        {/* Date */}
        {event.date && (
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
        )}

        {/* Location */}
        {event.location && (
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
        )}

        {/* Attendees
        {event.category && (
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            <span>{event.category} attendees</span>
          </div>
        )} */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-teal-600">
        {/* Action Button */}
        <button
          className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200 group cursor-pointer"
          onClick={handleDetailView}
        >
          <span className="mr-1">View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};

export default EventCard;
