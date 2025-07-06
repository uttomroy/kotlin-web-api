'use client';
import React from 'react';
import { Box, Typography, Button, Avatar } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from 'next/navigation';

export default function PublicMenuBar() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 56,
        bgcolor: '#263238',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 2,
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', mr: 2 }}>
          <BusinessIcon />
        </Avatar>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', mr: 1 }}>
          Management
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        startIcon={<LoginIcon />}
        sx={{
          borderRadius: 2,
          py: 0.8,
          px: 2,
          fontWeight: 500,
          fontSize: '0.9rem',
          letterSpacing: 1,
          textTransform: 'uppercase',
        }}
      >
        SIGN IN
      </Button>
    </Box>
  );
} 