import { getAuthToken } from "../common/storage";

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// API client with auth headers
export const apiClient = async (
    endpoint: string,
    options: RequestInit = {}
): Promise<Response> => {
    const token = getAuthToken();
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    // Only add Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    return response;
};
