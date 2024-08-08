import { Button } from "@/components/ui/button";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import {
    PlusIcon,
} from "@radix-ui/react-icons";

import Link from "next/link";

const PatientPage = () => {
    return (
        <>
            <div>
                <div className="flex flex-row gap-x-8">
                    <Link href="/doctor/dashboard/patient/diagnosis">
                        <Button type="submit" className="my-button-blue" size="lg">
                            + Diagnosis
                        </Button>
                    </Link>

                    <Link href='/doctor/dashboard/patient/medical-cert'>
                        <Button className="my-button-blue" size="lg">
                            + Add Medical Certificate
                        </Button>
                    </Link>

                </div>
            </div>

            <div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Diagnosis</AccordionTrigger>
                        <AccordionContent>
                            Display present and past diagnosis of the patient.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Patient Medical History</AccordionTrigger>
                        <AccordionContent>
                            Display the patient&apos;s medical history.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Medical Lab Results</AccordionTrigger>
                        <AccordionContent>
                            Display the patient&apos;s medical lab results.
                        </AccordionContent>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Prescription History</AccordionTrigger>
                            <AccordionContent>
                                Display the patient&apos;s prescription history.
                            </AccordionContent>
                        </AccordionItem>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    )
}

export default PatientPage