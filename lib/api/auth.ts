
import api from "./axios";
import { API } from "./endpoints";
import { setAuthToken, setUserData } from "./common/storage";

export const authApi = {
    login: async (email: string, password: string) => {
        try {
            const response = await api.post(API.AUTH.LOGIN, { email, password });
            return response.data;
        } catch (error: any) {
            if (error.response?.data) {
                return error.response.data;
            }
            throw error;
        }
    },

    // Auth user profile update
    updateAuthUserProfile: async (id: string, userData: FormData) => {
        const response = await api.put(`/auth/${id}`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    setupAuth: (token: string, user: any) => {
        setAuthToken(token);
        setUserData(user);
        if (typeof document !== "undefined") {
            document.cookie = `authToken=${token}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days
        }
    }
};
