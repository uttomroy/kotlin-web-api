'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { 
  getDepartments, 
  createDepartment, 
  updateDepartment, 
  deleteDepartment,
  DepartmentDTO,
  CreateDepartmentRequest,
  UpdateDepartmentRequest
} from '../../../../../services/departmentService';

interface DepartmentsTabProps {
  orgId: number;
}

export default function DepartmentsTab({ orgId }: DepartmentsTabProps) {
  const [departments, setDepartments] = useState<DepartmentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<DepartmentDTO | null>(null);
  const [formData, setFormData] = useState<Partial<DepartmentDTO>>({});

  useEffect(() => {
    loadDepartments();
  }, [orgId]);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await getDepartments(orgId);
      setDepartments(response);
    } catch (err) {
      setError('Failed to load departments');
      console.error('Error loading departments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (department?: DepartmentDTO) => {
    if (department) {
      setEditingDepartment(department);
      setFormData(department);
    } else {
      setEditingDepartment(null);
      setFormData({
        name: '',
        description: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingDepartment(null);
    setFormData({});
  };

  const handleInputChange = (field: keyof DepartmentDTO, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      if (!formData.name?.trim()) {
        setError('Department name is required');
        return;
      }

      const departmentData = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null
      };

      if (editingDepartment) {
        // Update existing department
        await updateDepartment(orgId, editingDepartment.id, departmentData);
        // Reload departments to get updated data
        await loadDepartments();
      } else {
        // Create new department
        await createDepartment(orgId, departmentData);
        // Reload departments to get new data
        await loadDepartments();
      }

      handleCloseDialog();
      setError(null);
    } catch (err) {
      setError('Failed to save department');
      console.error('Error saving department:', err);
    }
  };

  const handleDelete = async (department: DepartmentDTO) => {
    if (!confirm(`Are you sure you want to delete the department "${department.name}"?`)) {
      return;
    }

    try {
      await deleteDepartment(orgId, department.id);
      // Reload departments to get updated data
      await loadDepartments();
      setError(null);
    } catch (err) {
      setError('Failed to delete department');
      console.error('Error deleting department:', err);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="h2">
          Departments
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Department
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {departments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <Typography color="textSecondary">
                        No departments found. Create your first department to get started.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  departments.map((department) => (
                    <TableRow key={department.id}>
                      <TableCell>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {department.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {department.description ? (
                          <Typography variant="body2" color="textSecondary">
                            {department.description}
                          </Typography>
                        ) : (
                          <Chip label="No description" size="small" variant="outlined" />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(department)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(department)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingDepartment ? 'Edit Department' : 'Add New Department'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="Department Name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              margin="normal"
              required
              error={!formData.name?.trim()}
              helperText={!formData.name?.trim() ? 'Department name is required' : ''}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              margin="normal"
              multiline
              rows={3}
              placeholder="Optional description of the department"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSave} 
            variant="contained"
            disabled={!formData.name?.trim()}
          >
            {editingDepartment ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 