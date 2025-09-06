"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/lib/validations";
import { Calendar, MapPin, Tag, FileText, Type } from "lucide-react";

const EventForm = ({
  onSubmit,
  isSubmitting,
  initialData = null,
  isEdit = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      date: initialData?.date || "",
      location: initialData?.location || "",
      category: initialData?.category || "",
    },
  });

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        description: initialData.description,
        date: initialData.date,
        location: initialData.location,
        category: initialData.category,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    // Only reset form after creation not editing
    if (!isEdit) {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Event Title
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Type className="h-5 w-5 text-teal-600" />
          </div>
          <input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Enter event title..."
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-teal-900/5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm ${
              errors.title ? "border-red-500" : "border-teal-600"
            }`}
          />
        </div>
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <FileText className="h-5 w-5 text-teal-600" />
          </div>
          <textarea
            {...register("description")}
            id="description"
            rows={4}
            placeholder="Describe your event..."
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-teal-900/5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm resize-none ${
              errors.description ? "border-red-500" : "border-teal-600"
            }`}
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Date and Location Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date Field */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Event Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-teal-600" />
            </div>
            <input
              {...register("date")}
              type="date"
              id="date"
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-teal-900/5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm ${
                errors.date ? "border-red-500" : "border-teal-600"
              }`}
            />
          </div>
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        {/* Location Field */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-teal-600" />
            </div>
            <input
              {...register("location")}
              type="text"
              id="location"
              placeholder="Enter location..."
              className={`block w-full pl-10 pr-3 py-3 border rounded-lg leading-5 bg-teal-900/5 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm ${
                errors.location ? "border-red-500" : "border-teal-600"
              }`}
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>
      </div>

      {/* Category Field */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Category
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Tag className="h-5 w-5 text-teal-600" />
          </div>
          <select
            {...register("category")}
            id="category"
            className={`block w-full pl-10 pr-3 py-3 border rounded-lg bg-teal-900/5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm ${
              errors.category ? "border-red-500" : "border-teal-600"
            }`}
          >
            <option value="">Select a category</option>
            <option value="Conference">Conference</option>
            <option value="Workshop">Workshop</option>
            <option value="Meetup">Meetup</option>
          </select>
        </div>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isSubmitting
            ? isEdit
              ? "Updating Event..."
              : "Creating Event..."
            : isEdit
            ? "Update Event"
            : "Create Event"}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
