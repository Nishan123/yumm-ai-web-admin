import { apiClient } from "../common/api-client";

// User CRUD functions
export const createUser = async (userData: FormData) => {
    const response = await apiClient("/admin/users", {
        method: "POST",
        body: userData,
    });
    return response.json();
};

export const getAllUsers = async () => {
    const response = await apiClient("/admin/users");
    return response.json();
};

export const getUserById = async (id: string) => {
    const response = await apiClient(`/admin/users/${id}`);
    return response.json();
};

export const updateUser = async (id: string, userData: FormData) => {
    const response = await apiClient(`/admin/users/${id}`, {
        method: "PUT",
        body: userData,
    });
    return response.json();
};

export const deleteUser = async (id: string) => {
    const response = await apiClient(`/admin/users/${id}`, {
        method: "DELETE",
    });
    return response.json();
};

// Auth user profile update
export const updateAuthUserProfile = async (id: string, userData: FormData) => {
    const response = await apiClient(`/auth/${id}`, {
        method: "PUT",
        body: userData,
    });
    return response.json();
};
