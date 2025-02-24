// src/app/vendor/create-listing/page.tsx
"use client";
import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "HOTEL", // Default value ("HOTEL" or "RESTAURANT")
    name: "",
    address: "",
    description: "",
    facilities: "",
    pricing: "",
    images: "", // Expecting a string (could be a JSON string or comma-separated URLs)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/listings/create", formData);
      toast.success("Listing created successfully. Awaiting admin approval.");
      // Optionally, clear the form or redirect the user here
    } catch {
      toast.error("Failed to create listing.");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Listing
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="type"
            label="Type (HOTEL/RESTAURANT)"
            fullWidth
            value={formData.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="name"
            label="Property Name"
            fullWidth
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="address"
            label="Address"
            fullWidth
            value={formData.address}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            value={formData.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="facilities"
            label="Facilities"
            fullWidth
            value={formData.facilities}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="pricing"
            label="Pricing"
            type="number"
            fullWidth
            value={formData.pricing}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            name="images"
            label="Image URLs (comma separated)"
            fullWidth
            value={formData.images}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" type="submit">
            Create Listing
          </Button>
        </Box>
      </Container>
    </>
  );
}
