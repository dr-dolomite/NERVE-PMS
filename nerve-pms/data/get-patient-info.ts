import { db } from "@/lib/db";

export const getPatientById = async (id: string) => {
    try {
        const patientInformation = await db.patientInformation.findUnique({
            where: {
                id,
            },
        });

        return patientInformation;
    } catch (error) {
        return null;
    }
}