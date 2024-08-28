import { db } from "@/lib/db";

// fetch all patient information from the database but only the name, patient id, last update, and last visit
export const getPatients = async () => {
    return await db.patientInformation.findMany({
        select: {
            name: true,
            city: true,
            phone: true,
            patientStatus: true,
            lastUpdate: true,
            lastVisit: true
        }
    });
};

export const getPatientByName = async (name: string) => {
    const patientName = await db.patientInformation.findUnique({
        where: {
            name
        }
    });

    return patientName;
}

export const getPatientById = async (id: string) => {
    const patientId = await db.patientInformation.findUnique({
        where: {
            id
        }
    });

    return patientId;
}
