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
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { ClassLevel } from '../types';
import { 
  getClassLevels, 
  createClassLevel, 
  updateClassLevel, 
  deleteClassLevel,
  type ClassLevelDTO 
} from '../../../../../services/classLevelService';

interface ClassLevelsTabProps {
  orgId: number;
}

export default function ClassLevelsTab({ orgId }: ClassLevelsTabProps) {
  // Data management
  const [classLevels, setClassLevels] = useState<ClassLevelDTO[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [classLevelForm, setClassLevelForm] = useState({ id: 0, name: '' });
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchClassLevels();
  }, [orgId]);

  const fetchClassLevels = async () => {
    try {
      setDataLoading(true);
      setError('');
      const data = await getClassLevels(orgId);
      setClassLevels(data);
    } catch (err) {
      setError('Failed to load class levels');
      console.error('Error fetching class levels:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAdd = () => {
    setClassLevelForm({ id: 0, name: '' });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEdit = (classLevel: ClassLevel) => {
    setClassLevelForm({ id: classLevel.id, name: classLevel.name });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      if (editMode) {
        await updateClassLevel(orgId, classLevelForm.id, { name: classLevelForm.name });
      } else {
        await createClassLevel(orgId, { name: classLevelForm.name });
      }
      setOpenDialog(false);
      setClassLevelForm({ id: 0, name: '' });
      await fetchClassLevels(); // Refresh data
    } catch (error) {
      console.error('Failed to save class level:', error);
      setError('Failed to save class level');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this class level?')) {
      try {
        await deleteClassLevel(orgId, id);
        await fetchClassLevels(); // Refresh data
      } catch (error) {
        console.error('Failed to delete class level:', error);
        setError('Failed to delete class level');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setClassLevelForm({ id: 0, name: '' });
  };

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
        <Typography variant="h6">Class Levels</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
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
                  <IconButton onClick={() => handleEdit(level)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(level.id)}
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
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={actionLoading || !classLevelForm.name.trim()}
          >
            {actionLoading ? 'Saving...' : (editMode ? 'Update' : 'Create')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 