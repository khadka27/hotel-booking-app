/* eslint-disable @typescript-eslint/no-unused-vars */
// src/app/listing/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingForm from "@/components/BookingForm";

interface Listing {
  id: number;
  name: string;
  address: string;
  description: string;
  price: number;
  imageUrl: string;
  units: { id: number }[];
}

export default function ListingDetail() {
  const { id } = useParams() as { id: string };
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const fetchListing = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setListing(response.data as Listing);
      toast.success("Listing loaded!");
    } catch (error) {
      toast.error("Failed to load listing.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchListing();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <Container sx={{ mt: 4 }}>
          <CircularProgress />
        </Container>
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Header />
        <Container sx={{ mt: 4 }}>
          <Typography variant="h6">Listing not found.</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <ToastContainer />
      <Container sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h4">{listing.name}</Typography>
            <Typography variant="body1">{listing.address}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              {listing.description}
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              ${listing.price}
            </Typography>
          </CardContent>
        </Card>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => setShowBookingForm((prev) => !prev)}
        >
          {showBookingForm ? "Hide Booking Form" : "Book Now"}
        </Button>
        {showBookingForm && listing && (
          // For demonstration, we use the first unit's id (or default to 1 if none exists)
          <BookingForm
            listingId={listing.id}
            unitId={listing.units[0]?.id || 1}
            onBookingSuccess={() => toast.success("Booking confirmed!")}
          />
        )}
      </Container>
    </>
  );
}
