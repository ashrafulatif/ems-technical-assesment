import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(2, "Location required"),
  category: z.enum(["Conference", "Workshop", "Meetup"]),
});
