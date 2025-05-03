'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/services/api';
import { getUserProfile } from '@/services/profileService';

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const orgId = parseInt(params.orgId as string, 10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserProfile(orgId);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // Handle the error
      }
    };

    fetchData();
  }, [orgId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard for Organization {orgId}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3, mt: 2 }}>
          {data ? (
            <Typography>
              Welcome to the admin panel!
            </Typography>
          ) : (
            <Typography color="text.secondary">
              No data available
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
} 