"use client";
import React from "react";
import { Box, IconButton, Avatar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from '@mui/icons-material/Business';

export default function TopNavbar({ onExpand }: { onExpand: () => void }) {
  // TODO: Replace orgId with actual org info if available
  const orgId = 1;
  return (
    <Box
      sx={{
        width: '100%',
        height: 56,
        bgcolor: '#263238',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        px: 2,
        boxShadow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <IconButton
        onClick={onExpand}
        sx={{ color: 'white', mr: 2 }}
        size="large"
        aria-label="open menu"
      >
        <MenuIcon />
      </IconButton>
      <Avatar sx={{ width: 40, height: 40, bgcolor: 'primary.main', mr: 2 }}>
        <BusinessIcon />
      </Avatar>
      <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem', mr: 1 }}>
        Organization {orgId}
      </Typography>
      <Typography variant="body2" sx={{ color: '#b0bec5', fontSize: '0.9rem' }}>
        Education Management
      </Typography>
    </Box>
  );
} 