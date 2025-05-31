'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Avatar,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  FamilyRestroom as FamilyIcon
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';

interface Student {
  studentId: number;
  organizationId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  classId?: number;
  className?: string;
  studentCode: string;
  dateOfBirth?: string;
  address?: string;
  parentId?: number;
  parentName?: string;
}

interface Teacher {
  teacherId: number;
  organizationId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeCode: string;
  department?: string;
  subjects?: string[];
  isClassTeacher: boolean;
  hireDate?: string;
}

interface Staff {
  staffId: number;
  organizationId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  employeeCode: string;
  position: string;
  department?: string;
  hireDate?: string;
}

interface Parent {
  parentId: number;
  organizationId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  relationship: string;
  occupation?: string;
  address?: string;
  childrenIds?: number[];
  childrenNames?: string[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`people-tabpanel-${index}`}
      aria-labelledby={`people-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PeopleManagement() {
  const router = useRouter();
  const params = useParams();
  const orgId = parseInt(params.orgId as string, 10);

  // Tab state
  const [tabValue, setTabValue] = useState(0);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Data states
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  // Dialog states
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [openTeacherDialog, setOpenTeacherDialog] = useState(false);
  const [openStaffDialog, setOpenStaffDialog] = useState(false);
  const [openParentDialog, setOpenParentDialog] = useState(false);

  // Form states
  const [studentForm, setStudentForm] = useState({
    studentId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    classId: 0,
    studentCode: '',
    dateOfBirth: '',
    address: '',
    parentId: 0
  });

  const [teacherForm, setTeacherForm] = useState({
    teacherId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeCode: '',
    department: '',
    subjects: [] as string[],
    isClassTeacher: false,
    hireDate: ''
  });

  const [staffForm, setStaffForm] = useState({
    staffId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeCode: '',
    position: '',
    department: '',
    hireDate: ''
  });

  const [parentForm, setParentForm] = useState({
    parentId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    relationship: '',
    occupation: '',
    address: ''
  });

  const [editMode, setEditMode] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchAllData();
  }, [orgId]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API calls
      // For now using mock data
      setStudents([
        {
          studentId: 1,
          organizationId: orgId,
          firstName: 'Alice',
          lastName: 'Johnson',
          email: 'alice.johnson@example.com',
          phone: '123-456-7890',
          classId: 1,
          className: 'Grade 1 - Morning',
          studentCode: 'STU001',
          dateOfBirth: '2015-05-15',
          address: '123 Main St',
          parentId: 1,
          parentName: 'Robert Johnson'
        },
        {
          studentId: 2,
          organizationId: orgId,
          firstName: 'Bob',
          lastName: 'Smith',
          email: 'bob.smith@example.com',
          phone: '123-456-7891',
          classId: 1,
          className: 'Grade 1 - Morning',
          studentCode: 'STU002',
          dateOfBirth: '2015-03-20',
          address: '456 Oak Ave',
          parentId: 2,
          parentName: 'Sarah Smith'
        }
      ]);

      setTeachers([
        {
          teacherId: 1,
          organizationId: orgId,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@school.com',
          phone: '555-0101',
          employeeCode: 'TEA001',
          department: 'Mathematics',
          subjects: ['Math', 'Science'],
          isClassTeacher: true,
          hireDate: '2020-08-15'
        },
        {
          teacherId: 2,
          organizationId: orgId,
          firstName: 'Jane',
          lastName: 'Williams',
          email: 'jane.williams@school.com',
          phone: '555-0102',
          employeeCode: 'TEA002',
          department: 'English',
          subjects: ['English', 'Literature'],
          isClassTeacher: false,
          hireDate: '2019-09-01'
        }
      ]);

      setStaff([
        {
          staffId: 1,
          organizationId: orgId,
          firstName: 'Michael',
          lastName: 'Brown',
          email: 'michael.brown@school.com',
          phone: '555-0201',
          employeeCode: 'STF001',
          position: 'Administrator',
          department: 'Administration',
          hireDate: '2018-07-01'
        },
        {
          staffId: 2,
          organizationId: orgId,
          firstName: 'Lisa',
          lastName: 'Davis',
          email: 'lisa.davis@school.com',
          phone: '555-0202',
          employeeCode: 'STF002',
          position: 'Librarian',
          department: 'Library',
          hireDate: '2021-01-15'
        }
      ]);

      setParents([
        {
          parentId: 1,
          organizationId: orgId,
          firstName: 'Robert',
          lastName: 'Johnson',
          email: 'robert.johnson@email.com',
          phone: '555-0301',
          relationship: 'Father',
          occupation: 'Engineer',
          address: '123 Main St',
          childrenIds: [1],
          childrenNames: ['Alice Johnson']
        },
        {
          parentId: 2,
          organizationId: orgId,
          firstName: 'Sarah',
          lastName: 'Smith',
          email: 'sarah.smith@email.com',
          phone: '555-0302',
          relationship: 'Mother',
          occupation: 'Doctor',
          address: '456 Oak Ave',
          childrenIds: [2],
          childrenNames: ['Bob Smith']
        }
      ]);

      setClasses([
        { classId: 1, className: 'Grade 1 - Morning' },
        { classId: 2, className: 'Grade 2 - Morning' }
      ]);

    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Student handlers
  const handleSaveStudent = async () => {
    try {
      setLoading(true);
      // TODO: API call to save student
      
      if (editMode) {
        setStudents(students.map(s => 
          s.studentId === studentForm.studentId 
            ? { ...s, ...studentForm, organizationId: orgId }
            : s
        ));
      } else {
        const newStudent: Student = {
          ...studentForm,
          studentId: students.length + 1,
          organizationId: orgId,
          className: classes.find(c => c.classId === studentForm.classId)?.className
        };
        setStudents([...students, newStudent]);
      }
      
      setOpenStudentDialog(false);
      resetStudentForm();
    } catch (err) {
      setError('Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = (student: Student) => {
    setStudentForm({
      studentId: student.studentId,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone || '',
      classId: student.classId || 0,
      studentCode: student.studentCode,
      dateOfBirth: student.dateOfBirth || '',
      address: student.address || '',
      parentId: student.parentId || 0
    });
    setEditMode(true);
    setOpenStudentDialog(true);
  };

  const handleDeleteStudent = async (studentId: number) => {
    try {
      // TODO: API call to delete student
      setStudents(students.filter(s => s.studentId !== studentId));
    } catch (err) {
      setError('Failed to delete student');
    }
  };

  const resetStudentForm = () => {
    setStudentForm({
      studentId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      classId: 0,
      studentCode: '',
      dateOfBirth: '',
      address: '',
      parentId: 0
    });
    setEditMode(false);
  };

  // Similar handlers for Teachers, Staff, and Parents would follow the same pattern
  // For brevity, I'll include just the basic structure

  const resetTeacherForm = () => {
    setTeacherForm({
      teacherId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeCode: '',
      department: '',
      subjects: [],
      isClassTeacher: false,
      hireDate: ''
    });
    setEditMode(false);
  };

  const resetStaffForm = () => {
    setStaffForm({
      staffId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeCode: '',
      position: '',
      department: '',
      hireDate: ''
    });
    setEditMode(false);
  };

  const resetParentForm = () => {
    setParentForm({
      parentId: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      relationship: '',
      occupation: '',
      address: ''
    });
    setEditMode(false);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        People Management
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Students" icon={<PersonIcon />} />
            <Tab label="Teachers" icon={<SchoolIcon />} />
            <Tab label="Staff" icon={<WorkIcon />} />
            <Tab label="Parents" icon={<FamilyIcon />} />
          </Tabs>
        </Box>

        {/* Students Tab */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Students ({students.length})</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetStudentForm();
                setOpenStudentDialog(true);
              }}
            >
              Add Student
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Class</TableCell>
                  <TableCell>Parent</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.studentId}>
                    <TableCell>{student.studentCode}</TableCell>
                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.className || 'Not Assigned'}</TableCell>
                    <TableCell>{student.parentName || 'Not Assigned'}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleEditStudent(student)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteStudent(student.studentId)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Teachers Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Teachers ({teachers.length})</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetTeacherForm();
                setOpenTeacherDialog(true);
              }}
            >
              Add Teacher
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Subjects</TableCell>
                  <TableCell>Class Teacher</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.teacherId}>
                    <TableCell>{teacher.employeeCode}</TableCell>
                    <TableCell>{`${teacher.firstName} ${teacher.lastName}`}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.department}</TableCell>
                    <TableCell>
                      {teacher.subjects?.map((subject, index) => (
                        <Chip key={index} label={subject} size="small" sx={{ mr: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={teacher.isClassTeacher ? 'Yes' : 'No'} 
                        color={teacher.isClassTeacher ? 'success' : 'default'} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Staff Tab */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Staff ({staff.length})</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetStaffForm();
                setOpenStaffDialog(true);
              }}
            >
              Add Staff
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Code</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Hire Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staff.map((staffMember) => (
                  <TableRow key={staffMember.staffId}>
                    <TableCell>{staffMember.employeeCode}</TableCell>
                    <TableCell>{`${staffMember.firstName} ${staffMember.lastName}`}</TableCell>
                    <TableCell>{staffMember.email}</TableCell>
                    <TableCell>{staffMember.position}</TableCell>
                    <TableCell>{staffMember.department}</TableCell>
                    <TableCell>{staffMember.hireDate}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Parents Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Parents/Guardians ({parents.length})</Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                resetParentForm();
                setOpenParentDialog(true);
              }}
            >
              Add Parent
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Relationship</TableCell>
                  <TableCell>Children</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {parents.map((parent) => (
                  <TableRow key={parent.parentId}>
                    <TableCell>{`${parent.firstName} ${parent.lastName}`}</TableCell>
                    <TableCell>{parent.email}</TableCell>
                    <TableCell>{parent.phone}</TableCell>
                    <TableCell>{parent.relationship}</TableCell>
                    <TableCell>
                      {parent.childrenNames?.map((childName, index) => (
                        <Chip key={index} label={childName} size="small" sx={{ mr: 0.5 }} />
                      ))}
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Paper>

      {/* Student Dialog */}
      <Dialog open={openStudentDialog} onClose={() => setOpenStudentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="First Name"
                value={studentForm.firstName}
                onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={studentForm.lastName}
                onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
              />
              <TextField
                fullWidth
                label="Phone"
                value={studentForm.phone}
                onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Student Code"
                value={studentForm.studentCode}
                onChange={(e) => setStudentForm({ ...studentForm, studentCode: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select
                  value={studentForm.classId}
                  label="Class"
                  onChange={(e) => setStudentForm({ ...studentForm, classId: Number(e.target.value) })}
                >
                  {classes.map((cls) => (
                    <MenuItem key={cls.classId} value={cls.classId}>
                      {cls.className}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              fullWidth
              label="Date of Birth"
              type="date"
              value={studentForm.dateOfBirth}
              onChange={(e) => setStudentForm({ ...studentForm, dateOfBirth: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Address"
              multiline
              rows={2}
              value={studentForm.address}
              onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenStudentDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveStudent} variant="contained">
            {editMode ? 'Update' : 'Add'} Student
          </Button>
        </DialogActions>
      </Dialog>

      {/* TODO: Add similar dialogs for Teachers, Staff, and Parents */}
    </Container>
  );
} 