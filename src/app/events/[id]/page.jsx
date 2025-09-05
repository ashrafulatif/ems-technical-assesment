import React from "react";
import EventDetails from "@/page-section/event-sections/event-details/event-details";

const EventDetailsPage = async ({ params }) => {
  const resolvedParams = await params;
  return <EventDetails params={resolvedParams} />;
};

export default EventDetailsPage;
