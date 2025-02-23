/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PendingListing {
  id: number;
  name: string;
  vendor: string;
  address: string;
}

interface PendingBooking {
  id: number;
  listingName: string;
  customer: string;
  startTime: string;
  endTime: string;
}

export default function AdminDashboard() {
  const [pendingListings, setPendingListings] = useState<PendingListing[]>([]);
  const [pendingBookings, setPendingBookings] = useState<PendingBooking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingData = async () => {
    setLoading(true);
    try {
      const [listingsRes, bookingsRes] = await Promise.all([
        axios.get("/api/admin/pending-listings"),
        axios.get("/api/admin/pending-bookings"),
      ]);
      setPendingListings(listingsRes.data as PendingListing[]);
      setPendingBookings(bookingsRes.data as PendingBooking[]);
      toast.success("Data loaded successfully!");
    } catch (error) {
      toast.error("Failed to load pending data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingData();
  }, []);

  const handleApproveListing = async (id: number) => {
    try {
      await axios.post("/api/admin/approve-listing", { listingId: id });
      toast.success("Listing approved!");
      fetchPendingData();
    } catch (error) {
      toast.error("Failed to approve listing.");
    }
  };

  const handleRejectListing = async (id: number) => {
    try {
      await axios.post("/api/admin/reject-listing", { listingId: id });
      toast.success("Listing rejected!");
      fetchPendingData();
    } catch (error) {
      toast.error("Failed to reject listing.");
    }
  };

  const handleConfirmBooking = async (id: number) => {
    try {
      await axios.post("/api/admin/confirm-booking", { bookingId: id });
      toast.success("Booking confirmed!");
      fetchPendingData();
    } catch (error) {
      toast.error("Failed to confirm booking.");
    }
  };

  const handleCancelBooking = async (id: number) => {
    try {
      await axios.post("/api/admin/cancel-booking", { bookingId: id });
      toast.success("Booking cancelled!");
      fetchPendingData();
    } catch (error) {
      toast.error("Failed to cancel booking.");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <>
            {/* Pending Listings Section */}
            <Typography variant="h5" sx={{ mt: 4 }}>
              Pending Listings
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {pendingListings.map((listing) => (
                <Grid item key={listing.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{listing.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Submitted by: {listing.vendor}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Address: {listing.address}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleApproveListing(listing.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleRejectListing(listing.id)}
                      >
                        Reject
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {/* Pending Bookings Section */}
            <Typography variant="h5" sx={{ mt: 4 }}>
              Pending Bookings
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {pendingBookings.map((booking) => (
                <Grid item key={booking.id} xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        {booking.listingName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Customer: {booking.customer}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        From: {new Date(booking.startTime).toLocaleString()} To:{" "}
                        {new Date(booking.endTime).toLocaleString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirmBooking(booking.id)}
                      >
                        Confirm Booking
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
