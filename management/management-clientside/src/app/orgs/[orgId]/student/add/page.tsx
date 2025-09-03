'use client';
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import {
  FormControl,
  Container,
  Divider,
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@mui/material';
import Grid from '@mui/material/Grid'; //
import { Key } from '@mui/icons-material';
import { SelectChangeEvent } from '@mui/material/Select';
import { promises } from 'dns';
import { resolve } from 'path';
import { rejects } from 'assert';
import { useParams } from "next/navigation";

export default function CreateStudentPage() {

  const params = useParams()
  const orgId = params.orgId

  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [status, setStatus] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData,setFormData] = useState({
       organizationId: orgId,
       classId: 1,
       firstName: "",
       lastName: "",
       phone: "",
       dob: "",
       address: "",
       fatherName: "",
       motherName: "",
       parentContact: "",
       emergencyContact: "",
       admissionDate:"",
       photoUrl: ""
     });
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    // 1. Helper function: Convert file -> base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = () => {
      reject(new Error("File could not be read"));
    };

    reader.readAsDataURL(file);
  });
};


    // 2. Handle text input change (firstName, lastName, etc.)
    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    // 3. Handle email change with validation
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setEmail(value);
      if (!emailRegex.test(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    };

    // 4. Handle gender dropdown change
    const handleGenderChange = (event: SelectChangeEvent<string>) => {
      setGender(event.target.value);
    };

    // 5. Handle status dropdown change
    const handleStatusChange = (event: SelectChangeEvent<string>) => {
      setStatus(event.target.value);
    };

    // 6. Handle file upload & convert to base64
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setSelectedFile(file);

      try {
        const base64 = await fileToBase64(file);
        setFormData((prev) => ({
            ...prev,
            photoUrl : base64
            } ))
        console.log("Base64:", base64);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    // 7. Handle form submit (collect all form data and send to backend)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        // Prepare JSON payload
        const payload = {
          organizationId: orgId,
          classId: 1,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: email,
          phoneNumber: formData.phone,     // must be phoneNumber
          password: "1234",
          gender: gender,
          dateOfBirth: formData.dob,       // must be dateOfBirth
          fatherName: formData.fatherName,
          motherName: formData.motherName,
          parentContact: formData.parentContact,
          address: formData.address,
          photoUrl: formData.photoUrl,
          emergencyContact: formData.emergencyContact,
          status: status
        };

        // Send request
        const response = await fetch(`/api/orgs/${orgId}/student/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });


        // Handle response
        if (response.ok) {
          const result = await response.json();
          alert(`✅ Student created with ID: ${result.studentId}`);

          // Reset form
          setFormData({
            firstName: "",
            lastName: "",
            phone: "",
            dob: "",
            address: "",
            fatherName: "",
            motherName: "",
            parentContact: "",
            emergencyContact: "",
            admissionDate: "",
            photoUrl: ""
          });
          setEmail("");
          setGender("");
          setStatus("");
          setSelectedFile(null);
        } else {
          const error = await response.json();
          alert(`❌ Failed to create student: ${error.error}`);
        }
      } catch (err) {
        console.error("Submit error:", err);
        alert("❌ Network or file processing error");
      }
    };



  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography align="center" variant="h3" gutterBottom>
        Student Admission Form
      </Typography>

      <form onSubmit={handleSubmit}>
        <Divider sx={{ my: 2 }}>Student Information</Divider>

        <Box>
          {/* Row 1: 3 columns */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                margin="normal"
                value = {formData.firstName}
                onChange = {handleChange}
                />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField label="Middle Name" name="middlename" fullWidth margin="normal" />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField label="Last Name" name="lastName" fullWidth margin="normal" onChange = {handleChange}/>
            </Grid>
          </Grid>

          {/* Row 2: 2 columns */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                fullWidth
                margin="normal"
                required
                error={Boolean(emailError)}
                helperText={emailError}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Phone Number" name="phone" fullWidth margin="normal" onChange = {handleChange}/>
            </Grid>
          </Grid>

          {/* Row 3: 2 columns */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
                onChange = {handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  labelId="gender-select-label"
                  id="gender-select"
                  label="Gender"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Row 4: Address full width */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                onChange = {handleChange}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }}>Guardian Information</Divider>

        <Box>
          {/* Row 5: Father / Mother */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Father’s Name" name="fatherName" fullWidth margin="normal" onChange = {handleChange}/>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Mother’s Name" name="motherName" fullWidth margin="normal"  onChange = {handleChange}/>
            </Grid>
          </Grid>

          {/* Row 6: Contacts */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Parent Contact" name="parentContact" fullWidth margin="normal" onChange = {handleChange}/>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField label="Emergency Contact" name="emergencyContact" fullWidth margin="normal" onChange = {handleChange}/>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }}>Others Information</Divider>
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                name="admissionDate"
                label="Admission Date"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                onChange = {handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="studentStatus">Status</InputLabel>
                <Select
                  label="Status"
                  id="student-Status"
                  labelId="studentStatus"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="graduate">Graduate</MenuItem>
                  <MenuItem value="deactive">Deactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* File upload */}
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <input
                type="file"
                accept="image/*"
                id="upload-input"
                style={{ display: 'none' }}
                onChange = { handleFileChange }

              />
              <label htmlFor="upload-input">
                <Button variant="outlined" component="span">
                  <span>Choose File</span>
                </Button>
              </label>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>

                {selectedFile && (
                    <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                         Selected: {selectedFile.name}
                    </div>
                )}
            </Grid>
          </Grid>
        </Box>

        {/* Submit button */}
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}
