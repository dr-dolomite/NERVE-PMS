"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PatientVitalsSchema } from "@/schemas";

export const savePatientVitals = async (values: z.infer<typeof PatientVitalsSchema>) => {
    const validatedFields = PatientVitalsSchema.safeParse(values);
    
    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }
    
    const {
        pulseRate,
        bodyTemperature,
        bloodPressure,
        weight,
        oxygen,
        patientId, // Required for reference
    } = validatedFields.data;

    const newVitalSigns = await db.patientVitalSigns.create({
        data: {
            date: new Date(),
            pulseRate,
            bodyTemperature,
            bloodPressure,
            weight,
            oxygen,
            lastUpdate: new Date(),
            patientId, // Link to the patient
        },
    });

    return { success: 'Patient vitals saved. Please proceed.', vitalSignsid: newVitalSigns.id};
};
