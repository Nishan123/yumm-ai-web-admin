import { authApi } from "../api/auth";

export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResult {
    success: boolean;
    message: string;
    data?: any;
    isAdmin?: boolean;
}

export const handleLogin = async (data: LoginData): Promise<LoginResult> => {
    try {
        const result = await authApi.login(data.email, data.password);

        if (result.success && result.data) {
            // Check if user has admin role
            if (result.data.user.role !== "admin") {
                return {
                    success: false,
                    message: "Access denied. Admin privileges required.",
                    isAdmin: false
                };
            }

            return {
                success: true,
                message: "Login successful",
                data: result.data,
                isAdmin: true
            };
        }

        return {
            success: false,
            message: result.message || "Login failed"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Login failed"
        };
    }
};

export const handleUpdateProfile = async (uid: string, formData: FormData): Promise<{ success: boolean; message: string; data?: any }> => {
    try {
        const result = await authApi.updateAuthUserProfile(uid, formData);

        if (result.success) {
            return {
                success: true,
                message: "Profile updated successfully",
                data: result.data
            };
        }

        return {
            success: false,
            message: result.message || "Failed to update profile"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to update profile"
        };
    }
};
