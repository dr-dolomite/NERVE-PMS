// These routes are public and do not require authentication
export const publicRoutes = [
    "/",
    "/new-verification",
];

// These routes are used for authentication
export const authRoutes = [
    "/login",
    "/register",
    "/error",
    "/reset",
    "/new-password",
];

// These prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";

// The default redirect path after login
export const DOCTOR_DEFAULT_LOGIN_REDIRECT = "/dashboard/home/patient";
export const CLERK_DEFAULT_LOGIN_REDIRECT = "/dashboard/home";

