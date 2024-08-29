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
            lastVisit: true,
            id: true,
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
            id: id
        }
    });

    return patientId;
}

export const getPatientHistoryById = async (id: string) => {
    const patientHistory = await db.patientHistory.findUnique({
        where: {
            patientId: id
        }
    });

    return patientHistory;
}

// Get patient vitals of history
export const getPatientVitalsById = async (id: string) => {
    const patientVitals = await db.patientVitalSigns.findUnique({
        where: {
            id
        }, 
        select: {
            weight: true,
            bodyTemperature: true,
            bloodPressure: true,
            pulseRate: true,
            oxygen: true,
        }
    });
    

    return patientVitals;
}
