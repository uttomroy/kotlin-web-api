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

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const orgId = params.orgId;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`api/orgs/${orgId}/admin-panel`);

        if (response.ok) {
        //   const result = await response.json();
        //   setData(result);
        } else if (response.status === 401 || response.status === 403) {
          // Redirect to login if unauthorized
          router.push('/login');
        } else {
          setError('Failed to fetch dashboard data');
        }
      } catch (err) {
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, orgId]);

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