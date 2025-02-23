// src/components/ListingCard.tsx
'use client'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Link from 'next/link';

interface ListingCardProps {
  id: number;
  name: string;
  address: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function ListingCard({ id, name, address, description, price, imageUrl }: ListingCardProps) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          ${price}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/listing/${id}`} style={{ textDecoration: 'none' }}>
          <Button size="small" variant="contained">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
