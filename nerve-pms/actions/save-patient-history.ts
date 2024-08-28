// Server Action: savePatientHistory.ts
"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PatientHistorySchema } from "@/schemas";

export const savePatientHistory = async (values: z.infer<typeof PatientHistorySchema>) => {
    const validatedFields = PatientHistorySchema.safeParse(values);

    console.log(validatedFields);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        patientId,
        vitalSignsid,
        referredBy,
        chiefComplaint,
        historyOfPresentIllness,
        pastMedicalHistory,
        familyHistory,
        personalSocialHistory,
        obgyneHistory,
        physicalExamination,
        neurologicalExamination,
        treatmentPlan,
        plan,
    } = validatedFields.data;

    try {
        // Check if a PatientHistory record already exists for this patient
        const existingPatientHistory = await db.patientHistory.findUnique({
            where: { patientId },
        });

        if (existingPatientHistory) {
            // Update the existing record
            const updatedPatientHistory = await db.patientHistory.update({
                where: { patientId },
                data: {
                    vitalSignsid,
                    referredBy,
                    chiefComplaint,
                    historyOfPresentIllness,
                    pastMedicalHistory,
                    familyHistory,
                    personalSocialHistory,
                    obgyneHistory,
                    physicalExamination,
                    neurologicalExamination,
                    treatmentPlan,
                    plan,
                    date: new Date(),
                },
            });

            return { success: "Patient history updated.", patientHistoryId: updatedPatientHistory.id };
        } else {
            // Create a new PatientHistory record
            const newPatientHistory = await db.patientHistory.create({
                data: {
                    patientId,
                    vitalSignsid,
                    referredBy,
                    chiefComplaint,
                    historyOfPresentIllness,
                    pastMedicalHistory,
                    familyHistory,
                    personalSocialHistory,
                    obgyneHistory,
                    physicalExamination,
                    neurologicalExamination,
                    treatmentPlan,
                    plan,
                    date: new Date(),
                },
            });

            return { success: "Patient history saved.", patientHistoryId: newPatientHistory.id };
        }
    } catch (error) {
        console.error("Error saving/updating patient history:", error);
        return { error: "Failed to save/update patient history. Please try again." };
    }
};