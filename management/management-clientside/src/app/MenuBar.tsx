'use client';
import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, Box, ListItemButton, Avatar, Menu, MenuItem, Divider, Tooltip, useTheme, useMediaQuery } from '@mui/material';
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
import BusinessIcon from '@mui/icons-material/Business';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useRouter, useParams } from 'next/navigation';

interface MenuBarProps {
  sidebarOpen: boolean;
  showTopBar: boolean;
  topBarOpen: boolean;
  onHamburgerMenuClick: () => void;
  onChevronClick: () => void;
}

export default function MenuBar({ sidebarOpen, showTopBar, onHamburgerMenuClick, onChevronClick }: MenuBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false); // for mobile temporary drawer
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const params = useParams();
  const orgId = params?.orgId;
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

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
    setAnchorEl(null);
    router.push('/login');
  };

  const handleProfile = () => {
    setAnchorEl(null);
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

  const handleDrawerClose = () => setDrawerOpen(false);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* Top Bar (only when sidebar is hidden) */}
      {isDesktop && orgId && showTopBar && (
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
            onClick={onHamburgerMenuClick}
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
      )}

      {/* Sidebar for Desktop (after login) */}
      {isDesktop && orgId && sidebarOpen && (
        <Drawer
          variant="permanent"
          sx={{
            width: 250,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: 250,
              boxSizing: 'border-box',
              backgroundColor: '#263238',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: (theme) => theme.zIndex.drawer + 3,
            },
            display: { xs: 'none', sm: 'block' },
          }}
          open
        >
          <Box sx={{ height: 56, display: 'flex', alignItems: 'center', px: 1, justifyContent: 'flex-end' }}>
            <IconButton onClick={onChevronClick} sx={{ color: 'white' }} size="large" aria-label="collapse sidebar">
              <ChevronLeftIcon />
            </IconButton>
          </Box>
          {/* Organization Section */}
          <Box sx={{ p: 2, borderBottom: '1px solid #37474f' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar 
                sx={{ 
                  width: 50, 
                  height: 50, 
                  bgcolor: 'primary.main',
                  mr: 2,
                  fontSize: '1.5rem'
                }}
              >
                <BusinessIcon />
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  Organization {orgId}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b0bec5', fontSize: '0.8rem' }}>
                  Education Management
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleDashboard} sx={{ color: 'white' }}>
                  <HomeIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                  <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Dashboard</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleStudents} sx={{ color: 'white' }}>
                  <GroupIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                  <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Students</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleTeachers} sx={{ color: 'white' }}>
                  <RecordVoiceOverIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                  <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Teachers</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleStaff} sx={{ color: 'white' }}>
                  <BadgeIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                  <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Staff</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleAttendance} sx={{ color: 'white' }}>
                  <HowToRegIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                  <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Attendance</Typography>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={handleClassLevels} sx={{ color: 'white' }}>
                  <SchoolIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                  <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Academic Setup</Typography>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
          {/* Profile/Logout at the bottom */}
          <Box sx={{ p: 2, borderTop: '1px solid #37474f' }}>
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', mr: 1 }}>
                <AccountCircleIcon />
              </Avatar>
              <Typography variant="body1" sx={{ color: 'white' }}>
                Profile
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleProfile}
              startIcon={<PersonIcon />}
              sx={{
                color: 'white',
                borderColor: 'white',
                mb: 1,
                textTransform: 'none',
                width: '100%'
              }}
            >
              Profile
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{
                color: 'white',
                borderColor: 'white',
                textTransform: 'none',
                width: '100%'
              }}
            >
              Logout
            </Button>
          </Box>
        </Drawer>
      )}

      {/* Floating Hamburger IconButton - Show when not logged in or on mobile */}
      {(!isDesktop || !orgId) && (
        <IconButton
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: (theme) => theme.zIndex.drawer + 2,
            bgcolor: '#263238',
            color: 'white',
            boxShadow: 2,
            '&:hover': { bgcolor: '#37474f' },
          }}
          size="large"
          aria-label="open menu"
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Temporary Drawer for Mobile (after login) */}
      {!isDesktop && orgId && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={handleDrawerClose}
        >
          <Box
            sx={{
              width: 250,
              backgroundColor: '#263238',
              height: '100%',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            {/* Organization Section for Mobile */}
            <Box sx={{ p: 2, borderBottom: '1px solid #37474f' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar 
                  sx={{ 
                    width: 50, 
                    height: 50, 
                    bgcolor: 'primary.main',
                    mr: 2,
                    fontSize: '1.5rem'
                  }}
                >
                  <BusinessIcon />
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                    Organization {orgId}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#b0bec5', fontSize: '0.8rem' }}>
                    Education Management
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleDashboard} sx={{ color: 'white' }}>
                    <HomeIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Dashboard</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleStudents} sx={{ color: 'white' }}>
                    <GroupIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Students</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleTeachers} sx={{ color: 'white' }}>
                    <RecordVoiceOverIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Teachers</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleStaff} sx={{ color: 'white' }}>
                    <BadgeIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Staff</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleAttendance} sx={{ color: 'white' }}>
                    <HowToRegIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Attendance</Typography>
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleClassLevels} sx={{ color: 'white' }}>
                    <SchoolIcon sx={{ mr: 2, color: 'white', fontSize: '1.1rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.95rem' }}>Academic Setup</Typography>
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            {/* Profile/Logout at the bottom */}
            <Box sx={{ p: 2, borderTop: '1px solid #37474f' }}>
              <Box display="flex" alignItems="center" mb={1}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main', mr: 1 }}>
                  <AccountCircleIcon />
                </Avatar>
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Profile
                </Typography>
              </Box>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleProfile}
                startIcon={<PersonIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  mb: 1,
                  textTransform: 'none',
                  width: '100%'
                }}
              >
                Profile
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  color: 'white',
                  borderColor: 'white',
                  textTransform: 'none',
                  width: '100%'
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
      {/* Drawer for Hamburger Menu - mobile only, not logged in */}
      {!isDesktop && !orgId && (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
          <Box
            sx={{
              width: 250,
              backgroundColor: '#263238',
              height: '100%',
              color: 'white',
            }}
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
          >
            <List>
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
                    fontSize: '0.95rem',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  SIGN IN
                </Button>
              </Box>
            </List>
          </Box>
        </Drawer>
      )}
    </div>
  );
}