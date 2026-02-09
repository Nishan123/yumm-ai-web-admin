// List of api routes
// Single source of truth for api endpoints

export const API = {
    AUTH: {
        LOGIN: '/auth/login',
    },
    USERS: {
        GET_ALL: (query: string) => `/admin/users?${query}`,
        GET_ONE: (uid: string) => `/admin/users/${uid}`,
        CREATE: '/admin/users',
        UPDATE: (uid: string) => `/admin/users/${uid}`,
        DELETE: (uid: string) => `/admin/users/${uid}`,
    }
}
