import {
    AuthenticationApi
} from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Students API instance
const authenticationApi = new AuthenticationApi(createApiConfig());

export async function login(orgId: number, username: string, password: string) {
    try {
        return await authenticationApi.apiLoginPost({
            comEducationRoutesPublicLoginRequest: {
                organizationId: orgId,
                username: username,
                password: password
            }
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}