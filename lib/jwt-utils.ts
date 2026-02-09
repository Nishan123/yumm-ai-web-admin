import jwt from 'jsonwebtoken';

export interface DecodedToken {
    id: string;
    email: string;
    fullName: string;
    role?: string;
}


export function decodeToken(token: string): DecodedToken | null {
    try {
        const decoded = jwt.decode(token) as DecodedToken;
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

export function getUserRoleFromToken(token: string): string | null {
    const decoded = decodeToken(token);
    return decoded?.role || null;
}
