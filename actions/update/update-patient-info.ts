"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { PatientInformationSchema } from "@/schemas";
import { getPatientById } from "@/data/get-patient-info";

export const updatePatientInfo = async (values: z.infer<typeof PatientInformationSchema>) => {
    const validatedFields = PatientInformationSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields" };
    }

    const {
        name,
        city,
        completeAddress,
        age,
        sex,
        birthday,
        civilStatus,
        occupation,
        handedness,
        religion,
        phone,
        email,
        id,
    } = validatedFields.data;

    const parsedBirthday = new Date(birthday);

    if (isNaN(parsedBirthday.getTime())) {
        return { error: "Invalid date format." };
    }

    if (!id) {
        return { error: "Patient ID is required." };
    }

    const existingPatient = await getPatientById(id);

    if (!existingPatient) {
        return { error: "Patient not found." };
    }

    await db.patientInformation.update({
        where: {
            id: existingPatient.id,
        },
        data: {
            name,
            city,
            completeAddress,
            age,
            sex,
            birthday: parsedBirthday,
            civilStatus,
            occupation,
            handedness,
            religion,
            phone,
            email,
        }
    });

    return { success: 'Patient information updated successfully.' };
};