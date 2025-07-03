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
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Class, Subject, ClassSubjectMapping, Teacher } from '../types';

interface MappingFormData {
  mappingId: number;
  classId: string;
  subjectId: string;
  teacherId: string;
}

interface SubjectMappingTabProps {
  orgId: number;
}

// Mock API functions (replace with actual API calls)
const mappingAPI = {
  fetchMappings: async (orgId: number): Promise<ClassSubjectMapping[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { mappingId: 1, classId: 1, className: 'Grade 1 - Morning', subjectId: 1, subjectName: 'Mathematics', teacherId: 1, teacherName: 'John Doe' }
    ];
  },

  fetchClasses: async (orgId: number): Promise<Class[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { classId: 1, organizationId: orgId, classLevelId: 1, classLevelName: 'Grade 1', shiftId: 1, shiftName: 'Morning Shift', classTeacherId: 1, teacherName: 'John Doe' }
    ];
  },

  fetchSubjects: async (orgId: number): Promise<Subject[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { subjectId: 1, subjectName: 'Mathematics', subjectCode: 'MATH', isCompulsory: true },
      { subjectId: 2, subjectName: 'English', subjectCode: 'ENG', isCompulsory: true },
      { subjectId: 3, subjectName: 'Science', subjectCode: 'SCI', isCompulsory: true }
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

  createMapping: async (orgId: number, data: Omit<ClassSubjectMapping, 'mappingId' | 'className' | 'subjectName' | 'teacherName'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Creating mapping:', { orgId, ...data });
  },

  updateMapping: async (orgId: number, id: number, data: Omit<ClassSubjectMapping, 'mappingId' | 'className' | 'subjectName' | 'teacherName'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Updating mapping:', { orgId, id, ...data });
  },

  deleteMapping: async (orgId: number, id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Deleting mapping:', { orgId, id });
  }
};

export default function SubjectMappingTab({ orgId }: SubjectMappingTabProps) {
  // Data management
  const [mappings, setMappings] = useState<ClassSubjectMapping[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [mappingForm, setMappingForm] = useState<MappingFormData>({
    mappingId: 0,
    classId: '',
    subjectId: '',
    teacherId: ''
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
      const [mappingsData, classesData, subjectsData, teachersData] = await Promise.all([
        mappingAPI.fetchMappings(orgId),
        mappingAPI.fetchClasses(orgId),
        mappingAPI.fetchSubjects(orgId),
        mappingAPI.fetchTeachers(orgId)
      ]);
      
      setMappings(mappingsData);
      setClasses(classesData);
      setSubjects(subjectsData);
      setTeachers(teachersData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error fetching data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAdd = () => {
    setMappingForm({ mappingId: 0, classId: '', subjectId: '', teacherId: '' });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEdit = (mapping: ClassSubjectMapping) => {
    setMappingForm({
      mappingId: mapping.mappingId,
      classId: mapping.classId.toString(),
      subjectId: mapping.subjectId.toString(),
      teacherId: mapping.teacherId.toString()
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      const saveData = {
        classId: parseInt(mappingForm.classId),
        subjectId: parseInt(mappingForm.subjectId),
        teacherId: parseInt(mappingForm.teacherId)
      };
      
      if (editMode) {
        await mappingAPI.updateMapping(orgId, mappingForm.mappingId, saveData);
      } else {
        await mappingAPI.createMapping(orgId, saveData);
      }
      
      setOpenDialog(false);
      setMappingForm({ mappingId: 0, classId: '', subjectId: '', teacherId: '' });
      await fetchAllData(); // Refresh data
    } catch (error) {
      console.error('Failed to save mapping:', error);
      setError('Failed to save mapping');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this subject mapping?')) {
      try {
        await mappingAPI.deleteMapping(orgId, id);
        await fetchAllData(); // Refresh data
      } catch (error) {
        console.error('Failed to delete mapping:', error);
        setError('Failed to delete mapping');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMappingForm({ mappingId: 0, classId: '', subjectId: '', teacherId: '' });
  };

  const isFormValid = mappingForm.classId && mappingForm.subjectId && mappingForm.teacherId;

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
        <Typography variant="h6">Subject Mapping</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Subject Mapping
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
            {mappings.map((mapping) => (
              <TableRow key={mapping.mappingId}>
                <TableCell>
                  <Chip label={mapping.className} color="primary" size="small" />
                </TableCell>
                <TableCell>{mapping.subjectName}</TableCell>
                <TableCell>{mapping.teacherName}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(mapping)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDelete(mapping.mappingId)}
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
        <DialogTitle>{editMode ? 'Edit Subject Mapping' : 'Add Subject Mapping'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Class</InputLabel>
            <Select
              value={mappingForm.classId}
              label="Class"
              onChange={(e) => setMappingForm({ ...mappingForm, classId: e.target.value as string })}
            >
              {classes.map((cls) => (
                <MenuItem key={cls.classId} value={cls.classId}>
                  {cls.classLevelName} - {cls.shiftName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={mappingForm.subjectId}
                label="Subject"
                onChange={(e) => setMappingForm({ ...mappingForm, subjectId: e.target.value as string })}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.subjectId} value={subject.subjectId}>
                    {subject.subjectName} ({subject.subjectCode})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Teacher</InputLabel>
              <Select
                value={mappingForm.teacherId}
                label="Teacher"
                onChange={(e) => setMappingForm({ ...mappingForm, teacherId: e.target.value as string })}
              >
                {teachers.map((teacher) => (
                  <MenuItem key={teacher.id} value={teacher.id}>{teacher.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
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