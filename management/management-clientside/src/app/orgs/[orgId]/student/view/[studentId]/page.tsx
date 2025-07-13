"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { getStudentById } from '@/services/studentService';
import { ComEducationModelsStudentDTO } from '@/generated/api';

import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Container,
  Avatar,
  Grid,
} from '@mui/material';

const InfoItem = ({ label, value }: { label: string; value?: string | number }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Box sx={{ p: 2, bgcolor: '#f9f9f9', borderRadius: 2 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1" fontWeight={500}>
        {value || 'N/A'}
      </Typography>
    </Box>
  </Grid>
);

const StudentDetails = () => {
  const params = useParams();
  const studentId = params.studentId;
  const [student, setStudent] = React.useState<ComEducationModelsStudentDTO | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase();
  };

  React.useEffect(() => {
    if (!studentId) return;
    setLoading(true);
    setError(null);
    getStudentById(Number(studentId))
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!student) return <div>No student found.</div>;

  return (
    <Container>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {student.firstName} {student.lastName}
          </Typography>
          <Chip label={student.status} color="primary" />
        </Box>
        <Avatar
          sx={{
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
            bgcolor: 'primary.main',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          {getInitials(student.firstName + ' ' + student.lastName)}
        </Avatar>
      </Box>

      {/* General Information */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          🎓 General Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoItem label="System ID" value={student.id} />
          <InfoItem label="Class ID" value={student.classId} />
          <InfoItem label="Enrollment Date" value={student.enrollmentDate} />
          <InfoItem label="Organization ID" value={student.organizationId} />
          <InfoItem label="User ID" value={student.userId} />
        </Grid>
      </Paper>

      {/* Personal Information */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          👤 Personal Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoItem label="First Name" value={student.firstName} />
          <InfoItem label="Last Name" value={student.lastName} />
          <InfoItem label="Gender" value={student.gender} />
          <InfoItem label="Father's Name" value={student.fatherName} />
          <InfoItem label="Mother's Name" value={student.motherName} />
          <InfoItem label="Address" value={student.address} />
        </Grid>
      </Paper>

      {/* Other Information */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          📁 Other Information
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <InfoItem label="Parent Contact" value={student.parentContact} />
          <InfoItem label="Emergency Contact" value={student.emergencyContact} />
          <InfoItem label="Photo URL" value={student.photoUrl} />
          <InfoItem label="Status" value={student.status} />
        </Grid>
      </Paper>
    </Container>
  );
};

export default StudentDetails;