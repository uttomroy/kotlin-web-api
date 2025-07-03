'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Tooltip,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon
} from '@mui/icons-material';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  studentId: string;
  grade: string;
  class: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
  enrollmentDate: string;
  status: 'Active' | 'Inactive' | 'Graduated' | 'Transferred';
}

const initialStudents: Student[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    studentId: 'STU001',
    grade: '10th Grade',
    class: '10-A',
    dateOfBirth: '2008-05-15',
    email: 'john.doe@student.school.com',
    phone: '555-0101',
    parentName: 'Jane Doe',
    parentEmail: 'jane.doe@email.com',
    parentPhone: '555-0102',
    address: '123 Main St, City, State 12345',
    enrollmentDate: '2023-08-15',
    status: 'Active'
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Smith',
    studentId: 'STU002',
    grade: '9th Grade',
    class: '9-B',
    dateOfBirth: '2009-03-22',
    email: 'sarah.smith@student.school.com',
    phone: '555-0201',
    parentName: 'Mike Smith',
    parentEmail: 'mike.smith@email.com',
    parentPhone: '555-0202',
    address: '456 Oak Ave, City, State 12345',
    enrollmentDate: '2023-08-15',
    status: 'Active'
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    studentId: 'STU003',
    grade: '11th Grade',
    class: '11-A',
    dateOfBirth: '2007-11-08',
    email: 'michael.johnson@student.school.com',
    phone: '555-0301',
    parentName: 'Lisa Johnson',
    parentEmail: 'lisa.johnson@email.com',
    parentPhone: '555-0302',
    address: '789 Pine Rd, City, State 12345',
    enrollmentDate: '2022-08-15',
    status: 'Active'
  }
];

const grades = ['9th Grade', '10th Grade', '11th Grade', '12th Grade'];
const classes = ['9-A', '9-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];
const statuses = ['Active', 'Inactive', 'Graduated', 'Transferred'];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});

  const handleOpenDialog = (student?: Student) => {
    if (student) {
      setEditingStudent(student);
      setFormData(student);
    } else {
      setEditingStudent(null);
      setFormData({
        firstName: '',
        lastName: '',
        studentId: '',
        grade: '',
        class: '',
        dateOfBirth: '',
        email: '',
        phone: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        address: '',
        enrollmentDate: '',
        status: 'Active'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStudent(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Student, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (editingStudent) {
      // Update existing student
      setStudents(prev => prev.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...formData } as Student
          : student
      ));
    } else {
      // Add new student
      const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      const newStudent: Student = {
        ...formData as Student,
        id: newId
      };
      setStudents(prev => [...prev, newStudent]);
    }
    handleCloseDialog();
  };

  const handleDelete = (studentId: number) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(student => student.id !== studentId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'warning';
      case 'Graduated': return 'info';
      case 'Transferred': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon fontSize="large" />
          Students Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Student
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Students
              </Typography>
              <Typography variant="h5" component="div">
                {students.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Students
              </Typography>
              <Typography variant="h5" component="div">
                {students.filter(s => s.status === 'Active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                New This Year
              </Typography>
              <Typography variant="h5" component="div">
                {students.filter(s => s.enrollmentDate.startsWith('2023')).length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Grades Covered
              </Typography>
              <Typography variant="h5" component="div">
                {new Set(students.map(s => s.grade)).size}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Students Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Parent</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.studentId}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    {student.firstName} {student.lastName}
                  </Box>
                </TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="caption">{student.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="caption">{student.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2">{student.parentName}</Typography>
                    <Typography variant="caption">{student.parentPhone}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={student.status} 
                    color={getStatusColor(student.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Student">
                    <IconButton onClick={() => handleOpenDialog(student)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Student">
                    <IconButton onClick={() => handleDelete(student.id)} size="small" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingStudent ? 'Edit Student' : 'Add New Student'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Student ID"
                value={formData.studentId || ''}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Grade"
                value={formData.grade || ''}
                onChange={(e) => handleInputChange('grade', e.target.value)}
              >
                {grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Class"
                value={formData.class || ''}
                onChange={(e) => handleInputChange('class', e.target.value)}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    {cls}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date of Birth"
                value={formData.dateOfBirth || ''}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Parent/Guardian Name"
                value={formData.parentName || ''}
                onChange={(e) => handleInputChange('parentName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Parent Email"
                type="email"
                value={formData.parentEmail || ''}
                onChange={(e) => handleInputChange('parentEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Parent Phone"
                value={formData.parentPhone || ''}
                onChange={(e) => handleInputChange('parentPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Enrollment Date"
                value={formData.enrollmentDate || ''}
                onChange={(e) => handleInputChange('enrollmentDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Status"
                value={formData.status || 'Active'}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                {statuses.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingStudent ? 'Update' : 'Add'} Student
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 