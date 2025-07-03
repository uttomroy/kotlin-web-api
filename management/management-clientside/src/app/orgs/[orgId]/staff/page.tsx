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
  Badge as StaffIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Work as RoleIcon
} from '@mui/icons-material';

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  staffId: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  joinDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  status: 'Active' | 'On Leave' | 'Inactive' | 'Resigned';
  salary: string;
  workHours: string;
}

const initialStaff: Staff[] = [
  {
    id: 1,
    firstName: 'Michael',
    lastName: 'Johnson',
    staffId: 'STF001',
    email: 'michael.johnson@school.com',
    phone: '555-4001',
    role: 'IT Administrator',
    department: 'Administration',
    joinDate: '2021-01-15',
    address: '123 Admin St, City, State 12345',
    emergencyContact: 'Sarah Johnson',
    emergencyPhone: '555-4002',
    status: 'Active',
    salary: '$55,000',
    workHours: '9:00 AM - 5:00 PM'
  },
  {
    id: 2,
    firstName: 'Linda',
    lastName: 'Davis',
    staffId: 'STF002',
    email: 'linda.davis@school.com',
    phone: '555-5001',
    role: 'School Nurse',
    department: 'Health Services',
    joinDate: '2019-08-20',
    address: '456 Care Ave, City, State 12345',
    emergencyContact: 'Robert Davis',
    emergencyPhone: '555-5002',
    status: 'Active',
    salary: '$48,000',
    workHours: '8:00 AM - 4:00 PM'
  },
  {
    id: 3,
    firstName: 'Robert',
    lastName: 'Martinez',
    staffId: 'STF003',
    email: 'robert.martinez@school.com',
    phone: '555-6001',
    role: 'Maintenance Supervisor',
    department: 'Facilities',
    joinDate: '2020-03-10',
    address: '789 Service Rd, City, State 12345',
    emergencyContact: 'Elena Martinez',
    emergencyPhone: '555-6002',
    status: 'Active',
    salary: '$42,000',
    workHours: '7:00 AM - 3:00 PM'
  },
  {
    id: 4,
    firstName: 'Jennifer',
    lastName: 'Brown',
    staffId: 'STF004',
    email: 'jennifer.brown@school.com',
    phone: '555-7001',
    role: 'Librarian',
    department: 'Library Services',
    joinDate: '2022-09-01',
    address: '321 Book Lane, City, State 12345',
    emergencyContact: 'Mark Brown',
    emergencyPhone: '555-7002',
    status: 'Active',
    salary: '$45,000',
    workHours: '8:30 AM - 4:30 PM'
  }
];

const roles = ['IT Administrator', 'School Nurse', 'Maintenance Supervisor', 'Librarian', 'Security Guard', 'Cafeteria Staff', 'Janitor', 'Secretary', 'Accountant', 'Counselor'];
const departments = ['Administration', 'Health Services', 'Facilities', 'Library Services', 'Security', 'Food Services', 'Maintenance', 'Finance', 'Student Services'];
const statuses = ['Active', 'On Leave', 'Inactive', 'Resigned'];

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [formData, setFormData] = useState<Partial<Staff>>({});

  const handleOpenDialog = (member?: Staff) => {
    if (member) {
      setEditingStaff(member);
      setFormData(member);
    } else {
      setEditingStaff(null);
      setFormData({
        firstName: '',
        lastName: '',
        staffId: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        joinDate: '',
        address: '',
        emergencyContact: '',
        emergencyPhone: '',
        status: 'Active',
        salary: '',
        workHours: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingStaff(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof Staff, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (editingStaff) {
      // Update existing staff
      setStaff(prev => prev.map(member => 
        member.id === editingStaff.id 
          ? { ...member, ...formData } as Staff
          : member
      ));
    } else {
      // Add new staff
      const newId = staff.length > 0 ? Math.max(...staff.map(s => s.id)) + 1 : 1;
      const newStaff: Staff = {
        ...formData as Staff,
        id: newId
      };
      setStaff(prev => [...prev, newStaff]);
    }
    handleCloseDialog();
  };

  const handleDelete = (staffId: number) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(prev => prev.filter(member => member.id !== staffId));
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
          <StaffIcon fontSize="large" />
          Staff Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Staff Member
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Staff
            </Typography>
            <Typography variant="h5" component="div">
              {staff.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Active Staff
            </Typography>
            <Typography variant="h5" component="div">
              {staff.filter(s => s.status === 'Active').length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Departments
            </Typography>
            <Typography variant="h5" component="div">
              {new Set(staff.map(s => s.department)).size}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              On Leave
            </Typography>
            <Typography variant="h5" component="div">
              {staff.filter(s => s.status === 'On Leave').length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Staff Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Work Hours</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.staffId}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon />
                    {member.firstName} {member.lastName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RoleIcon />
                    {member.role}
                  </Box>
                </TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EmailIcon fontSize="small" />
                      <Typography variant="caption">{member.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="caption">{member.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{member.workHours}</TableCell>
                <TableCell>
                  <Chip 
                    label={member.status} 
                    color={getStatusColor(member.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Edit Staff Member">
                    <IconButton onClick={() => handleOpenDialog(member)} size="small">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Staff Member">
                    <IconButton onClick={() => handleDelete(member.id)} size="small" color="error">
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
          {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
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
                label="Staff ID"
                value={formData.staffId || ''}
                onChange={(e) => handleInputChange('staffId', e.target.value)}
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
                label="Role"
                value={formData.role || ''}
                onChange={(e) => handleInputChange('role', e.target.value)}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
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
                label="Work Hours"
                value={formData.workHours || ''}
                onChange={(e) => handleInputChange('workHours', e.target.value)}
                placeholder="e.g., 9:00 AM - 5:00 PM"
              />
            </Box>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingStaff ? 'Update' : 'Add'} Staff Member
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 