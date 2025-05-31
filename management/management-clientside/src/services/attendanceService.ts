import { StudentAttendanceApi, ComEducationModelsCreateStudentAttendanceRequest, ComEducationModelsBulkAttendanceRequest, ComEducationModelsUpdateStudentAttendanceRequest } from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Student Attendance API instance
const attendanceApi = new StudentAttendanceApi(createApiConfig());

export async function getAttendanceByFilters(orgId: number, classId: number, subjectId: number, startDate: string, endDate: string) {
    try {
        return await attendanceApi.apiOrgsOrgIdAttendanceGet({
            orgId: orgId,
            classId: 1,
            subjectId: 1,
            startDate: '1930-01-01',
            endDate: '2030-01-01'
        });
    } catch (error) {
        throw error;
    }
}

export async function getAttendanceById(orgId: number, attendanceId: number) {
    try {
        return await attendanceApi.apiOrgsOrgIdAttendanceAttendanceIdGet({
            orgId: orgId,
            attendanceId: attendanceId
        });
    } catch (error) {
        console.error('Error fetching attendance by ID:', error);
        throw error;
    }
}

export async function createAttendance(orgId: number, attendanceData: ComEducationModelsCreateStudentAttendanceRequest) {
    try {
        return await attendanceApi.apiOrgsOrgIdAttendancePost({
            orgId: orgId,
            comEducationModelsCreateStudentAttendanceRequest: attendanceData
        });
    } catch (error) {
        console.error('Error creating attendance:', error);
        throw error;
    }
}

export async function createBulkAttendance(orgId: number, bulkAttendanceData: ComEducationModelsBulkAttendanceRequest) {
    try {
        return await attendanceApi.apiOrgsOrgIdAttendanceBulkPost({
            orgId: orgId,
            comEducationModelsBulkAttendanceRequest: bulkAttendanceData
        });
    } catch (error) {
        console.error('Error creating bulk attendance:', error);
        throw error;
    }
}

export async function updateAttendance(orgId: number, attendanceId: number, attendanceData: ComEducationModelsUpdateStudentAttendanceRequest) {
    try {
        return await attendanceApi.apiOrgsOrgIdAttendanceAttendanceIdPut({
            orgId: orgId,
            attendanceId: attendanceId,
            comEducationModelsUpdateStudentAttendanceRequest: attendanceData
        });
    } catch (error) {
        console.error('Error updating attendance:', error);
        throw error;
    }
}

export async function deleteAttendance(orgId: number, attendanceId: number) {
    try {
        return await attendanceApi.apiOrgsOrgIdAttendanceAttendanceIdDelete({
            orgId: orgId,
            attendanceId: attendanceId
        });
    } catch (error) {
        console.error('Error deleting attendance:', error);
        throw error;
    }
}

// Export types for easier usage
export type { 
    ComEducationModelsCreateStudentAttendanceRequest as CreateStudentAttendanceRequest,
    ComEducationModelsBulkAttendanceRequest as BulkAttendanceRequest,
    ComEducationModelsUpdateStudentAttendanceRequest as UpdateStudentAttendanceRequest
}; 