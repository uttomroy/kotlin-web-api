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
  Stack,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Shift } from '../types';
import { 
  getShifts, 
  createShift, 
  updateShift, 
  deleteShift,
  type ShiftDTO 
} from '../../../../../services/shiftService';

interface ShiftsTabProps {
  orgId: number;
}

export default function ShiftsTab({ orgId }: ShiftsTabProps) {
  // Data management
  const [shifts, setShifts] = useState<ShiftDTO[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState('');

  // Dialog state management
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [shiftForm, setShiftForm] = useState({
    shiftId: 0,
    shiftName: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchShifts();
  }, [orgId]);

  const fetchShifts = async () => {
    try {
      setDataLoading(true);
      setError('');
      const data = await getShifts(orgId);
      setShifts(data);
    } catch (err) {
      setError('Failed to load shifts');
      console.error('Error fetching shifts:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleAdd = () => {
    setShiftForm({ shiftId: 0, shiftName: '', startTime: '', endTime: '', description: '' });
    setEditMode(false);
    setOpenDialog(true);
  };

  const handleEdit = (shift: ShiftDTO) => {
    setShiftForm({
      shiftId: shift.shiftId,
      shiftName: shift.shiftName,
      startTime: shift.startTime,
      endTime: shift.endTime,
      description: shift.description || ''
    });
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      setActionLoading(true);
      const { shiftId, ...saveData } = shiftForm;
      
      if (editMode) {
        await updateShift(orgId, shiftId, saveData);
      } else {
        await createShift(orgId, saveData);
      }
      
      setOpenDialog(false);
      setShiftForm({ shiftId: 0, shiftName: '', startTime: '', endTime: '', description: '' });
      await fetchShifts(); // Refresh data
    } catch (error) {
      console.error('Failed to save shift:', error);
      setError('Failed to save shift');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await deleteShift(orgId, id);
        await fetchShifts(); // Refresh data
      } catch (error) {
        console.error('Failed to delete shift:', error);
        setError('Failed to delete shift');
      }
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setShiftForm({ shiftId: 0, shiftName: '', startTime: '', endTime: '', description: '' });
  };

  const isFormValid = shiftForm.shiftName.trim() && shiftForm.startTime && shiftForm.endTime;

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
        <Typography variant="h6">Shifts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
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
                  <IconButton onClick={() => handleEdit(shift)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error"
                    onClick={() => handleDelete(shift.shiftId)}
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