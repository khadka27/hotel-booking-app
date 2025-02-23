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
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Listing {
  id: number;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

export default function VendorDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      const response = await axios.get<Listing[]>("/api/vendor/listings");
      setListings(response.data);
      toast.success("Listings loaded successfully!");
    } catch (error) {
      toast.error("Failed to load listings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <Header />
      <ToastContainer />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Vendor Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Manage your listings and view booking requests.
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {listings.map((listing) => (
              <Grid item key={listing.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{listing.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.address}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      ${listing.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/vendor/listings/${listing.id}`} passHref>
                      <Button size="small" variant="contained">
                        Edit Listing
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
