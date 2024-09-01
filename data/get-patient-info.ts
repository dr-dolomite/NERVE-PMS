"use server";

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
            imageURL: true,
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

export const getAllPatientFollowUpById = async (id: string) => {
    const patientFollowUp = await db.followUps.findMany({
        where: {
            patientId: id
        },
    });

    return patientFollowUp;
}

export const getPatientFollowUpById = async (id: string) => {
    const patientFollowUp = await db.followUps.findUnique({
        where: {
            id
        }
    });

    return patientFollowUp;
}

export const getFollowUpPlanById = async (recordId: string) => {

    // Check if the recordId corresponds to any FollowUpPlan followUpId
    const followUp = await db.followUpPlan.findUnique({
        where: {
            followUpId: recordId
        }
    });

    // Check if the recordId corresponds to any FollowUpPlan patientHistoryId
    const followUpHistory = await db.followUpPlan.findUnique({
        where: {
            historyId: recordId
        }
    });

    if (followUp) {
        return followUp;
    }

    if (followUpHistory) {
        return followUpHistory;
    }
}

export const getPatientInformationOnlyById = async (id: string) => {
    const patientInformation = await db.patientInformation.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            city: true,
            completeAddress: true,
            phone: true,
            email: true,
            birthday: true,
            age: true,
            sex : true,
            civilStatus: true,
            occupation: true,
            religion: true,
            handedness: true,
            lastVisit: true,
            imageURL: true,
            id: true,
        }
    });

    return patientInformation;
}

export async function searchPatientByName(name: string) {
    try {
        const patients = await db.patientInformation.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive',
                },
            },
            take: 10, // Limit the number of results
        });
        return patients;
    } catch (error) {
        console.error("Error searching for patients:", error);
        return [];
    }
}
