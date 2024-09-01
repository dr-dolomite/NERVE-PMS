
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FollowUpListProps {
    patientId: string;
}

import { getAllPatientFollowUpById } from "@/data/get-patient-info";
import { ArrowRight, PlusCircle } from "lucide-react";
import FollowUpViewPage from "./follow-up-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const FollowUpListPage = async ({ patientId }: FollowUpListProps) => {

    const listOfFollowUps = await getAllPatientFollowUpById(patientId);
    return (
        <div className="grid gap-4">
            <Accordion type="single" collapsible>
                {listOfFollowUps.map((followUp) => (
                    <AccordionItem key={followUp.id} value={followUp.id}>
                        <AccordionTrigger>
                            <h3>{followUp.date.toDateString()} - {followUp.chiefComplaint}</h3>
                        </AccordionTrigger>
                        <AccordionContent>
                                <FollowUpViewPage followUpId={followUp.id} vitalsId={followUp.vitalSignsId} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            <Button
            className="my-button-blue max-w-xs "
            asChild
            >
                <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}&type=followUp`}>
                <PlusCircle className="size-4 mr-2"/>
                    Add Follow Up Record
                </Link>
            </Button>
        </div>
    )
}

export default FollowUpListPage