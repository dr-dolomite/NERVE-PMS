"use server";

import { getPatientByName } from "@/data/user";
import { db } from "@/lib/db";

export const deletePatientRecord = async (name: string) => {
    const existingPatient = await getPatientByName(name);

    if (!existingPatient) {
        return { error: "Patient not found." };
    }

    try {
        await db.patientInformation.delete({
            where: { name }
        });

        return { success: "Patient record deleted." };
    } catch (error) {
        return { error: "Failed to delete patient record. Please try again." };
    }
}