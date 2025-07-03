import { 
    ShiftApi, 
    ComEducationModelsCreateShiftRequest, 
    ComEducationModelsUpdateShiftRequest,
    ComEducationModelsShiftDTO,
    ComEducationModelsShiftDAO
} from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Shift API instance
const shiftApi = new ShiftApi(createApiConfig());

export async function getShifts(orgId: number) {
    try {
        return await shiftApi.getShifts({ orgId });
    } catch (error) {
        console.error('Error fetching shifts:', error);
        throw error;
    }
}

export async function getShiftById(orgId: number, shiftId: number) {
    try {
        return await shiftApi.getShiftById({ orgId, shiftId });
    } catch (error) {
        console.error('Error fetching shift by ID:', error);
        throw error;
    }
}

export async function createShift(orgId: number, shiftData: Omit<ComEducationModelsCreateShiftRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsCreateShiftRequest: {
                ...shiftData,
                organizationId: orgId
            },
            orgId: orgId
        };
        return await shiftApi.createShift(request);
    } catch (error) {
        console.error('Error creating shift:', error);
        throw error;
    }
}

export async function updateShift(orgId: number, shiftId: number, shiftData: Omit<ComEducationModelsUpdateShiftRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsUpdateShiftRequest: {
                ...shiftData,
                organizationId: orgId
            },
            orgId: orgId,
            shiftId: shiftId
        };
        return await shiftApi.updateShift(request);
    } catch (error) {
        console.error('Error updating shift:', error);
        throw error;
    }
}

export async function deleteShift(orgId: number, shiftId: number) {
    try {
        return await shiftApi.deleteShift({ orgId, shiftId });
    } catch (error) {
        console.error('Error deleting shift:', error);
        throw error;
    }
}

// Export types for easier usage
export type { 
    ComEducationModelsCreateShiftRequest as CreateShiftRequest,
    ComEducationModelsUpdateShiftRequest as UpdateShiftRequest,
    ComEducationModelsShiftDTO as ShiftDTO,
    ComEducationModelsShiftDAO as ShiftDAO
}; 