"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PatientInformationSchema } from "@/schemas";
import { getPatientByName } from "@/data/user";

export const savePatientInfo = async (values: z.infer<typeof PatientInformationSchema>) => {
    const validatedFields = PatientInformationSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        name,
        city,
        age,
        sex,
        birthday,
        civilStatus,
        occupation,
        handedness,
        religion,
        phone,
        email,
    } = validatedFields.data;

    // Parse the birthday string into a Date object
    const parsedBirthday = new Date(birthday);

    if (isNaN(parsedBirthday.getTime())) {
        return { error: "Invalid date format." };
    }

    const existingPatient = await getPatientByName(name);

    if (existingPatient) {
        return { error: "Patient already exists." };
    }

    await db.patientInformation.create({
        data: {
            name,
            city,
            age,
            sex,
            birthday: parsedBirthday,
            civilStatus,
            occupation,
            handedness,
            religion,
            phone,
            email,
            lastUpdate: new Date(),
        },
    });

    return { success: "Patient information saved." };
};