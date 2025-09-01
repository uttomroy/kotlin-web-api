"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { getStudentById } from "@/services/studentService";
import { ComEducationModelsStudentDTO } from "@/generated/api";

import {
  Box,
  Typography,
  Paper,
  Divider,
  Chip,
  Container,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";

const InfoTable = ({
  data,
}: {
  data: { label: string; value?: string | number | null }[];
}) => (
  <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
    <Table size="small" aria-label="info table">
      <TableBody>
        {data.map(({ label, value }) => (
          <TableRow key={label} hover>
            <TableCell
              component="th"
              scope="row"
              sx={{ fontWeight: "bold", width: "40%" }}
            >
              {label}
            </TableCell>
            <TableCell>{value || "N/A"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const StudentDetails = () => {
  const params = useParams();
  const router = useRouter();
  const studentId = params.studentId;
  const [student, setStudent] =
  React.useState<ComEducationModelsStudentDTO | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  React.useEffect(() => {
    if (!studentId) return;
    setLoading(true);
    setError(null);
    getStudentById(Number(studentId))
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [studentId]);

  const handleActionEdit = (id: number) => {
    const orgId = student?.organizationId || "defaultOrg";
    router.push(`/orgs/${orgId}/student/edit/${id}`);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Box sx={{ color: "red", mt: 4, textAlign: "center" }}>
        Error: {error}
      </Box>
    );
  if (!student)
    return <Box sx={{ mt: 4, textAlign: "center" }}>No student found.</Box>;

  // Prepare data arrays for each section
  const generalInfo = [
    { label: "System ID", value: student.id },
    { label: "Class ID", value: student.classId },
    { label: "Enrollment Date", value: student.enrollmentDate },
    { label: "Organization ID", value: student.organizationId },
    { label: "User ID", value: student.userId },
  ];

  const personalInfo = [
    { label: "First Name", value: student.firstName },
    { label: "Last Name", value: student.lastName },
    { label: "Gender", value: student.gender },
    { label: "Father's Name", value: student.fatherName },
    { label: "Mother's Name", value: student.motherName },
    { label: "Address", value: student.address },
  ];

  const otherInfo = [
    { label: "Parent Contact", value: student.parentContact },
    { label: "Emergency Contact", value: student.emergencyContact },
    { label: "Photo URL", value: student.photoUrl },
    { label: "Status", value: student.status },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box sx={{ textAlign: "left", mb: 3 }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => handleActionEdit(student.id!)}
        >
          Edit
        </Button>
      </Box>

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            {student.firstName} {student.lastName}
          </Typography>
          <Chip label={student.status} color="primary" />
        </Box>
        <Avatar
          sx={{
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 120 },
            bgcolor: "primary.main",
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          {getInitials(student.firstName + " " + student.lastName)}
        </Avatar>
      </Box>

      {/* General Information */}
      <Typography variant="h5" gutterBottom>
        🎓 General Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <InfoTable data={generalInfo} />

      {/* Personal Information */}
      <Typography variant="h5" gutterBottom>
        👤 Personal Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <InfoTable data={personalInfo} />

      {/* Other Information */}
      <Typography variant="h5" gutterBottom>
        📁 Other Information
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <InfoTable data={otherInfo} />
    </Container>
  );
};

export default StudentDetails;
