import { createApiConfig } from './generated-api';

// Teacher interface based on the backend TeacherListDTO
export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
  isActive: boolean;
}

// Create API config
const apiConfig = createApiConfig();

export async function getTeachers(orgId: number): Promise<Teacher[]> {
    try {
        const response = await fetch(`${apiConfig.basePath}/api/orgs/${orgId}/teachers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
}

export async function createTeacher(orgId: number, teacherData: any): Promise<any> {
    try {
        const response = await fetch(`${apiConfig.basePath}/api/orgs/${orgId}/teacher`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(teacherData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
} 