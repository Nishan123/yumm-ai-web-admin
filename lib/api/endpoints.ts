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
    },
    BUG_REPORTS: {
        GET_ALL: (query: string) => `/admin/bug-reports?${query}`,
        GET_ONE: (id: string) => `/admin/bug-reports/${id}`,
        UPDATE_STATUS: (id: string) => `/admin/bug-reports/${id}/status`,
        DELETE: (id: string) => `/admin/bug-reports/${id}`,
    },
    NOTIFICATIONS: {
        SEND: '/notifications/send',
        LOGS: '/notifications/logs',
        DELETE: (id: string) => `/notifications/logs/${id}`,
    },
    DASHBOARD: {
        STATS: '/admin/dashboard/stats',
    },
    RECIPES: {
        GET_ALL: (query: string) => `/allRecipes?${query}`,
        UPDATE: (id: string) => `/recipe/${id}`,
        DELETE: (id: string) => `/recipe/${id}`,
    }
}
