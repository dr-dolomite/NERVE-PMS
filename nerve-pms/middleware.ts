// export { auth as middleware } from "@/auth";

import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    DOCTOR_DEFAULT_LOGIN_REDIRECT,
    CLERK_DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from "@/routes";

import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }

    if (isAuthRoute) {
        if (isLoggedIn && UserRole.DOCTOR) {
            return Response.redirect(new URL(DOCTOR_DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        if (isLoggedIn && UserRole.CLERK) {
            return Response.redirect(new URL(CLERK_DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return;
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/login", nextUrl));
    }

    return;
})

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}