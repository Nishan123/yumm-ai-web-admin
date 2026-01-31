import jwt from 'jsonwebtoken';

export interface DecodedToken {
    id: string;
    email: string;
    fullName: string;
    role?: string;
}

/**
 * Decodes a JWT token without verifying the signature
 * This is safe for client-side role checking since the token comes from the server
 * and the server will verify the signature on API calls
 */
export function decodeToken(token: string): DecodedToken | null {
    try {
        const decoded = jwt.decode(token) as DecodedToken;
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

/**
 * Gets the user role from the auth token cookie
 */
export function getUserRoleFromToken(token: string): string | null {
    const decoded = decodeToken(token);
    return decoded?.role || null;
}
