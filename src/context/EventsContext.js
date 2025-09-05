"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import mockEventsAPI from "@/utils/__api__/events";

const EventsContext = createContext();

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
};

export const EventsProvider = ({ children }) => {
  // State management
  const [apiEvents, setApiEvents] = useState([]);
  const [localEvents, setLocalEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load API events
  const loadApiEvents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mockEventsAPI.getAllMockEvents();
      setApiEvents(data || []);
      setError(null);
    } catch (err) {
      console.error("Error loading API events:", err);
      setError(err.message);
      setApiEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load local events from localStorage
  const loadLocalEvents = useCallback(() => {
    try {
      const storedEvents = localStorage.getItem("events");
      const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
      setLocalEvents(parsedEvents);
    } catch (err) {
      console.error("Error loading local events:", err);
      setLocalEvents([]);
    }
  }, []);

  // Get all events (API + Local)
  const getAllEvents = useCallback(() => {
    return [...apiEvents, ...localEvents];
  }, [apiEvents, localEvents]);

  // Get only local events (My Events)
  const getMyEvents = useCallback(() => {
    return localEvents;
  }, [localEvents]);

  // Create new event (saves to localStorage)
  const createEvent = useCallback(
    (eventData) => {
      try {
        const eventId = Date.now().toString();
        const newEvent = {
          id: eventId,
          ...eventData,
          createdAt: new Date().toISOString(),
          isLocal: true, // Flag to identify local events
        };

        const updatedEvents = [...localEvents, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setLocalEvents(updatedEvents);

        return { success: true, event: newEvent };
      } catch (error) {
        console.error("Error creating event:", error);
        return { success: false, error: error.message };
      }
    },
    [localEvents]
  );

  // Update event (only local events can be updated)
  const updateEvent = useCallback(
    (eventId, updatedData) => {
      try {
        const updatedEvents = localEvents.map((event) =>
          event.id === eventId
            ? { ...event, ...updatedData, updatedAt: new Date().toISOString() }
            : event
        );

        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setLocalEvents(updatedEvents);

        return { success: true };
      } catch (error) {
        console.error("Error updating event:", error);
        return { success: false, error: error.message };
      }
    },
    [localEvents]
  );

  // Delete event (only local events can be deleted)
  const deleteEvent = useCallback(
    (eventId) => {
      try {
        const updatedEvents = localEvents.filter(
          (event) => event.id !== eventId
        );
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setLocalEvents(updatedEvents);

        return { success: true };
      } catch (error) {
        console.error("Error deleting event:", error);
        return { success: false, error: error.message };
      }
    },
    [localEvents]
  );

  // Get single event by ID (from both sources)
  const getEventById = useCallback(
    (eventId) => {
      const allEvents = getAllEvents();
      return allEvents.find(
        (event) => event.id === eventId || event.id === String(eventId)
      );
    },
    [getAllEvents]
  );

  // Check if event is editable (only local events)
  const isEventEditable = useCallback(
    (eventId) => {
      return localEvents.some(
        (event) => event.id === eventId || event.id === String(eventId)
      );
    },
    [localEvents]
  );

  // Filter events by search and category
  const filterEvents = useCallback((events, searchTerm = "", category = "") => {
    return events.filter((event) => {
      const matchesSearch =
        !searchTerm ||
        event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        !category || event.category?.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, []);

  // Get unique categories from all events
  const getCategories = useCallback(() => {
    const allEvents = getAllEvents();
    const categories = [
      ...new Set(allEvents.map((event) => event.category).filter(Boolean)),
    ];
    return categories.sort();
  }, [getAllEvents]);

  // Get statistics
  const getStatistics = useCallback(() => {
    const allEvents = getAllEvents();
    const myEvents = getMyEvents();

    return {
      total: allEvents.length,
      myEvents: myEvents.length,
      apiEvents: apiEvents.length,
      categories: getCategories().length,
      locations: [
        ...new Set(allEvents.map((event) => event.location).filter(Boolean)),
      ].length,
    };
  }, [getAllEvents, getMyEvents, apiEvents.length, getCategories]);

  // Refresh all data
  const refreshData = useCallback(async () => {
    loadLocalEvents();
    await loadApiEvents();
  }, [loadLocalEvents, loadApiEvents]);

  // Initial data load
  useEffect(() => {
    const initializeData = async () => {
      loadLocalEvents();
      await loadApiEvents();
    };

    initializeData();
  }, [loadLocalEvents, loadApiEvents]);

  // Context value
  const contextValue = {
    // State
    apiEvents,
    localEvents,
    loading,
    error,

    // Computed values
    allEvents: getAllEvents(),
    myEvents: getMyEvents(),
    categories: getCategories(),
    statistics: getStatistics(),

    // Actions
    createEvent,
    updateEvent,
    deleteEvent,
    refreshData,

    // Utility functions
    getEventById,
    isEventEditable,
    filterEvents,

    // Data loaders
    loadApiEvents,
    loadLocalEvents,
  };

  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
