
import api from "../axios";
import { API } from "../endpoints";

export interface User {
    uid: string;
    fullName: string;
    email: string;
    profilePic?: string;
    authProvider: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse {
    success: boolean;
    data: User;
    message?: string;
}

export interface UsersResponse {
    success: boolean;
    data: {
        users: User[];
        pagination: {
            page: number;
            size: number;
            total: number;
            totalPages: number;
        };
    };
    message?: string;
}

export const userApi = {
    getAllUsers: async (page: number = 1, size: number = 10, searchTerm?: string): Promise<UsersResponse> => {
        const params = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            ...(searchTerm && { searchTerm })
        });
        const response = await api.get<UsersResponse>(API.USERS.GET_ALL(params.toString()));
        return response.data;
    },

    getUserById: async (id: string): Promise<UserResponse> => {
        const response = await api.get<UserResponse>(API.USERS.GET_ONE(id));
        return response.data;
    },

    createUser: async (userData: FormData): Promise<UserResponse> => {
        const response = await api.post<UserResponse>(API.USERS.CREATE, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    updateUser: async (id: string, userData: FormData): Promise<UserResponse> => {
        const response = await api.put<UserResponse>(API.USERS.UPDATE(id), userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    deleteUser: async (id: string): Promise<any> => {
        const response = await api.delete(API.USERS.DELETE(id));
        return response.data;
    },
};
