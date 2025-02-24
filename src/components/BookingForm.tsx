/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/BookingForm.tsx
"use client";
import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real application, the customerId would be retrieved from the session.
      const response = await axios.post("/api/bookings/create", {
        customerId: 1, // dummy customer ID; replace with actual session data
        listingId,
        unitId,
        startTime,
        endTime,
      });
      if (response.status === 201) {
        toast.success("Booking created successfully!");
        onBookingSuccess();
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to create booking.");
    } finally {
      setLoading(false);
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Now"}
      </Button>
    </Box>
  );
}
