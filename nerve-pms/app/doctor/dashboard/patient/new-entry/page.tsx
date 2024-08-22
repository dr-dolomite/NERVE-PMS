"use client"

import * as React from "react"
// import { CalendarIcon } from "@radix-ui/react-icons"
import { ArrowRight } from "lucide-react"

// import { addDays, format } from "date-fns"

// import { cn } from "@/lib/utils"

// import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/components/ui/use-toast";

import Link from 'next/link';

import { Label } from "@/components/ui/label"

const FormSchema = z.object({
    hep: z
        .string()
        .min(10, {
            message: "HEP must be at least 10 characters.",
        })
        .max(160, {
            message: "HEP must not be longer than 30 characters.",
        }),

    pmh: z
        .string()
        .min(10, {
            message: "PMH must be at least 10 characters.",
        })
        .max(160, {
            message: "PMH must not be longer than 30 characters.",
        }),

    obgyne: z
        .string()
        .min(10, {
            message: "OB-Gyne History must be at least 10 characters.",
        })
        .max(160, {
            message: "OB-Gyne History must not be longer than 30 characters.",
        }),

    pe: z
        .string()
        .min(10, {
            message: "Physical Examination must be at least 10 characters.",
        })
        .max(160, {
            message: "Physical Examination must not be longer than 30 characters.",
        }),

    fh: z
        .string()
        .min(10, {
            message: "Family History must be at least 10 characters.",
        })
        .max(160, {
            message: "Family History must not be longer than 30 characters.",
        }),

    neuro: z
        .string()
        .min(10, {
            message: "Neurological Examination must be at least 10 characters.",
        })
        .max(160, {
            message: "Neurological Examination must not be longer than 30 characters.",
        }),

    diagnosis: z
        .string()
        .min(10, {
            message: "Diagnosis must be at least 10 characters.",
        })
        .max(160, {
            message: "Diagnosis must not be longer than 30 characters.",
        }),
    
    notes: z
        .string()
        .min(10, {
            message: "Notes must be at least 10 characters.",
        })
        .max(160, {
            message: "Notes must not be longer than 30 characters.",
        }),

})

interface FormRecordProps {
    title: string;
    description: string;
    name: string;
}

const NewPatientForm = () => {

    const [date, setDate] = React.useState<Date>()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const FormRecords: FormRecordProps[] = [
        {
            title: "History of Present Illness",
            description: "Add or Update the HEP of the Patient",
            name: "hep"
        },

        {
            title: "Past Medical History",
            description: "Add or Update the PMH of the Patient",
            name: "pmh"
        },

        {
            title: "Family History",
            description: "Add or Update the FH of the Patient",
            name: "fh"
        },

        {
            title: "OB-Gyne History",
            description: "Add or Update the OB-Gyne History of the Patient",
            name: "obgyne"
        },

        {
            title: "Physical Examination",
            description: "Add or Update the PE of the Patient",
            name: "pe"
        },

        {
            title: "Neurological Examination",
            description: "Add or Update the Neurological Examination of the Patient",
            name: "neuro"
        },

        {
            title: "Diagnosis",
            description: "Add or Update the Diagnosis of the Patient",
            name: "diagnosis"
        },

        // {
        //     title: "Plans",
        //     description: "Add or Update the Plans for the Patient",
        // }
    ]

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    const [selectedPlan, setSelectedPlan] = React.useState<string | null>(null);

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
                    {FormRecords.map((record, index) => (
                        <div className="space-y-6 w-10/12" key={index}>
                            <div>
                                <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> {record.title} </h2>
                            </div>
                            <FormField
                                control={form.control}
                                name={record.name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray 2xl:text-md">{record.description}</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type here..."
                                                className="h-36 2xl:text-base text-md font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}

                    <div className="grid gap-4 mt-8 w-10/12">
                        <Card x-chunk="dashboard-07-chunk-3" className="w-1/2">
                            <CardHeader>
                                <CardTitle className="font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text">Plans</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Select Option</Label>
                                        <Select onValueChange={(value) => setSelectedPlan(value)}>
                                            <SelectTrigger id="status" aria-label="Select status">
                                                <SelectValue placeholder="Plan option" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="opd">OPD</SelectItem>
                                                <SelectItem value="admission">Admission</SelectItem>
                                                <SelectItem value="referral">Referral</SelectItem>
                                                <SelectItem value="neuro-clearance">Neuro Clearance</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedPlan === "opd" && (
                                        <div className="grid gap-3">
                                            <Label htmlFor="opd-status">For OPD Patients</Label>
                                            <Select>
                                                <SelectTrigger id="opd-status" aria-label="Select OPD status">
                                                    <SelectValue placeholder="Plan option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="diagnostics">Diagnostics</SelectItem>
                                                    <SelectItem value="medication">Medication</SelectItem>
                                                    <SelectItem value="follow-up">Schedule Follow up</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}

                                    {selectedPlan === "neuro-clearance" && (
                                        <div className="grid gap-3">
                                            <Label htmlFor="neuro-status">For Neuro Clearance</Label>
                                            <Select>
                                                <SelectTrigger id="neuro-status" aria-label="Select Clearance">
                                                    <SelectValue placeholder="Clearance option" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="dentist">Dentist</SelectItem>
                                                    <SelectItem value="surgeon">Surgeon</SelectItem>
                                                    <SelectItem value="travel">Travel</SelectItem>
                                                    <SelectItem value="fit-to-work">Fit to Work</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div>
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray 2xl:text-md">Notes</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Type here..."
                                                className="h-36 2xl:text-base text-md font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row justify-between">
                        <div className="grid grid-flow-row grid-cols-2 space-x-4">
                            <Button type="reset" className="my-button-gray" size="lg">Reset</Button>
                            <Link href="/doctor/dashboard/patient">
                                <Button type="button" className="my-button-blue" size="lg">
                                    Go Back</Button>
                            </Link>
                        </div>
                        <div className="flex items-center justify-center">
                            {/* <Link href="/doctor/dashboard/patient/prescription"> */}
                                <Button type="submit" className="my-button-blue" size="lg">
                                    Save Changes
                                    <ArrowRight className="w-4 h-4 ml-2" /></Button>
                            {/* </Link> */}
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}

export default NewPatientForm