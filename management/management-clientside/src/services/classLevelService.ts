import { 
    ClassLevelApi, 
    ComEducationModelsCreateClassLevelRequest, 
    ComEducationModelsUpdateClassLevelRequest,
    ComEducationModelsClassLevelDTO,
    ComEducationModelsClassLevelDAO
} from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Class Level API instance
const classLevelApi = new ClassLevelApi(createApiConfig());

export async function getClassLevels(orgId: number) {
    try {
        return await classLevelApi.getClassLevels({ orgId });
    } catch (error) {
        console.error('Error fetching class levels:', error);
        throw error;
    }
}

export async function getClassLevelById(orgId: number, classLevelId: number) {
    try {
        return await classLevelApi.getClassLevelById({ orgId, classLevelId });
    } catch (error) {
        console.error('Error fetching class level by ID:', error);
        throw error;
    }
}

export async function createClassLevel(orgId: number, classLevelData: Omit<ComEducationModelsCreateClassLevelRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsCreateClassLevelRequest: {
                ...classLevelData,
                organizationId: orgId
            },
            orgId: orgId
        };
        return await classLevelApi.createClassLevel(request);
    } catch (error) {
        console.error('Error creating class level:', error);
        throw error;
    }
}

export async function updateClassLevel(orgId: number, classLevelId: number, classLevelData: Omit<ComEducationModelsUpdateClassLevelRequest, 'organizationId'>) {
    try {
        const request = {
            comEducationModelsUpdateClassLevelRequest: {
                ...classLevelData,
                organizationId: orgId
            },
            orgId: orgId,
            classLevelId: classLevelId
        };
        return await classLevelApi.updateClassLevel(request);
    } catch (error) {
        console.error('Error updating class level:', error);
        throw error;
    }
}

export async function deleteClassLevel(orgId: number, classLevelId: number) {
    try {
        return await classLevelApi.deleteClassLevel({ orgId, classLevelId });
    } catch (error) {
        console.error('Error deleting class level:', error);
        throw error;
    }
}

// Export types for easier usage
export type { 
    ComEducationModelsCreateClassLevelRequest as CreateClassLevelRequest,
    ComEducationModelsUpdateClassLevelRequest as UpdateClassLevelRequest,
    ComEducationModelsClassLevelDTO as ClassLevelDTO,
    ComEducationModelsClassLevelDAO as ClassLevelDAO
}; 