"use client";
import React from "react";
import { Drawer, Box, IconButton, Avatar, Typography, List, ListItem, ListItemButton, Button } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import BadgeIcon from '@mui/icons-material/Badge';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter, useParams } from 'next/navigation';

export default function LeftPanelMenubar({ onCollapse }: { onCollapse: () => void }) {
  const router = useRouter();
  const params = useParams();
  const orgId = params?.orgId;

  const handleDashboard = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/dashboard`);
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

  const handleAttendance = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/attendance`);
    }
  };

  const handleAcademicSetup = () => {
    if (orgId) {
      router.push(`/orgs/${orgId}/academic-setup`);
    }
  };

  const handleProfile = () => {
    // TODO: Implement profile navigation
    alert('Profile clicked');
  };

  const handleLogout = async () => {
    // TODO: Implement logout logic
    router.push('/login');
  };

  return (
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
        display: { sm: 'block' },
      }}
      open
    >
      <Box sx={{ height: 56, display: 'flex', alignItems: 'center', px: 1, justifyContent: 'flex-end' }}>
        <IconButton onClick={onCollapse} sx={{ color: 'white' }} size="large" aria-label="collapse sidebar">
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
            <ListItemButton onClick={handleAcademicSetup} sx={{ color: 'white' }}>
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
  );
} 