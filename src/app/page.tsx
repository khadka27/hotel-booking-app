// src/app/page.tsx
"use client";
import Header from "@/components/Header";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Home() {
  // Online images fetched from Unsplash (random images with specified queries)
  const sliderImages = [
    {
      src: "https://source.unsplash.com/random/1600x900/?hotel",
      alt: "Luxury Hotel",
    },
    {
      src: "https://source.unsplash.com/random/1600x900/?restaurant",
      alt: "Modern Restaurant",
    },
    {
      src: "https://source.unsplash.com/random/1600x900/?spa",
      alt: "Relaxing Spa",
    },
    {
      src: "https://source.unsplash.com/random/1600x900/?lobby",
      alt: "Elegant Lobby",
    },
  ];

  return (
    <>
      <Header />
      <Container sx={{ py: 8 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Discover Your Perfect Stay
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Explore the best hotels and restaurants, handpicked for your
            comfort.
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Explore Now
          </Button>
        </Box>
        {/* Image Slider */}
        <Box sx={{ my: 4 }}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={30}
            slidesPerView={1}
          >
            {sliderImages.map((image, index) => (
              <SwiperSlide key={index}>
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt}
                  sx={{
                    width: "100%",
                    height: { xs: 300, sm: 500 },
                    objectFit: "cover",
                    borderRadius: 2,
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        {/* Feature Section */}
        <Box sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our platform offers an effortless way to search, book, and manage
            your hotel and restaurant reservations. Enjoy exclusive deals,
            seamless booking, and an unforgettable experience.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
