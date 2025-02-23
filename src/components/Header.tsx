// src/components/Header.tsx
'use client'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from './ThemeContextProvider';
import Link from 'next/link';

export default function Header() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hotel & Restaurant Booking
        </Typography>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Link href="/customer/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Customer</Button>
        </Link>
        <Link href="/vendor/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Vendor</Button>
        </Link>
        <Link href="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Admin</Button>
        </Link>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
