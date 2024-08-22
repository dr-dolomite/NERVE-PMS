"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";

import { RegisterSchema } from "@/schemas";
// import { get } from "http";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const { email, password, firstName, lastName } = validatedFields.data;
    // const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Confirms email is not already in use
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use." };
    }

    // Combine first and last name into a single name field
    const name = `${firstName} ${lastName}`;

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            // firstName,
            // lastName,
            name,
        },
    });

    return { success: "User Created Successfully!" };

};