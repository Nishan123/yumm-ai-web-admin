// Auth token management
export const getAuthToken = (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
};

export const setAuthToken = (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("authToken", token);
};

export const removeAuthToken = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("authToken");
};

// User data management
export const getUserData = (): any | null => {
    if (typeof window === "undefined") return null;
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
};

export const setUserData = (userData: any): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("userData", JSON.stringify(userData));
};

export const removeUserData = (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("userData");
};

// Clear all auth data
export const clearAuthData = (): void => {
    removeAuthToken();
    removeUserData();
    // Clear auth cookie
    if (typeof document !== "undefined") {
        document.cookie = "authToken=; path=/; max-age=0";
    }
};
