import { 
    DepartmentApi, 
    ComEducationModelsCreateDepartmentRequest, 
    ComEducationModelsUpdateDepartmentRequest,
    ComEducationModelsDepartmentDTO,
    ComEducationModelsDepartmentDAO
} from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Department API instance
const departmentApi = new DepartmentApi(createApiConfig());

export async function getDepartments(orgId: number) {
    try {
        return await departmentApi.getDepartments({ orgId });
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
}

export async function getDepartmentById(orgId: number, departmentId: number) {
    try {
        return await departmentApi.getDepartmentById({ orgId, departmentId });
    } catch (error) {
        console.error('Error fetching department by ID:', error);
        throw error;
    }
}

export async function createDepartment(orgId: number, departmentData: Omit<ComEducationModelsCreateDepartmentRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsCreateDepartmentRequest: {
                ...departmentData,
                organizationId: orgId
            },
            orgId: orgId
        };
        return await departmentApi.createDepartment(request);
    } catch (error) {
        console.error('Error creating department:', error);
        throw error;
    }
}

export async function updateDepartment(orgId: number, departmentId: number, departmentData: Omit<ComEducationModelsUpdateDepartmentRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsUpdateDepartmentRequest: {
                ...departmentData,
                organizationId: orgId
            },
            orgId: orgId,
            departmentId: departmentId
        };
        return await departmentApi.updateDepartment(request);
    } catch (error) {
        console.error('Error updating department:', error);
        throw error;
    }
}

export async function deleteDepartment(orgId: number, departmentId: number) {
    try {
        return await departmentApi.deleteDepartment({ orgId, departmentId });
    } catch (error) {
        console.error('Error deleting department:', error);
        throw error;
    }
}

// Export types for easier usage
export type { 
    ComEducationModelsCreateDepartmentRequest as CreateDepartmentRequest,
    ComEducationModelsUpdateDepartmentRequest as UpdateDepartmentRequest,
    ComEducationModelsDepartmentDTO as DepartmentDTO,
    ComEducationModelsDepartmentDAO as DepartmentDAO
}; 