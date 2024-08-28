import * as z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(1, {
        message: 'Password is required',
    }),
    code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(8, {
        message: 'Minimum of 8 characters required',
    }),

    firstName: z.string().min(1, {
        message: 'First name is required',
    }),

    lastName: z.string().min(1, {
        message: 'Last name is required',
    }),

    // name: z.string().min(3, {
    //     message: 'Full name is required',
    // }),
});

export const ResetSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, {
        message: 'Minimum of 8 characters required',
    }),
});

export const PatientInformationSchema = z.object({
    name: z.string().min(3, {
        message: 'Full name is required',
    }),

    city: z.string().min(3, {
        message: 'City is required',
    }),

    age: z.string().min(1, {
        message: 'Age is required',
    }),

    sex: z.string().min(3, {
        message: 'Sex is required',
    }),

    birthday: z.string().min(3, {
        message: 'Birthday is required',
    }),

    civilStatus: z.string().min(3, {
        message: 'Civil Status is required',
    }),

    occupation: z.string().min(3, {
        message: 'Occupation is required',
    }),

    handedness: z.string().min(3, {
        message: 'Handedness is required',
    }),

    religion: z.string().min(3, {
        message: 'Religion is required',
    }),

    phone: z.string().min(3, {
        message: 'Contact is required',
    }),

    email: z.string().email({
        message: 'Invalid email address',
    }),
});

export const PatientVitalsSchema = z.object({
    pulseRate: z.number().min(0, "Pulse rate must be at least 0").max(300, "Pulse rate must be at most 300"),
    bodyTemperature: z.string().nonempty("Body temperature is required"),
    bloodPressure: z.string().nonempty("Blood pressure is required"),
    weight: z.string().nonempty("Weight is required"),
    oxygen: z.number().min(0, "Oxygen level must be at least 0").max(100, "Oxygen level must be at most 100"),
    patientId: z.string().nonempty("Patient ID is required"),
    followUpsId: z.string().optional(),
});

export const PatientHistorySchema = z.object({
    patientId: z.string().nonempty("Patient name is required"),
    vitalSignsid: z.string().nonempty("Vital signs ID is required"),
    referredBy: z.string().optional(),
    chiefComplaint: z.string().nonempty("Chief complaint is required"),
    historyOfPresentIllness: z.string().nonempty("History of present illness is required"),
    pastMedicalHistory: z.string().nonempty("Past medical history is required"),
    familyHistory: z.string().nonempty("Family history is required"),
    personalSocialHistory: z.string().nonempty("Social history is required"),
    obgyneHistory: z.string().optional(),
    physicalExamination: z.string().nonempty("Physical exam is required"),
    neurologicalExamination: z.string().optional(),
    diagnosis: z.string().nonempty("Diagnosis is required"),
    treatmentPlan: z.string().optional(),
    plan: z.string().nonempty("Plan is required"),
});

export const FollowUpsSchema = z.object({
    patientId: z.string().nonempty("Patient ID is required"),
    date: z.string().nonempty("Date is required"),
    labResults: z.string().optional(),
    chiefComplaint: z.string().nonempty("Chief complaint is required"),
    so: z.string().nonempty("Subjective observation is required"),
    diagnosis: z.string().nonempty("Diagnosis is required"),
    treatment: z.string().nonempty("Treatment is required"),
    plan: z.string().nonempty("Plan is required"),
});