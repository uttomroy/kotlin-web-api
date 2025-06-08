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
  TextField,
  IconButton,
  Chip,
  Switch,
  FormControlLabel,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Subject } from '../types';

interface SubjectsTabProps {
  orgId: number;
}

// Mock API functions (replace with actual API calls)
const subjectAPI = {
  fetchSubjects: async (orgId: number): Promise<Subject[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { subjectId: 1, subjectName: 'Mathematics', subjectCode: 'MATH', isCompulsory: true },
      { subjectId: 2, subjectName: 'English', subjectCode: 'ENG', isCompulsory: true },
      { subjectId: 3, subjectName: 'Science', subjectCode: 'SCI', isCompulsory: true }
    ];
  },

  createSubject: async (orgId: number, data: Omit<Subject, 'subjectId'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Creating subject:', { orgId, ...data });
  },

  updateSubject: async (orgId: number, id: number, data: Omit<Subject, 'subjectId'>): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Updating subject:', { orgId, id, ...data });
  },

  deleteSubject: async (orgId: number, id: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Deleting subject:', { orgId, id });
  }
};

export default function SubjectsTab({ orgId }: SubjectsTabProps) {
  // Data management
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    subjectId: 0,
    subjectName: '',
    subjectCode: '',
    isCompulsory: true
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchSubjects();
  }, [orgId]);

  const fetchSubjects = async () => {
    try {
      setDataLoading(true);
      setError('');
      const data = await subjectAPI.fetchSubjects(orgId);
      setSubjects(data);
    } catch (err) {
      setError('Failed to load subjects');
      console.error('Error fetching subjects:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAdd = () => {
    setSubjectForm({ subjectId: 0, subjectName: '', subjectCode: '', isCompulsory: true });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEdit = (subject: Subject) => {
    setSubjectForm({
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
      subjectCode: subject.subjectCode,
      isCompulsory: subject.isCompulsory
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      const { subjectId, ...saveData } = subjectForm;
      
      if (editMode) {
        await subjectAPI.updateSubject(orgId, subjectId, saveData);
      } else {
        await subjectAPI.createSubject(orgId, saveData);
      }
      
      setOpenDialog(false);
      setSubjectForm({ subjectId: 0, subjectName: '', subjectCode: '', isCompulsory: true });
      await fetchSubjects(); // Refresh data
    } catch (error) {
      console.error('Failed to save subject:', error);
      setError('Failed to save subject');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await subjectAPI.deleteSubject(orgId, id);
        await fetchSubjects(); // Refresh data
      } catch (error) {
        console.error('Failed to delete subject:', error);
        setError('Failed to delete subject');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSubjectForm({ subjectId: 0, subjectName: '', subjectCode: '', isCompulsory: true });
  };

  const isFormValid = subjectForm.subjectName.trim() && subjectForm.subjectCode.trim();

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
        <Typography variant="h6">Subjects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
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
                  <IconButton onClick={() => handleEdit(subject)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDelete(subject.subjectId)}
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
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