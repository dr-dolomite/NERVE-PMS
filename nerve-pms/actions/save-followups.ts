"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PatientFollowUpsSchema } from "@/schemas";

export const savePatientFollowup = async (values: z.infer<typeof PatientFollowUpsSchema>) => {
    const validatedFields = PatientFollowUpsSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        patientId,
        vitalSignsId,
        labResults,
        chiefComplaint,
        so,
        diagnosis,
        treatment,
        plan,
    } = validatedFields.data;

    // Check if the patient exists
    const patient = await db.patientInformation.findUnique({
        where: {
            id: patientId,
        },
    });

    if (!patient) {
        return { error: "Patient not found" };
    }

    // Check if the vital signs exist
    const vitalSigns = await db.patientVitalSigns.findUnique({
        where: {
            id: vitalSignsId,
        },
    });

    if (!vitalSigns) {
        return { error: "Vital signs not found" };
    }

    // Save the follow-up record
    await db.followUps.create({
        data: {
            date: new Date(),
            labResults,
            chiefComplaint,
            so,
            diagnosis,
            treatment,
            plan,
            patient: {
                connect: {
                    id: patientId,
                },
            },
            vitalSigns: {
                connect: {
                    id: vitalSignsId,
                },
            }
        }
    });

    return { success: "Patient follow-up record saved." };
};