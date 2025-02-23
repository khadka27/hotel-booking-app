// src/components/BookingForm.tsx
"use client";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerId: 1, // Replace with actual customer ID from session
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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="Start Time"
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="End Time"
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Book Now
      </Button>
    </Box>
  );
}
