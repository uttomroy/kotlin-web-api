'use client';
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, ListItemButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign Up</Button>
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
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Sign Up" />
            </ListItemButton>
          </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}