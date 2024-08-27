import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import Link from "next/link";

type HistoryItem = {
    title: string;
    content: string | object;
    value: string;
};

type Histories = {
    [key: string]: HistoryItem[];
};

const allHistories: Histories = {
    "03-01-22": [
        {
            title: "History of Present Illness",
            content: "Content here",
            value: "item-1",
        },

        {
            title: "Past Medical History",
            content: "Content here",
            value: "item-2",
        },

        {
            title: "Family History",
            content: "Content here",
            value: "item-3",
        },

        {
            title: "Personal, Social, and Emotional History",
            content: "Content here",
            value: "item-4",
        },

        {
            title: "OB-Gyne History",
            content: "Content here",
            value: "item-5",
        },

        {
            title: "Physical Examination",
            content: "Content here",
            value: "item-6",
        },

        {
            title: "Neurological Examination",
            content: "Content here",
            value: "item-7",
        },

        {
            title: "Diagnosis",
            content: "Content here",
            value: "item-8",
        },

        {
            title: "Plan",
            content: "Content here",
            value: "item-9",
        },
    ],

    "04-01-22": [
        {
            title: "Vital Signs",
            content: {
                "Pulse Rate": "72 bpm",
                "Body Temperature": "36.5°C",
                "Blood Pressure": "120/80 mmHg",
                "Weight": "70 kg",
                "Oxygen": "98%",
            },
            value: "item-1",
        },

        {
            title: "Lab Results",
            content: "Content here",
            value: "item-2",
        },

        {
            title: "S/O",
            content: "Content here",
            value: "item-3",
        },

        {
            title: "Diagnosis",
            content: "Content here",
            value: "item-4",
        },

        {
            title: "Treatment",
            content: "Content here",
            value: "item-5",
        },

        {
            title: "Plan",
            content: "Content here",
            value: "item-6",
        },
    ],
}

const HistoryPage = ({ params }: { params: { id: string } }) => {

    const patientHistory = allHistories[params.id] || [];

    return (
        <div className="grid grid-cols-1 gap-4">
            <Accordion type="single" collapsible className="w-full 2xl:text-lg text-md">
                {patientHistory.length > 0 ? (
                    patientHistory.map((item, index) => (
                        <AccordionItem key={index} value={item.value}>
                            <AccordionTrigger>
                                {item.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                {item.title === "Vital Signs" ? (
                                    <div>
                                        {Object.entries(item.content).map(([label, value]) => (
                                            <div key={label} className="mb-2">
                                                <strong>{label}:</strong> {value}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>{item.content}</div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                ) : (
                    <p>No history data available for this patient.</p>
                )}
            </Accordion>
            <Link href="/doctor/dashboard/patient">
                <Button className="my-button-blue">Go back</Button>
            </Link>
        </div>
    )
}

export default HistoryPage