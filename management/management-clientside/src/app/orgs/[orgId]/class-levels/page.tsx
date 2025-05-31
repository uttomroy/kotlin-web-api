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
  Switch,
  FormControlLabel,
  Stack
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  Class as ClassIcon,
  Subject as SubjectIcon,
  Book as BookIcon
} from '@mui/icons-material';
import { useRouter, useParams } from 'next/navigation';

interface ClassLevel {
  id: number;
  organizationId: number;
  name: string;
}

interface Shift {
  shiftId: number;
  organizationId: number;
  shiftName: string;
  startTime: string;
  endTime: string;
  description?: string;
}

interface Class {
  classId: number;
  organizationId: number;
  classLevelId: number;
  classLevelName: string;
  shiftId: number;
  shiftName: string;
  classTeacherId: number;
  teacherName?: string;
}

interface Subject {
  subjectId: number;
  subjectName: string;
  subjectCode: string;
  isCompulsory: boolean;
}

interface ClassSubjectMapping {
  id: number;
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
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
      id={`class-tabpanel-${index}`}
      aria-labelledby={`class-tab-${index}`}
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

export default function ClassLevelsManagement() {
  const router = useRouter();
  const params = useParams();
  const orgId = parseInt(params.orgId as string, 10);

  // Tab state
  const [tabValue, setTabValue] = useState(0);

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Data states
  const [classLevels, setClassLevels] = useState<ClassLevel[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classSubjectMappings, setClassSubjectMappings] = useState<ClassSubjectMapping[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  // Dialog states
  const [openClassLevelDialog, setOpenClassLevelDialog] = useState(false);
  const [openShiftDialog, setOpenShiftDialog] = useState(false);
  const [openClassDialog, setOpenClassDialog] = useState(false);
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openMappingDialog, setOpenMappingDialog] = useState(false);

  // Form states
  const [classLevelForm, setClassLevelForm] = useState({ id: 0, name: '' });
  const [shiftForm, setShiftForm] = useState({
    shiftId: 0,
    shiftName: '',
    startTime: '',
    endTime: '',
    description: ''
  });
  const [classForm, setClassForm] = useState({
    classId: 0,
    classLevelId: '',
    shiftId: '',
    classTeacherId: ''
  });
  const [subjectForm, setSubjectForm] = useState({
    subjectId: 0,
    subjectName: '',
    subjectCode: '',
    isCompulsory: true
  });
  const [mappingForm, setMappingForm] = useState({
    id: 0,
    classId: '',
    subjectId: '',
    teacherId: ''
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
      setClassLevels([
        { id: 1, organizationId: orgId, name: 'Grade 1' },
        { id: 2, organizationId: orgId, name: 'Grade 2' },
        { id: 3, organizationId: orgId, name: 'Grade 3' }
      ]);

      setShifts([
        { shiftId: 1, organizationId: orgId, shiftName: 'Morning Shift', startTime: '08:00', endTime: '12:00', description: 'Morning classes' },
        { shiftId: 2, organizationId: orgId, shiftName: 'Day Shift', startTime: '13:00', endTime: '17:00', description: 'Afternoon classes' }
      ]);

      setClasses([
        { classId: 1, organizationId: orgId, classLevelId: 1, classLevelName: 'Grade 1', shiftId: 1, shiftName: 'Morning Shift', classTeacherId: 1, teacherName: 'John Doe' }
      ]);

      setSubjects([
        { subjectId: 1, subjectName: 'Mathematics', subjectCode: 'MATH', isCompulsory: true },
        { subjectId: 2, subjectName: 'English', subjectCode: 'ENG', isCompulsory: true },
        { subjectId: 3, subjectName: 'Science', subjectCode: 'SCI', isCompulsory: true }
      ]);

      setTeachers([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Bob Johnson' }
      ]);

    } catch (error) {
      setError('Failed to load data');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Class Level handlers
  const handleSaveClassLevel = async () => {
    try {
      if (editMode) {
        // Update existing class level
        console.log('Updating class level:', classLevelForm);
      } else {
        // Create new class level
        console.log('Creating class level:', classLevelForm);
      }
      setOpenClassLevelDialog(false);
      setClassLevelForm({ id: 0, name: '' });
      setEditMode(false);
      fetchAllData();
    } catch (error) {
      setError('Failed to save class level');
    }
  };

  // Shift handlers
  const handleSaveShift = async () => {
    try {
      if (editMode) {
        console.log('Updating shift:', shiftForm);
      } else {
        console.log('Creating shift:', shiftForm);
      }
      setOpenShiftDialog(false);
      setShiftForm({ shiftId: 0, shiftName: '', startTime: '', endTime: '', description: '' });
      setEditMode(false);
      fetchAllData();
    } catch (error) {
      setError('Failed to save shift');
    }
  };

  // Class handlers
  const handleSaveClass = async () => {
    try {
      if (editMode) {
        console.log('Updating class:', classForm);
      } else {
        console.log('Creating class:', classForm);
      }
      setOpenClassDialog(false);
      setClassForm({ classId: 0, classLevelId: '', shiftId: '', classTeacherId: '' });
      setEditMode(false);
      fetchAllData();
    } catch (error) {
      setError('Failed to save class');
    }
  };

  // Subject handlers
  const handleSaveSubject = async () => {
    try {
      if (editMode) {
        console.log('Updating subject:', subjectForm);
      } else {
        console.log('Creating subject:', subjectForm);
      }
      setOpenSubjectDialog(false);
      setSubjectForm({ subjectId: 0, subjectName: '', subjectCode: '', isCompulsory: true });
      setEditMode(false);
      fetchAllData();
    } catch (error) {
      setError('Failed to save subject');
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ color: 'primary.main', fontWeight: 500 }}>
            Class Levels Management
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            Manage class levels, shifts, classes, and subject mappings
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Tabs */}
        <Paper sx={{ borderRadius: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="class management tabs">
              <Tab icon={<SchoolIcon />} label="Class Levels" />
              <Tab icon={<ScheduleIcon />} label="Shifts" />
              <Tab icon={<ClassIcon />} label="Classes" />
              <Tab icon={<BookIcon />} label="Subjects" />
              <Tab icon={<SubjectIcon />} label="Subject Mapping" />
            </Tabs>
          </Box>

          {/* Class Levels Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Class Levels</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setClassLevelForm({ id: 0, name: '' });
                  setEditMode(false);
                  setOpenClassLevelDialog(true);
                }}
              >
                Add Class Level
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classLevels.map((level) => (
                    <TableRow key={level.id}>
                      <TableCell>{level.id}</TableCell>
                      <TableCell>{level.name}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setClassLevelForm({ id: level.id, name: level.name });
                            setEditMode(true);
                            setOpenClassLevelDialog(true);
                          }}
                        >
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

          {/* Shifts Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Shifts</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setShiftForm({ shiftId: 0, shiftName: '', startTime: '', endTime: '', description: '' });
                  setEditMode(false);
                  setOpenShiftDialog(true);
                }}
              >
                Add Shift
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Shift Name</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {shifts.map((shift) => (
                    <TableRow key={shift.shiftId}>
                      <TableCell>{shift.shiftName}</TableCell>
                      <TableCell>{shift.startTime}</TableCell>
                      <TableCell>{shift.endTime}</TableCell>
                      <TableCell>{shift.description}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setShiftForm({
                              shiftId: shift.shiftId,
                              shiftName: shift.shiftName,
                              startTime: shift.startTime,
                              endTime: shift.endTime,
                              description: shift.description || ''
                            });
                            setEditMode(true);
                            setOpenShiftDialog(true);
                          }}
                        >
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

          {/* Classes Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Classes</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setClassForm({ classId: 0, classLevelId: '', shiftId: '', classTeacherId: '' });
                  setEditMode(false);
                  setOpenClassDialog(true);
                }}
              >
                Add Class
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class Level</TableCell>
                    <TableCell>Shift</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((cls) => (
                    <TableRow key={cls.classId}>
                      <TableCell>{cls.classLevelName}</TableCell>
                      <TableCell>{cls.shiftName}</TableCell>
                      <TableCell>{cls.teacherName}</TableCell>
                      <TableCell>
                        <IconButton>
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

          {/* Subjects Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Subjects</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setSubjectForm({ subjectId: 0, subjectName: '', subjectCode: '', isCompulsory: true });
                  setEditMode(false);
                  setOpenSubjectDialog(true);
                }}
              >
                Add Subject
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Subject Code</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {subjects.map((subject) => (
                    <TableRow key={subject.subjectId}>
                      <TableCell>{subject.subjectName}</TableCell>
                      <TableCell>{subject.subjectCode}</TableCell>
                      <TableCell>
                        <Chip 
                          label={subject.isCompulsory ? 'Compulsory' : 'Optional'} 
                          color={subject.isCompulsory ? 'primary' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setSubjectForm({
                              subjectId: subject.subjectId,
                              subjectName: subject.subjectName,
                              subjectCode: subject.subjectCode,
                              isCompulsory: subject.isCompulsory
                            });
                            setEditMode(true);
                            setOpenSubjectDialog(true);
                          }}
                        >
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

          {/* Subject Mapping Tab */}
          <TabPanel value={tabValue} index={4}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Class-Subject Mapping</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenMappingDialog(true)}
              >
                Add Mapping
              </Button>
            </Box>
            
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Class</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classSubjectMappings.map((mapping) => (
                    <TableRow key={mapping.id}>
                      <TableCell>{mapping.className}</TableCell>
                      <TableCell>{mapping.subjectName}</TableCell>
                      <TableCell>{mapping.teacherName}</TableCell>
                      <TableCell>
                        <IconButton>
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

        {/* Dialogs */}
        
        {/* Class Level Dialog */}
        <Dialog open={openClassLevelDialog} onClose={() => setOpenClassLevelDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editMode ? 'Edit Class Level' : 'Add Class Level'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Class Level Name"
              fullWidth
              variant="outlined"
              value={classLevelForm.name}
              onChange={(e) => setClassLevelForm({ ...classLevelForm, name: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenClassLevelDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveClassLevel} variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Shift Dialog */}
        <Dialog open={openShiftDialog} onClose={() => setOpenShiftDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editMode ? 'Edit Shift' : 'Add Shift'}</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Shift Name"
              fullWidth
              variant="outlined"
              value={shiftForm.shiftName}
              onChange={(e) => setShiftForm({ ...shiftForm, shiftName: e.target.value })}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Start Time"
                type="time"
                fullWidth
                variant="outlined"
                value={shiftForm.startTime}
                onChange={(e) => setShiftForm({ ...shiftForm, startTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Time"
                type="time"
                fullWidth
                variant="outlined"
                value={shiftForm.endTime}
                onChange={(e) => setShiftForm({ ...shiftForm, endTime: e.target.value })}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={shiftForm.description}
              onChange={(e) => setShiftForm({ ...shiftForm, description: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenShiftDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveShift} variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Class Dialog */}
        <Dialog open={openClassDialog} onClose={() => setOpenClassDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>{editMode ? 'Edit Class' : 'Add Class'}</DialogTitle>
          <DialogContent>
            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel>Class Level</InputLabel>
                <Select
                  value={classForm.classLevelId}
                  label="Class Level"
                  onChange={(e) => setClassForm({ ...classForm, classLevelId: e.target.value as string })}
                >
                  {classLevels.map((level) => (
                    <MenuItem key={level.id} value={level.id}>{level.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Shift</InputLabel>
                <Select
                  value={classForm.shiftId}
                  label="Shift"
                  onChange={(e) => setClassForm({ ...classForm, shiftId: e.target.value as string })}
                >
                  {shifts.map((shift) => (
                    <MenuItem key={shift.shiftId} value={shift.shiftId}>{shift.shiftName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
            <FormControl fullWidth>
              <InputLabel>Class Teacher</InputLabel>
              <Select
                value={classForm.classTeacherId}
                label="Class Teacher"
                onChange={(e) => setClassForm({ ...classForm, classTeacherId: e.target.value as string })}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenClassDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveClass} variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Subject Dialog */}
        <Dialog open={openSubjectDialog} onClose={() => setOpenSubjectDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editMode ? 'Edit Subject' : 'Add Subject'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Subject Name"
              fullWidth
              variant="outlined"
              value={subjectForm.subjectName}
              onChange={(e) => setSubjectForm({ ...subjectForm, subjectName: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Subject Code"
              fullWidth
              variant="outlined"
              value={subjectForm.subjectCode}
              onChange={(e) => setSubjectForm({ ...subjectForm, subjectCode: e.target.value })}
              placeholder="e.g., MATH, ENG, SCI"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={subjectForm.isCompulsory}
                  onChange={(e) => setSubjectForm({ ...subjectForm, isCompulsory: e.target.checked })}
                />
              }
              label="Compulsory Subject"
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSubjectDialog(false)}>Cancel</Button>
            <Button onClick={handleSaveSubject} variant="contained">
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </Container>
  );
} 