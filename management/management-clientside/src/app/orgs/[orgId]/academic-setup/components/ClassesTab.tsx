import React, { useState, useEffect } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { ClassLevel, Shift, Class, Teacher } from '../types';

interface ClassFormData {
  classId: number;
  classLevelId: string;
  shiftId: string;
  classTeacherId: string;
}

interface ClassesTabProps {
  orgId: number;
}

// Mock API functions (replace with actual API calls)
const classAPI = {
  fetchClasses: async (orgId: number): Promise<Class[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { classId: 1, organizationId: orgId, classLevelId: 1, classLevelName: 'Grade 1', shiftId: 1, shiftName: 'Morning Shift', classTeacherId: 1, teacherName: 'John Doe' }
    ];
  },

  fetchClassLevels: async (orgId: number): Promise<ClassLevel[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, organizationId: orgId, name: 'Grade 1' },
      { id: 2, organizationId: orgId, name: 'Grade 2' },
      { id: 3, organizationId: orgId, name: 'Grade 3' }
    ];
  },

  fetchShifts: async (orgId: number): Promise<Shift[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { shiftId: 1, organizationId: orgId, shiftName: 'Morning Shift', startTime: '08:00', endTime: '12:00', description: 'Morning classes' },
      { shiftId: 2, organizationId: orgId, shiftName: 'Day Shift', startTime: '13:00', endTime: '17:00', description: 'Afternoon classes' }
    ];
  },

  fetchTeachers: async (orgId: number): Promise<Teacher[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Bob Johnson' }
    ];
  },

  createClass: async (orgId: number, data: Omit<Class, 'classId' | 'organizationId' | 'classLevelName' | 'shiftName' | 'teacherName'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Creating class:', { orgId, ...data });
  },

  updateClass: async (orgId: number, id: number, data: Omit<Class, 'classId' | 'organizationId' | 'classLevelName' | 'shiftName' | 'teacherName'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Updating class:', { orgId, id, ...data });
  },

  deleteClass: async (orgId: number, id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Deleting class:', { orgId, id });
  }
};

export default function ClassesTab({ orgId }: ClassesTabProps) {
  // Data management
  const [classes, setClasses] = useState<Class[]>([]);
  const [classLevels, setClassLevels] = useState<ClassLevel[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [classForm, setClassForm] = useState<ClassFormData>({
    classId: 0,
    classLevelId: '',
    shiftId: '',
    classTeacherId: ''
  });

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, [orgId]);

  const fetchAllData = async () => {
    try {
      setDataLoading(true);
      setError('');
      
      // Fetch all required data in parallel
      const [classesData, classLevelsData, shiftsData, teachersData] = await Promise.all([
        classAPI.fetchClasses(orgId),
        classAPI.fetchClassLevels(orgId),
        classAPI.fetchShifts(orgId),
        classAPI.fetchTeachers(orgId)
      ]);
      
      setClasses(classesData);
      setClassLevels(classLevelsData);
      setShifts(shiftsData);
      setTeachers(teachersData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAdd = () => {
    setClassForm({ classId: 0, classLevelId: '', shiftId: '', classTeacherId: '' });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEdit = (classItem: Class) => {
    setClassForm({
      classId: classItem.classId,
      classLevelId: classItem.classLevelId.toString(),
      shiftId: classItem.shiftId.toString(),
      classTeacherId: classItem.classTeacherId.toString()
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      const saveData = {
        classLevelId: parseInt(classForm.classLevelId),
        shiftId: parseInt(classForm.shiftId),
        classTeacherId: parseInt(classForm.classTeacherId)
      };
      
      if (editMode) {
        await classAPI.updateClass(orgId, classForm.classId, saveData);
      } else {
        await classAPI.createClass(orgId, saveData);
      }
      
      setOpenDialog(false);
      setClassForm({ classId: 0, classLevelId: '', shiftId: '', classTeacherId: '' });
      await fetchAllData(); // Refresh data
    } catch (error) {
      console.error('Failed to save class:', error);
      setError('Failed to save class');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await classAPI.deleteClass(orgId, id);
        await fetchAllData(); // Refresh data
      } catch (error) {
        console.error('Failed to delete class:', error);
        setError('Failed to delete class');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setClassForm({ classId: 0, classLevelId: '', shiftId: '', classTeacherId: '' });
  };

  const isFormValid = classForm.classLevelId && classForm.shiftId && classForm.classTeacherId;

  if (dataLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Classes</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
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
                  <IconButton onClick={() => handleEdit(cls)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDelete(cls.classId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
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
          <FormControl fullWidth sx={{ mt: 2 }}>
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={actionLoading || !isFormValid}
          >
            {actionLoading ? 'Saving...' : (editMode ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 