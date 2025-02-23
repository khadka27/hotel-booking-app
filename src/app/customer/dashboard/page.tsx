// src/app/customer/dashboard/page.tsx
'use client'
import Header from '@/components/Header';
import ListingCard from '@/components/ListingCard';
import { Container, Grid, Typography } from '@mui/material';

export default function CustomerDashboard() {
  // Dummy data for demonstration
  const listings = [
    {
      id: 1,
      name: 'Hotel California',
      address: 'Los Angeles, CA',
      description: 'A luxurious stay awaits you.',
      price: 200,
      imageUrl: '/hotel.jpg',
    },
    {
      id: 2,
      name: 'Sunny Restaurant',
      address: 'San Francisco, CA',
      description: 'Delicious meals in a vibrant setting.',
      price: 50,
      imageUrl: '/restaurant.jpg',
    },
  ];

  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Customer Dashboard
        </Typography>
        <Grid container spacing={2}>
          {listings.map((listing) => (
            <Grid item key={listing.id} xs={12} sm={6} md={4}>
              <ListingCard {...listing} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
