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
  Card,
  CardContent
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  SupervisorAccount as TeacherIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  School as SubjectIcon
} from '@mui/icons-material';

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  teacherId: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  qualification: string;
  experience: string;
  joinDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: 'Active' | 'On Leave' | 'Inactive' | 'Resigned';
  salary: string;
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    firstName: 'Dr. Sarah',
    lastName: 'Wilson',
    teacherId: 'TEA001',
    email: 'sarah.wilson@school.com',
    phone: '555-1001',
    subject: 'Mathematics',
    department: 'Science',
    qualification: 'PhD in Mathematics',
    experience: '8 years',
    joinDate: '2020-08-15',
    address: '123 Teacher Lane, City, State 12345',
    emergencyContact: 'John Wilson',
    emergencyPhone: '555-1002',
    status: 'Active',
    salary: '$65,000'
  },
  {
    id: 2,
    firstName: 'Mr. James',
    lastName: 'Rodriguez',
    teacherId: 'TEA002',
    email: 'james.rodriguez@school.com',
    phone: '555-2001',
    subject: 'English Literature',
    department: 'Humanities',
    qualification: 'Master of Arts in English',
    experience: '12 years',
    joinDate: '2018-09-01',
    address: '456 Faculty St, City, State 12345',
    emergencyContact: 'Maria Rodriguez',
    emergencyPhone: '555-2002',
    status: 'Active',
    salary: '$70,000'
  },
  {
    id: 3,
    firstName: 'Ms. Emily',
    lastName: 'Chen',
    teacherId: 'TEA003',
    email: 'emily.chen@school.com',
    phone: '555-3001',
    subject: 'Chemistry',
    department: 'Science',
    qualification: 'Master of Science in Chemistry',
    experience: '5 years',
    joinDate: '2021-08-20',
    address: '789 Education Ave, City, State 12345',
    emergencyContact: 'David Chen',
    emergencyPhone: '555-3002',
    status: 'Active',
    salary: '$62,000'
  }
];

const subjects = ['Mathematics', 'English Literature', 'Chemistry', 'Physics', 'Biology', 'History', 'Geography', 'Physical Education', 'Art', 'Music'];
const departments = ['Science', 'Humanities', 'Arts', 'Physical Education', 'Administration'];
const statuses = ['Active', 'On Leave', 'Inactive', 'Resigned'];

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<Partial<Teacher>>({});

  const handleOpenDialog = (teacher?: Teacher) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData(teacher);
    } else {
      setEditingTeacher(null);
      setFormData({
        firstName: '',
        lastName: '',
        teacherId: '',
        email: '',
        phone: '',
        subject: '',
        department: '',
        qualification: '',
        experience: '',
        joinDate: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        status: 'Active',
        salary: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTeacher(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Teacher, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (editingTeacher) {
      // Update existing teacher
      setTeachers(prev => prev.map(teacher => 
        teacher.id === editingTeacher.id 
          ? { ...teacher, ...formData } as Teacher
          : teacher
      ));
    } else {
      // Add new teacher
      const newId = teachers.length > 0 ? Math.max(...teachers.map(t => t.id)) + 1 : 1;
      const newTeacher: Teacher = {
        ...formData as Teacher,
        id: newId
      };
      setTeachers(prev => [...prev, newTeacher]);
    }
    handleCloseDialog();
  };

  const handleDelete = (teacherId: number) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setTeachers(prev => prev.filter(teacher => teacher.id !== teacherId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'On Leave': return 'warning';
      case 'Inactive': return 'error';
      case 'Resigned': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TeacherIcon fontSize="large" />
          Teachers Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Teacher
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Teachers
            </Typography>
            <Typography variant="h5" component="div">
              {teachers.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Teachers
            </Typography>
            <Typography variant="h5" component="div">
              {teachers.filter(t => t.status === 'Active').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Departments
            </Typography>
            <Typography variant="h5" component="div">
              {new Set(teachers.map(t => t.department)).size}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              On Leave
            </Typography>
            <Typography variant="h5" component="div">
              {teachers.filter(t => t.status === 'On Leave').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Teachers Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Teacher ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell>{teacher.teacherId}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    {teacher.firstName} {teacher.lastName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <SubjectIcon />
                    {teacher.subject}
                  </Box>
                </TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="caption">{teacher.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="caption">{teacher.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>
                  <Chip 
                    label={teacher.status} 
                    color={getStatusColor(teacher.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Teacher">
                    <IconButton onClick={() => handleOpenDialog(teacher)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Teacher">
                    <IconButton onClick={() => handleDelete(teacher.id)} size="small" color="error">
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
          {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Teacher ID"
                value={formData.teacherId || ''}
                onChange={(e) => handleInputChange('teacherId', e.target.value)}
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              <TextField
                fullWidth
                select
                label="Subject"
                value={formData.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                select
                label="Department"
                value={formData.department || ''}
                onChange={(e) => handleInputChange('department', e.target.value)}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                fullWidth
                label="Qualification"
                value={formData.qualification || ''}
                onChange={(e) => handleInputChange('qualification', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Experience"
                value={formData.experience || ''}
                onChange={(e) => handleInputChange('experience', e.target.value)}
              />
              <TextField
                fullWidth
                type="date"
                label="Join Date"
                value={formData.joinDate || ''}
                onChange={(e) => handleInputChange('joinDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={2}
              value={formData.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Emergency Contact"
                value={formData.emergencyContact || ''}
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
              />
              <TextField
                fullWidth
                label="Emergency Phone"
                value={formData.emergencyPhone || ''}
                onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Salary"
                value={formData.salary || ''}
                onChange={(e) => handleInputChange('salary', e.target.value)}
              />
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
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingTeacher ? 'Update' : 'Add'} Teacher
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 