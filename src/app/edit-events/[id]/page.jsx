import EditEventView from "@/page-section/event-sections/edit-event/EditEventView";
import React from "react";

const EditEventPage = async ({ params }) => {
  const resolvedParams = await params;
  return <EditEventView params={resolvedParams} />;
};

export default EditEventPage;

export const metadata = {
  title: "EMS - Edit Event",
  description: "Edit an existing event in the Event Management System.",
};
