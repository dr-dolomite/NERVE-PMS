"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"

import { toast } from "@/components/ui/use-toast"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import Link from 'next/link'

import {
    ArrowRight,
    PrinterIcon,
} from "lucide-react"


const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),

    patientsName: z.string().min(2, {
        message: "Patients Name must be at least 2 characters.",
    }),

    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),

    age: z.string().min(1, {
        message: "Age must be at least 1 characters.",
    }),

    // sex must only either be Male or Female
    sex: z.string().min(4, {
        message: "Sex must be either Male or Female.",
    }),

    date: z.string().min(2, {
        message: "Date must be at least 2 characters.",
    }),
})

const PrescriptionPage = () => {

    // date today
    const currentDate = new Date()
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const dayOfMonth = currentDate.getDate();

    // put all the date together in a string
    const fullDate = `${month} ${dayOfMonth}, ${year}`

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            patientsName: "",
            city: "",
            age: "",
            // use the full date as the default value
            date: fullDate,
            sex: "",
        },
    })

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

    return (
        <>
            <div className="flex flex-row justify-between mt-4">
                <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Prescription </h2>

                <Link href="/doctor/dashboard/patient/lab-request">
                    <Button type="button" className="my-button-blue" size="lg">
                        + Lab Request
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-4 grid-flow-row gap-4">
                <div className="col-span-2">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="patientsName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray">Patients Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Olivia Martin" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>

                <div className="col-span-2">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray">Date</FormLabel>
                                    <FormControl>
                                        <Input placeholder={fullDate} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>

                <div className="col-span-2">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray">City</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Iloilo City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>

                <div className="col-span-1">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="age"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray">Age</FormLabel>
                                    <FormControl>
                                        <Input placeholder="25" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>

                <div className="col-span-1">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="sex"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray">Sex</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Female" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>
            </div>

            <div className="grid w-full gap-2">
                <Label htmlFor="message" className="text-gray">Prescription for this box goes here</Label>
                <Textarea placeholder="Type your prescription here." id="message" className="h-56 w-full" />
            </div>

            <div className="flex flex-row justify-between">
                <div className="grid grid-flow-row grid-cols-2 space-x-4">
                    <Button type="reset" className="my-button-gray" size="lg">Reset</Button>
                    <Link href="/doctor/dashboard/patient/diagnosis">
                        <Button type="button" className="my-button-blue" size="lg">
                            Go Back</Button>
                    </Link>
                </div>
                <div className="flex flex-row items-center justify-center space-x-6">
                    <Button type="button" className="my-button-gray" size="lg">Skip</Button>
                    <Link href="/doctor/dashboard/patient/prescription">
                        <Button type="submit" className="my-button-blue" size="lg">
                            Save and Print
                            <PrinterIcon className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PrescriptionPage