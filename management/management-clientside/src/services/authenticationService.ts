import { AuthenticationApi } from '../generated/api';
import { createApiConfig } from './generated-api';

// Create Students API instance
const api = new AuthenticationApi(createApiConfig());

export class AuthError extends Error {
    constructor(public code: number, message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

export async function login(orgId: number, username: string, password: string) {
    try {
        const response = await api.apiLoginPost({
            comEducationRoutesPublicLoginRequest: {
                organizationId: orgId,
                username: username,
                password: password
            }
        });
        return response;
    } catch (error: any) {
        if (error.response?.status === 401) {
            throw new AuthError(401, "Username or password is incorrect");
        } else if (error.response?.status === 403) {
            throw new AuthError(403, "Access forbidden");
        } else {
            throw new AuthError(500, "Failed to connect to the server");
        }
    }
}