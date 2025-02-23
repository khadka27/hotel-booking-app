"use client";
import { useState } from "react";

interface BookingFormProps {
  listingId: number;
  unitId: number;
  onBookingSuccess: () => void;
}

export default function BookingForm({
  listingId,
  unitId,
  onBookingSuccess,
}: BookingFormProps) {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/bookings/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // In a real application, you’d extract the customer ID from the session
        customerId: 1, // dummy customer ID
        listingId,
        unitId,
        startTime,
        endTime,
      }),
    });
    if (response.ok) {
      onBookingSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1">Start Time:</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">End Time:</label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Book Now
      </button>
    </form>
  );
}
