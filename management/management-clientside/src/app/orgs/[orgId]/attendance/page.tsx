'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  TextField,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, getDaysInMonth, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/services/api';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface AttendanceRecord {
  studentId: number;
  studentName: string;
  attendance: Record<string, 'present' | 'absent' | 'late'>;
}

interface Class {
  id: number;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

export default function Attendance() {
  const router = useRouter();
  const params = useParams();
  const orgId = parseInt(params.orgId as string, 10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [selectedClass, setSelectedClass] = useState<number | ''>('');
  const [selectedSubject, setSelectedSubject] = useState<number | ''>('');
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(new Date());
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const fetchAttendance = async () => {
    if (!selectedClass || !selectedSubject || !selectedMonth) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Format the month as YYYY-MM
      const monthStr = format(selectedMonth, 'yyyy-MM');
      console.log('Selected Month:', monthStr);
      
      // Mock data with daily attendance for the current selected month
      const currentMonth = format(selectedMonth, 'MM');
      const currentYear = format(selectedMonth, 'yyyy');
      
      const mockAttendance = [
        {
          studentId: 1,
          studentName: 'John Doe',
          attendance: {} as Record<string, 'present' | 'absent' | 'late'>
        },
        {
          studentId: 2,
          studentName: 'Jane Smith',
          attendance: {} as Record<string, 'present' | 'absent' | 'late'>
        },
        {
          studentId: 3,
          studentName: 'Bob Johnson',
          attendance: {} as Record<string, 'present' | 'absent' | 'late'>
        },
        {
          studentId: 4,
          studentName: 'Alice Brown',
          attendance: {} as Record<string, 'present' | 'absent' | 'late'>
        }
      ];

      // Generate attendance data for the selected month
      const daysInMonth = getDaysInMonth(selectedMonth);
      mockAttendance.forEach(student => {
        for (let day = 1; day <= daysInMonth; day++) {
          const date = `${currentYear}-${currentMonth}-${String(day).padStart(2, '0')}`;
          student.attendance[date] = ['present', 'absent', 'late'][Math.floor(Math.random() * 3)] as 'present' | 'absent' | 'late';
        }
      });

      console.log('Mock Attendance Data:', mockAttendance);
      setAttendanceData(mockAttendance);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
      setError('Failed to load attendance data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch classes and subjects when component mounts
  useEffect(() => {
    const fetchClassesAndSubjects = async () => {
      try {
        // TODO: Replace with actual API calls when backend is ready
        // const classesResponse = await api.get(`/orgs/${orgId}/classes`);
        // const subjectsResponse = await api.get(`/orgs/${orgId}/subjects`);
        
        // Mock data
        setClasses([
          { id: 1, name: 'Class 1' },
          { id: 2, name: 'Class 2' },
          { id: 3, name: 'Class 3' }
        ]);
        
        setSubjects([
          { id: 1, name: 'Mathematics' },
          { id: 2, name: 'Science' },
          { id: 3, name: 'English' }
        ]);
      } catch (error) {
        console.error('Failed to fetch classes and subjects:', error);
        setError('Failed to load classes and subjects');
      }
    };

    fetchClassesAndSubjects();
  }, [orgId]);

  // Fetch attendance data when class, subject, or month are selected
  useEffect(() => {
    fetchAttendance();
  }, [orgId, selectedClass, selectedSubject, selectedMonth]);

  const handleMarkAttendance = () => {
    if (!selectedClass || !selectedSubject) {
      setError('Please select both class and subject before marking attendance');
      return;
    }
    router.push(`/orgs/${orgId}/attendance/mark?classId=${selectedClass}&subjectId=${selectedSubject}`);
  };

  const handleSearch = () => {
    if (!selectedClass || !selectedSubject || !selectedMonth) {
      setError('Please select all filters before searching');
      return;
    }
    fetchAttendance();
  };

  // Function to get formatted date string
  const getFormattedDate = (date: Date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  };

  // Function to get all dates in the selected month
  const getMonthDates = () => {
    if (!selectedMonth) return [];
    
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    const dates = eachDayOfInterval({ start, end });
    console.log('Month Dates:', dates.map(d => format(d, 'yyyy-MM-dd')));
    return dates;
  };

  // Function to render attendance status cell
  const renderAttendanceStatus = (status: 'present' | 'absent' | 'late' | undefined) => {
    if (!status) return '-';

    const statusConfig = {
      present: {
        icon: <CheckCircleIcon />,
        color: 'success.main'
      },
      absent: {
        icon: <CancelIcon />,
        color: 'error.main'
      },
      late: {
        icon: <AccessTimeIcon />,
        color: 'warning.main'
      }
    };

    const config = statusConfig[status];

    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: config.color
        }}
      >
        {config.icon}
      </Box>
    );
  };

  // Function to calculate attendance summary
  const getAttendanceSummary = (attendance: Record<string, 'present' | 'absent' | 'late'>) => {
    const summary = {
      present: 0,
      absent: 0,
      late: 0,
      total: 0
    };

    Object.values(attendance).forEach(status => {
      summary[status]++;
      summary.total++;
    });

    return { counts: summary };
  };

  // Function to render student info
  const renderStudentInfo = (student: AttendanceRecord) => (
    <Typography variant="body2">
      {student.studentName} ({student.studentId})
    </Typography>
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        {/* Header with Mark Attendance Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Box>
            <Typography variant="h4" component="h1" sx={{ color: 'primary.main', fontWeight: 500 }}>
              Student Attendance
            </Typography>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary', mt: 0.5 }}>
              Track and manage daily attendance records
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleMarkAttendance}
            disabled={!selectedClass || !selectedSubject}
            startIcon={<AddIcon />}
            sx={{ height: '40px' }}
          >
            Mark Attendance
          </Button>
        </Box>

        {/* Filter Section */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
            Attendance Filters
          </Typography>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            alignItems="center"
            sx={{
              '& .MuiFormControl-root': {
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'action.hover',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    }
                  },
                  '&.Mui-focused': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderWidth: 2
                    }
                  }
                },
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: 'primary.main'
                  }
                }
              }
            }}
          >
            <FormControl sx={{ minWidth: 150, width: { xs: '100%', sm: '25%' } }}>
              <InputLabel id="class-select-label">Class</InputLabel>
              <Select
                labelId="class-select-label"
                value={selectedClass}
                label="Class"
                onChange={(e) => setSelectedClass(e.target.value as number)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 250,
                      '& .MuiMenuItem-root': {
                        py: 1
                      }
                    }
                  }
                }}
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 150, width: { xs: '100%', sm: '25%' } }}>
              <InputLabel id="subject-select-label">Subject</InputLabel>
              <Select
                labelId="subject-select-label"
                value={selectedSubject}
                label="Subject"
                onChange={(e) => setSelectedSubject(e.target.value as number)}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 250,
                      '& .MuiMenuItem-root': {
                        py: 1
                      }
                    }
                  }
                }}
              >
                {subjects.map((subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Select Month"
                value={selectedMonth}
                onChange={(newValue: Date | null) => setSelectedMonth(newValue)}
                views={['year', 'month']}
                slotProps={{
                  textField: {
                    sx: { 
                      minWidth: 150,
                      width: { xs: '100%', sm: '25%' }
                    }
                  }
                }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={!selectedClass || !selectedSubject || !selectedMonth}
              startIcon={<SearchIcon />}
              sx={{ 
                minWidth: '120px',
                height: '56px',
                width: { xs: '100%', sm: 'auto' },
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 3,
                  bgcolor: 'primary.dark'
                },
                '&.Mui-disabled': {
                  bgcolor: 'action.disabledBackground',
                  color: 'text.disabled'
                }
              }}
            >
              Search
            </Button>
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Attendance Data */}
        <Paper 
          elevation={2}
          sx={{ 
            p: 3,
            borderRadius: 2,
            '& .MuiTableCell-root': {
              borderColor: 'divider'
            },
            position: 'relative',
            isolation: 'isolate'
          }}
        >
          {loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : selectedClass && selectedSubject && selectedMonth ? (
            <TableContainer 
              sx={{ 
                overflowX: 'auto',
                overflowY: 'visible',
                isolation: 'isolate',
                '& .sticky-column': {
                  position: 'sticky',
                  left: 0,
                  zIndex: 10,
                  background: (theme) => `${theme.palette.background.paper} !important`,
                  borderRight: '1px solid',
                  borderColor: 'divider'
                },
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'action.hover',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'primary.main',
                  borderRadius: '4px',
                }
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell 
                      className="sticky-column"
                      sx={{ 
                        minWidth: 250,
                        fontWeight: 'bold',
                        borderBottom: 2,
                        borderBottomColor: 'primary.main'
                      }}
                    >
                      Student Information
                    </TableCell>
                    {getMonthDates().map((date) => (
                      <TableCell 
                        key={format(date, 'yyyy-MM-dd')}
                        align="center"
                        sx={{ 
                          minWidth: 60,
                          px: 1,
                          whiteSpace: 'nowrap',
                          fontWeight: 'bold',
                          borderBottom: 2,
                          borderBottomColor: 'primary.main'
                        }}
                      >
                        <Typography 
                          variant="caption" 
                          display="block" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: 'text.primary' 
                          }}
                        >
                          {format(date, 'EEE')}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          display="block"
                          sx={{ color: 'text.secondary' }}
                        >
                          {format(date, 'd')}
                        </Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData.map((student) => (
                    <TableRow 
                      key={student.studentId}
                      sx={{
                        '&:hover': {
                          '& .sticky-column': {
                            bgcolor: 'action.hover !important'
                          }
                        }
                      }}
                    >
                      <TableCell 
                        component="th" 
                        scope="row"
                        className="sticky-column"
                        sx={{ 
                          minWidth: 250,
                          borderBottom: 1,
                          borderBottomColor: 'divider'
                        }}
                      >
                        {renderStudentInfo(student)}
                      </TableCell>
                      {getMonthDates().map((date) => {
                        const formattedDate = getFormattedDate(date);
                        const status = student.attendance[formattedDate];
                        return (
                          <TableCell 
                            key={formattedDate}
                            align="center"
                            sx={{ 
                              minWidth: 60,
                              px: 1
                            }}
                          >
                            {renderAttendanceStatus(status)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography color="text.secondary">
                Please select a class, subject, and month to view attendance records
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
} 