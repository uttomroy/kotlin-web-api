import { ProfileApi } from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Profile API instance
const profileApi = new ProfileApi(createApiConfig());

export async function getUserProfile(orgId: number) {
    try {
        return await profileApi.getUserProfile({ orgId });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}