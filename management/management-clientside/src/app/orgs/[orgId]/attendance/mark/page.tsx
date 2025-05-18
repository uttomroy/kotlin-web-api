'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/services/api';

interface Student {
  id: number;
  name: string;
  status: 'present' | 'absent' | 'late';
}

export default function MarkAttendance() {
  const router = useRouter();
  const params = useParams();
  const orgId = parseInt(params.orgId as string, 10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // TODO: Replace with actual API call when backend is ready
        // const response = await api.get(`/orgs/${orgId}/students`);
        // setStudents(response.data.map(student => ({ ...student, status: 'present' })));
        
        // Temporary mock data
        setStudents([
          { id: 1, name: 'John Doe', status: 'present' },
          { id: 2, name: 'Jane Smith', status: 'present' },
          { id: 3, name: 'Bob Johnson', status: 'present' }
        ]);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        setError('Failed to load student data');
        setLoading(false);
      }
    };

    fetchStudents();
  }, [orgId]);

  const handleStatusChange = (studentId: number, event: SelectChangeEvent) => {
    const newStatus = event.target.value as 'present' | 'absent' | 'late';
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, status: newStatus } : student
    ));
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      // TODO: Replace with actual API call when backend is ready
      // await api.post(`/orgs/${orgId}/attendance`, { 
      //   date: new Date().toISOString().split('T')[0],
      //   records: students.map(student => ({
      //     studentId: student.id,
      //     status: student.status
      //   }))
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      router.push(`/orgs/${orgId}/attendance`);
    } catch (error) {
      console.error('Failed to save attendance:', error);
      setError('Failed to save attendance data');
      setSaving(false);
    }
  };

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Mark Attendance
          </Typography>
          <Box>
            <Button
              variant="outlined"
              onClick={() => router.push(`/orgs/${orgId}/attendance`)}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Attendance'}
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 3, mt: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <FormControl size="small">
                        <Select
                          value={student.status}
                          onChange={(e) => handleStatusChange(student.id, e)}
                          sx={{ minWidth: 120 }}
                        >
                          <MenuItem value="present">Present</MenuItem>
                          <MenuItem value="absent">Absent</MenuItem>
                          <MenuItem value="late">Late</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
} 