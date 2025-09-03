'use client'
import { useParam,useRouter } from 'next/router';
import {getStudentById} from '@/services/studentService'
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Grid,
  Container,
  Avatar
} from '@mui/material';

const StudentDetails = () {
      const studentId = useParam().studentId;

     return (
        Typography variant="h6" sx={{ mb: 2 }}>
                  {studentId}
        </Typography>
     )
};