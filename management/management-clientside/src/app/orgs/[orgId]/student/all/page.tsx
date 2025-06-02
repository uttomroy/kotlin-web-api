'use client';
import React, { useEffect, useState } from 'react';
import { getStudents } from '@/services/api';
import { StudentSummaryDTO } from '@/types/student';
import { useParams } from 'next/navigation';
import {
  Table, TableHead, TableCell, TableBody, TableRow,
  TableContainer, Paper, Box, TablePagination,
  TextField, InputAdornment, Select, MenuItem, InputLabel,
  FormControl, SelectChangeEvent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function StudentsPage() {
  const params = useParams();
  const [students, setStudents] = useState<StudentSummaryDTO[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentSummaryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [classlabel, setClasslabel] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [anchorEl,setAnchorEl] = useState<null | HTMLElement>(null);
  const orgId = Number(params.orgId);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeClass = (event: SelectChangeEvent) => {
    setClasslabel(event.target.value);
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGenderFilter(event.target.value);
  };

  const handleActionClose= () => {
    setAnchorEl(null);
  }
  const handleActionOn = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  useEffect(() => {
    const filtered = students.filter((student) => {
      const searchString = searchTerm.toLowerCase();
      const matchesSearch = (
        student.studentId.toString().toLowerCase().includes(searchString) ||
        `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchString) ||
        student.classId.toString().toLowerCase().includes(searchString));

      const matchesClass = classlabel === '' || student.classId.toString() === classlabel.toString();
      const matchesGender = genderFilter === '' || student.gender.toLowerCase() === genderFilter.toLowerCase();

      return matchesSearch && matchesClass && matchesGender;
    });

    setFilteredStudents(filtered);
    setPage(0);
  }, [searchTerm, students, classlabel, genderFilter]);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!orgId) {
        setError('Invalid organization ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getStudents(orgId);
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError('Failed to fetch students. Please try again later.');
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [orgId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  interface Column {
    id: 'studentId' | 'name' | 'class' | 'gender' | 'action';
    minWidth: number;
    label: string;
    align?: 'center';
  }

  const columns: Column[] = [
    { id: 'studentId', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'class', label: 'Class', minWidth: 170 },
    { id: 'gender', label: 'Gender', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
  ];

  return (
    <Box sx={{ width: '80%', p: 3, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Class</InputLabel>
          <Select value={classlabel} label="Class" onChange={handleChangeClass}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">One</MenuItem>
            <MenuItem value="2">Two</MenuItem>
            <MenuItem value="3">Three</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Gender</InputLabel>
          <Select value={genderFilter} label="Gender" onChange={handleChangeGender}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{
                      minWidth: column.minWidth,
                      fontWeight: 'bold',
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => (
                  <TableRow key={student.studentId} hover>
                    <TableCell>{student.studentId}</TableCell>
                    <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                    <TableCell>{student.classId}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        onClick={handleActionOn}
                      >
                        <MoreVertIcon/>
                      </IconButton>
                      <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={handleActionClose}
                        >
                            <MenuItem onClick={handleActionClose}>View</MenuItem>
                            <MenuItem onClick={handleActionClose}>Edit</MenuItem>
                            <MenuItem onClick={handleActionClose}>Suspend</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredStudents.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
