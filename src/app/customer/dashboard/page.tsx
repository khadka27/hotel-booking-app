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
  description: string;
  price: number;
  imageUrl: string;
}

export default function CustomerDashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/listings");
      setListings(response.data as Listing[]);
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
          Browse Listings
        </Typography>
        {loading ? (
          <CircularProgress sx={{ mt: 4 }} />
        ) : (
          <Grid container spacing={2}>
            {listings.map((listing) => (
              <Grid item key={listing.id} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">{listing.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.address}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {listing.description}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      ${listing.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link href={`/listing/${listing.id}`} passHref>
                      <Button variant="contained" size="small">
                        View Details
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
