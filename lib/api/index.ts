// Common utilities
export {
    getAuthToken,
    setAuthToken,
    removeAuthToken,
    getUserData,
    setUserData,
    removeUserData,
    clearAuthData,
} from "./common/storage";

export { apiClient } from "./common/api-client";

// Auth
export { login, setupAuth } from "./auth/auth-api";

// User
export {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    updateAuthUserProfile,
} from "./user/user-api";
