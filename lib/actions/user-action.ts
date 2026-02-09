import { userApi } from "../api/user/user";

export interface ActionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

// Get all users with pagination
export const fetchAllUsers = async (
    page: number = 1,
    size: number = 10,
    searchTerm?: string
): Promise<ActionResult> => {
    try {
        const result = await userApi.getAllUsers(page, size, searchTerm);
        if (result.success && result.data) {
            return {
                success: true,
                message: "Users fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch users"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch users"
        };
    }
};

// Get user by ID
export const fetchUserById = async (id: string): Promise<ActionResult> => {
    try {
        const result = await userApi.getUserById(id);
        if (result.success && result.data) {
            return {
                success: true,
                message: "User fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch user"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch user"
        };
    }
};

// Create new user
export const handleCreateUser = async (formData: FormData): Promise<ActionResult> => {
    try {
        const result = await userApi.createUser(formData);
        if (result.success) {
            return {
                success: true,
                message: "User created successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to create user"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to create user"
        };
    }
};

// Update user
export const handleUpdateUser = async (id: string, formData: FormData): Promise<ActionResult> => {
    try {
        const result = await userApi.updateUser(id, formData);
        if (result.success) {
            return {
                success: true,
                message: "User updated successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to update user"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to update user"
        };
    }
};

// Delete user
export const handleDeleteUser = async (id: string): Promise<ActionResult> => {
    try {
        const result = await userApi.deleteUser(id);
        if (result.success) {
            return {
                success: true,
                message: "User deleted successfully"
            };
        }
        return {
            success: false,
            message: result.message || "Failed to delete user"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to delete user"
        };
    }
};
