"use client"

import { useState } from "react";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { CirclePlus } from 'lucide-react'
import { useCurrentUser } from "@/hooks/use-current-user"
import PatientInformationForm from "@/components/patient-info-form"
import PatientVitalsForm from "@/components/patient-vitals-form";

const ClerkDashboardPage = () => {

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const year = currentDate.getFullYear();
    const dayOfMonth = currentDate.getDate();

    const [date, setDate] = useState<Date>()
    const [formStep, setFormStep] = useState<'patientInfo' | 'patientVitals'>('patientInfo')
    const user = useCurrentUser();

    const handlePatientInfoSuccess = () => {
        setFormStep('patientVitals');  // Move to the next form
    };

    return (
        <div className='grid gap-6'>
            <div className="flex justify-between">
                <div className="flex flex-col items-start">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md antialiased">
                        Hi {user?.name},
                    </h2>
                    <h1 className="text-primary font-semibold 2xl:text-2xl text-xl antialiased">
                        Welcome Back!
                    </h1>
                </div>

                <div className="flex flex-col items-end">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md  antialiased">
                        Today is
                    </h2>
                    <h1 className="text-primary font-medium 2xl:text-lg text-md antialiased">
                        {day} {month} {dayOfMonth}, {year}
                    </h1>
                </div>
            </div>

            <div className='flex flex-col justify-center items-center'>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='my-button-blue' size='lg' variant='default'  >
                            <CirclePlus className='h-6 w-6' />
                            <span className='ml-2'>Add New Patient</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="2xl:max-w-[60%] max-w-[80%]">
                        <DialogHeader>
                            <DialogTitle className='text-[#0E313E] antialised 2xl:text-2xl text-lg'>Add a New Patient Record</DialogTitle>
                            <DialogDescription>
                                Input the the necessary information to add a new patient record.
                            </DialogDescription>
                        </DialogHeader>
                        {formStep === 'patientInfo' ? (
                            <PatientInformationForm onSuccess={handlePatientInfoSuccess} />
                        ) : (
                            <PatientVitalsForm />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default ClerkDashboardPage