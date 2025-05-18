'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, Box, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter, useParams } from 'next/navigation';

export default function MenuBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const orgId = params?.orgId;

  const handleLogin = () => {
    router.push('/login');
  };

  const handleDashboard = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/dashboard`);
    }
  };

  const handleAttendance = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/attendance`);
    }
  };

  const handleLogout = async () => {
    // You might want to add a logout endpoint to your API
    // For now, just redirect to login
    router.push('/login');
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static" style={{ background: 'rgba(10, 32, 229, 0.7)' }}>
        <Toolbar>
          {/* Hamburger Menu for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>

          {/* Website Title */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Website
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}> {/* Hide on small screens */}
            {orgId && (
              <>
                <Button color="inherit" onClick={handleDashboard}>Dashboard</Button>
                <Button color="inherit" onClick={handleAttendance}>Attendance</Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogin}>Login</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
       {/* Drawer for Hamburger Menu */}
       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {orgId && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleDashboard}>
                    <Typography>Dashboard</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleAttendance}>
                    <Typography>Attendance</Typography>
                  </ListItemButton>
                </ListItem>
              </>
            )}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogin}>
                <Typography>Login</Typography>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <Typography>Logout</Typography>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}