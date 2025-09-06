import AllEvents from "@/page-section/event-sections/all-events/all-events";
import React from "react";

const AllEventsPage = () => {
  return (
    <div>
      <AllEvents />
    </div>
  );
};

export default AllEventsPage;

export const metadata = {
  title: "EMS - All Events",
  description: "View all events in the Event Management System.",
};
