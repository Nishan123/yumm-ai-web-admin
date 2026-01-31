import { setAuthToken, setUserData } from "../common/storage";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Login function
export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    return response.json();
};

// Helper to setup auth after successful login
export const setupAuth = (token: string, user: any) => {
    setAuthToken(token);
    setUserData(user);
    // Set cookie for middleware
    if (typeof document !== "undefined") {
        document.cookie = `authToken=${token}; path=/; max-age=${30 * 24 * 60 * 60}`; // 30 days
    }
};
