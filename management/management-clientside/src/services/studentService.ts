import { StudentApi, ComEducationModelsCreateStudentRequest, ComEducationModelsUpdateStudentRequest } from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Students API instance
const studentApi = new StudentApi(createApiConfig());

export async function getStudents(orgId: number) {
    try {
        return await studentApi.getStudents({orgId: orgId});
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

export async function createStudent(orgId: number, studentData: Omit<ComEducationModelsCreateStudentRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsCreateStudentRequest: {
                ...studentData,
                organizationId: orgId
            },
            orgId: orgId
        };
        return await studentApi.apiOrgsOrgIdStudentsCreatePost(request);
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

export async function updateStudent(orgId: number, studentData: Omit<ComEducationModelsUpdateStudentRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsUpdateStudentRequest: {
                ...studentData,
                organizationId: orgId
            },
            orgId: orgId
        };
        return await studentApi.apiOrgsOrgIdStudentsUpdatePost(request);
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

// Export types for easier usage
export type { 
    ComEducationModelsCreateStudentRequest as CreateStudentRequest,
    ComEducationModelsUpdateStudentRequest as UpdateStudentRequest
}; 