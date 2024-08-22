import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(8, {
        message: 'Minimum of 8 characters required',
    }),

    firstName: z.string().min(1, {
        message: 'First name is required',
    }),

    lastName: z.string().min(1, {
        message: 'Last name is required',
    }),

    // name: z.string().min(3, {
    //     message: 'Full name is required',
    // }),
});