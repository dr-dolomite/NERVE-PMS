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
        oxygen
    } = validatedFields.data;

    await db.patientVitalSigns.create({
        data: {
            date: new Date(),
            pulseRate,
            bodyTemperature,
            bloodPressure,
            weight,
            oxygen,
            lastUpdate: new Date(),
        },
    });

    return { success: "Patient vitals saved." };
}