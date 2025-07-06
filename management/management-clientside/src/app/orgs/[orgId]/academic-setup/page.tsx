'use client';
import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, Breadcrumbs, Link } from '@mui/material';
import {
  School as SchoolIcon,
  Schedule as ScheduleIcon,
  Class as ClassIcon,
  Subject as SubjectIcon,
  Book as BookIcon,
  Business as BusinessIcon
} from '@mui/icons-material';
import { useParams } from 'next/navigation';
import ClassLevelsTab from './components/ClassLevelsTab';
import ShiftsTab from './components/ShiftsTab';
import ClassesTab from './components/ClassesTab';
import SubjectsTab from './components/SubjectsTab';
import SubjectMappingTab from './components/SubjectMappingTab';
import DepartmentsTab from './components/DepartmentsTab';

function TabPanel({ children, value, index }: { children: React.ReactNode; value: number; index: number }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`academic-tabpanel-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AcademicSetup() {
  const params = useParams();
  const orgId = parseInt(params.orgId as string);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs>
          <Link underline="hover" color="inherit" href={`/orgs/${orgId}`}>
            Organization
          </Link>
          <Typography color="text.primary">Academic Setup</Typography>
        </Breadcrumbs>
        <Typography variant="h4" sx={{ mt: 2 }}>
          Academic Setup
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab icon={<SchoolIcon />} label="Class Levels" />
          <Tab icon={<ScheduleIcon />} label="Shifts" />
          <Tab icon={<BusinessIcon />} label="Departments" />
          <Tab icon={<ClassIcon />} label="Classes" />
          <Tab icon={<BookIcon />} label="Subjects" />
          <Tab icon={<SubjectIcon />} label="Subject Mapping" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <ClassLevelsTab orgId={orgId} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <ShiftsTab orgId={orgId} />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <DepartmentsTab orgId={orgId} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <ClassesTab orgId={orgId} />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <SubjectsTab orgId={orgId} />
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <SubjectMappingTab orgId={orgId} />
      </TabPanel>
    </Box>
  );
} 