'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, Box, ListItemButton, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter, useParams } from 'next/navigation';

export default function MenuBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const orgId = params?.orgId;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleClassLevels = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/class-levels`);
    }
  };

  const handleLogout = async () => {
    // You might want to add a logout endpoint to your API
    // For now, just redirect to login
    setAnchorEl(null);
    router.push('/login');
  };

  const handleProfile = () => {
    // Add profile navigation logic here
    setAnchorEl(null);
    // router.push(`/orgs/${orgId}/profile`);
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Don't render conditional content until mounted to prevent hydration mismatch
  if (!mounted) {
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
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Website Title */}
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              My Website
            </Typography>

            {/* Desktop Menu - Loading state */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {/* Empty during SSR to prevent hydration mismatch */}
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
              {/* Empty during SSR to prevent hydration mismatch */}
            </List>
          </Box>
        </Drawer>
      </div>
    );
  }

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
            {orgId ? (
              <>
                <Button color="inherit" onClick={handleDashboard}>Dashboard</Button>
                <Button color="inherit" onClick={handleAttendance}>Attendance</Button>
                <Button color="inherit" onClick={handleClassLevels}>Academics</Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogin}>Login</Button>
            )}
          </Box>

          {/* Avatar Menu */}
          {orgId && (
            <>
              <IconButton
                onClick={handleAvatarClick}
                sx={{ ml: 2 }}
                aria-controls={anchorEl ? 'avatar-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
              <Menu
                id="avatar-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
                onClick={handleAvatarClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleProfile}>
                  <PersonIcon sx={{ mr: 2 }} />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
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
            {orgId ? (
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
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClassLevels}>
                    <Typography>Academics</Typography>
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogin}>
                  <Typography>Login</Typography>
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}