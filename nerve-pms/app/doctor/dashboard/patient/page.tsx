import { Button } from "@/components/ui/button";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import Link from "next/link";

const PatientPage = () => {
    return (
        <>
            <div>
                <div className="flex flex-row gap-x-8">
                    <Button className="bg-gradient-to-r from-[#2F80ED] to-[#37C9D9] 2xl:text-lg 2xl:px-8 2xl:py-6">
                        <Link href="/doctor/dashboard/patient/diagnosis">
                            + Diagnosis
                        </Link>
                    </Button>

                    <Button className="bg-gradient-to-r from-[#2F80ED] to-[#37C9D9] 2xl:text-lg 2xl:px-8 2xl:py-6">
                        + Add Certificate
                    </Button>
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