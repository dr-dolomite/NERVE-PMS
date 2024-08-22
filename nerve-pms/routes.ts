// These routes are public and do not require authentication
export const publicRoutes = [
    "/",
];

// These routes are used for authentication
export const authRoutes = [
    "/",
    "/register",
    "/error",
];

// These prefix for API authentication routes
export const apiAuthPrefix = "/api/auth";

// The default redirect path after login
export const DEFAULT_LOGIN_REDIRECT = "/settings";

