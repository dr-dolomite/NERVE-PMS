"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PatientHistorySchema } from "@/schemas";

export const savePatientHistory = async (values: z.infer<typeof PatientHistorySchema>) => {
    const validatedFields = PatientHistorySchema.safeParse(values);

    console.log({ validatedFields });

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        patientId,
        vitalSignsId, // Changed from vitalSignsid to vitalSignsId
        referredBy,
        chiefComplaint,
        historyOfPresentIllness,
        pastMedicalHistory,
        familyHistory,
        personalSocialHistory,
        obgyneHistory,
        physicalExamination,
        neurologicalExamination,
        diagnosis,
        treatmentPlan,
        plan,
    } = validatedFields.data;

    // Check if the patient exists
    const patient = await db.patientInformation.findUnique({
        where: {
            id: patientId,
        },
    });

    if (!patient) {
        return { error: "Patient not found." };
    }

    // Check if the vital signs exist
    const vitalSigns = await db.patientVitalSigns.findUnique({
        where: {
            id: vitalSignsId,
        },
    });

    if (!vitalSigns) {
        return { error: "Vital signs not found." };
    }

    // Check if the patient history already exists
    const existingPatientHistory = await db.patientHistory.findFirst({
        where: {
            patientId,
            vitalSignsid: vitalSignsId,
        },
    });

    if (existingPatientHistory) {
        return { error: "Patient history already exists." };
    }

    const newPatientHistory = await db.patientHistory.create({
        data: {
            patient: {
                connect: {
                    id: patientId,
                },
            },
            vitalSigns: {
                connect: {
                    id: vitalSignsId,
                },
            },
            referredBy,
            chiefComplaint,
            historyOfPresentIllness,
            pastMedicalHistory,
            familyHistory,
            personalSocialHistory,
            obgyneHistory,
            physicalExamination,
            neurologicalExamination,
            diagnosis,
            treatmentPlan,
            plan,
            date: new Date(),
        },
    });

    return { success: "Patient history saved.", patientHistoryId: newPatientHistory.id, plan };
};