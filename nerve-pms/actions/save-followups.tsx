"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { FollowUpsSchema } from "@/schemas";

export const saveFollowUps = async (values: z.infer<typeof FollowUpsSchema>) => {
    const validatedFields = FollowUpsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        patientId,
        date,
        labResults,
        chiefComplaint,
        so,
        diagnosis,
        treatment,
        plan,
    } = validatedFields.data;

    await db.followUps.create({
        data: {
            patientId,
            date,
            labResults,
            chiefComplaint,
            so,
            diagnosis,
            treatment,
            plan,
        },
    });

    return { success: "Follow-up entry saved." };
};