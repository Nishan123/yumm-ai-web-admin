import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserRoleFromToken } from "./lib/jwt-utils";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies
    const token = request.cookies.get("authToken")?.value;

    // Check if the route is protected (admin routes only)
    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginPage = pathname.startsWith("/login");

    // If user is not authenticated and trying to access protected routes
    if (!token && isAdminRoute) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated and trying to access login page
    if (token && isLoginPage) {
        const role = getUserRoleFromToken(token);
        // Only admins should be logged in to this app
        if (role === "admin") {
            return NextResponse.redirect(new URL("/admin", request.url));
        } else {
            // Non-admin with token - clear their session and keep them on login
            const response = NextResponse.next();
            response.cookies.delete("authToken");
            return response;
        }
    }

    // For admin routes, verify the user has admin role
    if (isAdminRoute && token) {
        const role = getUserRoleFromToken(token);
        if (role !== "admin") {
            // Non-admin users trying to access admin routes - redirect to login and clear session
            const response = NextResponse.redirect(new URL("/login", request.url));
            response.cookies.delete("authToken");
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
