
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    FaThermometerHalf,
    FaHeartbeat,
    FaFillDrip,
    FaClock
} from "react-icons/fa";

import Link from "next/link";

interface FollowUpListProps {
    patientId: string;
}

import { getAllPatientFollowUpById } from "@/data/get-patient-info";
import { ArrowRight } from "lucide-react";
import FollowUpViewPage from "./follow-up-view";

const FollowUpListPage = async ({ patientId }: FollowUpListProps) => {

    const listOfFollowUps = await getAllPatientFollowUpById(patientId);
    return (
        <div>
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
        </div>
    )
}

export default FollowUpListPage