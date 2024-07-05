"use server"

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

import { error } from "console";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Email"
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    
    if(!existingUser){
        return{ error: "Email not found"};
    }

    //TODO: Generate token and send email

    const passwordResetToken = await generatePasswordResetToken(email);
    console.log(passwordResetToken)
    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    );

    return {  success: "Reset Email sent" };

}