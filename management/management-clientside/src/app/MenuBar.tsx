'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, Box, ListItemButton, Avatar, Menu, MenuItem, Divider, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import LoginIcon from '@mui/icons-material/Login';
import GroupIcon from '@mui/icons-material/Group';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import BadgeIcon from '@mui/icons-material/Badge';
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
      router.push(`/orgs/${orgId}/academic-setup`);
    }
  };

  const handleStudents = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/students`);
    }
  };

  const handleTeachers = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/teachers`);
    }
  };

  const handleStaff = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/staff`);
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
        <AppBar position="static" style={{ background: '#263238' }}>
          <Toolbar>
            {/* Hamburger Menu for Mobile */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ 
                display: { xs: 'block', sm: 'none' },
                color: 'white' 
              }}
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
            sx={{ 
              width: 250,
              backgroundColor: '#263238',
              height: '100%',
              color: 'white'
            }}
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
      <AppBar position="static" style={{ background: '#263238' }}>
        <Toolbar>
          {/* Hamburger Menu for Mobile */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ 
              display: { xs: 'block', sm: 'none' },
              color: 'white'
            }} // Show only on small screens
          >
            <MenuIcon />
          </IconButton>

          {/* Website Title */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Website
          </Typography>

          {/* Desktop Menu - Icon Only with Tooltips */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}> {/* Hide on small screens */}
            {orgId ? (
              <>
                <Tooltip title="Dashboard" arrow>
                  <IconButton color="inherit" onClick={handleDashboard}>
                    <HomeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Students" arrow>
                  <IconButton color="inherit" onClick={handleStudents}>
                    <GroupIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Teachers" arrow>
                  <IconButton color="inherit" onClick={handleTeachers}>
                    <RecordVoiceOverIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Staff" arrow>
                  <IconButton color="inherit" onClick={handleStaff}>
                    <BadgeIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Attendance" arrow>
                  <IconButton color="inherit" onClick={handleAttendance}>
                    <HowToRegIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Academic Setup" arrow>
                  <IconButton color="inherit" onClick={handleClassLevels}>
                    <SchoolIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                startIcon={<LoginIcon />}
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  px: 1.5,
                  py: 0.4
                }}
              >
                SIGN IN
              </Button>
            )}
          </Box>

          {/* Avatar Menu */}
          {orgId && (
            <>
              <Tooltip title="Profile" arrow>
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
              </Tooltip>
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
       {/* Drawer for Hamburger Menu - Keep text for mobile usability */}
       <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ 
            width: 250,
            backgroundColor: '#263238',
            height: '100%',
            color: 'white'
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {orgId ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleDashboard} sx={{ color: 'white' }}>
                    <HomeIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Dashboard</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleStudents} sx={{ color: 'white' }}>
                    <GroupIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Students</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleTeachers} sx={{ color: 'white' }}>
                    <RecordVoiceOverIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Teachers</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleStaff} sx={{ color: 'white' }}>
                    <BadgeIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Staff</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleAttendance} sx={{ color: 'white' }}>
                    <HowToRegIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Attendance</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClassLevels} sx={{ color: 'white' }}>
                    <SchoolIcon sx={{ mr: 2, color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Academic Setup</Typography>
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <Box sx={{ p: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  startIcon={<LoginIcon />}
                  fullWidth
                  sx={{ 
                    borderRadius: 2,
                    py: 0.8,
                    fontWeight: 500,
                    fontSize: '1rem',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  SIGN IN
                </Button>
              </Box>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}