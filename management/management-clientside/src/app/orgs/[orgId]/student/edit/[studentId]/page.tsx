"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getStudentById, updateStudent } from '@/services/studentService';
import { ComEducationModelsStudentDTO, ComEducationModelsUpdateStudentRequest } from '@/generated/api';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Avatar,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const StudentEditPage = () => {
  const params = useParams();
  const router = useRouter();
  const studentId = Number(params.studentId);
  const orgId = Number(params.orgId);
  
  const [student, setStudent] = useState<ComEducationModelsStudentDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<ComEducationModelsUpdateStudentRequest>>({
    studentId: studentId,
    address: '',
    classId: undefined,
    emergencyContact: '',
    fatherName: '',
    motherName: '',
    parentContact: '',
    photoUrl: '',
    status: '',
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word: string) => word[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    if (!studentId) return;
    
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const data = await getStudentById(studentId);
        setStudent(data);
        
        // Initialize form data with current student data
        setFormData({
          studentId: data.id,
          address: data.address || '',
          classId: data.classId || undefined,
          emergencyContact: data.emergencyContact || '',
          fatherName: data.fatherName || '',
          motherName: data.motherName || '',
          parentContact: data.parentContact || '',
          photoUrl: data.photoUrl || '',
          status: data.status || '',
        });
      } catch (err: any) {
        setError(err.message || 'Failed to fetch student data');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleInputChange = (field: keyof ComEducationModelsUpdateStudentRequest, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orgId) {
      setError('Invalid organization ID');
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      await updateStudent(orgId, formData as ComEducationModelsUpdateStudentRequest);
      
      setSuccess('Student updated successfully!');
      
      // Redirect to view page after a short delay
      setTimeout(() => {
        router.push(`/orgs/${orgId}/student/view/${studentId}`);
      }, 1500);
      
    } catch (err: any) {
      setError(err.message || 'Failed to update student');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/orgs/${orgId}/student/view/${studentId}`);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error && !student) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!student) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 2 }}>
          Student not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push(`/orgs/${orgId}/student/view/${studentId}`)}
            variant="outlined"
          >
            Back
          </Button>
          <Box>
            <Typography variant="h4" gutterBottom>
              Edit Student
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {student.firstName} {student.lastName}
            </Typography>
          </Box>
        </Box>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: 'primary.main',
            fontSize: '2rem',
          }}
        >
          {getInitials(student.firstName + ' ' + student.lastName)}
        </Avatar>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {/* Edit Form */}
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Student Information
        </Typography>
        <Divider sx={{ mb: 3 }} />
        
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Personal Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={student.firstName}
                    disabled
                    helperText="First name cannot be edited"
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={student.lastName}
                    disabled
                    helperText="Last name cannot be edited"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Gender"
                    value={student.gender}
                    disabled
                    helperText="Gender cannot be edited"
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status || ''}
                      label="Status"
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                      <MenuItem value="graduated">Graduated</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
            </Box>

            {/* Class Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Class Information
              </Typography>
              <Box sx={{ flex: '1 1 300px', maxWidth: '300px' }}>
                <TextField
                  fullWidth
                  label="Class ID"
                  type="number"
                  value={formData.classId || ''}
                  onChange={(e) => handleInputChange('classId', Number(e.target.value))}
                  inputProps={{ min: 1 }}
                />
              </Box>
            </Box>

            {/* Family Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Family Information
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Father's Name"
                    value={formData.fatherName || ''}
                    onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Mother's Name"
                    value={formData.motherName || ''}
                    onChange={(e) => handleInputChange('motherName', e.target.value)}
                  />
                </Box>
              </Box>
            </Box>

            {/* Contact Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Parent Contact"
                    value={formData.parentContact || ''}
                    onChange={(e) => handleInputChange('parentContact', e.target.value)}
                  />
                </Box>
                <Box sx={{ flex: '1 1 300px' }}>
                  <TextField
                    fullWidth
                    label="Emergency Contact"
                    value={formData.emergencyContact || ''}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  />
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Address"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  multiline
                  rows={3}
                />
              </Box>
            </Box>

            {/* Other Information */}
            <Box>
              <Typography variant="h6" gutterBottom>
                Other Information
              </Typography>
              <Box>
                <TextField
                  fullWidth
                  label="Photo URL"
                  value={formData.photoUrl || ''}
                  onChange={(e) => handleInputChange('photoUrl', e.target.value)}
                  helperText="Enter a valid image URL"
                />
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default StudentEditPage; 