"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
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

import { Checkbox } from "@/components/ui/checkbox"

import Link from 'next/link'

import {
    HomeIcon,
    PrinterIcon,
} from "lucide-react"
import { Card } from "@/components/ui/card"


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

    examineDate: z.string().min(2, {
        message: "Examine Date must be at least 2 characters.",
    }),

    followUp: z.string().min(2, {
        message: "Follow Up must be at least 2 characters.",
    }),

})

const LabRequestPage = () => {

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
            examineDate: "",
            followUp: "",
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

    const [date, setDate] = React.useState<Date>()

    return (
        <>
            <div className="flex flex-row justify-between mt-4">
                <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Laboratory Request Form </h2>
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

                <div className="col-span-1">
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="examineDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray">Examine Date</FormLabel>
                                    <FormControl>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !date && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                align="start"
                                                className="flex w-auto flex-col space-y-2 p-2"
                                            >
                                                <Select
                                                    onValueChange={(value) =>
                                                        setDate(addDays(new Date(), parseInt(value)))
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select" />
                                                    </SelectTrigger>
                                                    <SelectContent position="popper">
                                                        <SelectItem value="0">Today</SelectItem>
                                                        <SelectItem value="1">Tomorrow</SelectItem>
                                                        <SelectItem value="3">In 3 days</SelectItem>
                                                        <SelectItem value="7">In a week</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <div className="rounded-md border">
                                                    <Calendar mode="single" selected={date} onSelect={setDate} />
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>
            </div>

            <div className="w-full flex justify-center items-center mt-4 mb-12">
                <div className="grid grid-cols-2 grid-flow-row gap-6 gap-x-8">
                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">FBS</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">Urinalysis</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">Creatinine</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">CXR PA View</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">Uric Acid</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">T4</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">SGPT</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">T3</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">HbA1c</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">TSH</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">Na, K</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">CBC</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">Serum Triglycerides</Label>
                        <Checkbox />
                    </Card>

                    <Card className="p-4 flex flex-row justify-between gap-x-4 w-56">
                        <Label className="text-gray">Platelet Count</Label>
                        <Checkbox />
                    </Card>
                </div>
            </div>

            <div className="grid w-full gap-2">
                <Label htmlFor="message" className="text-gray">Others, specify:</Label>
                <Textarea placeholder="Type here." id="message" className="h-24 w-full" />
            </div>

            <div className="mt-4 mb-8">
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="followUp"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="text-gray">Clinic follow-up on: </FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            align="start"
                                            className="flex w-auto flex-col space-y-2 p-2"
                                        >
                                            <Select
                                                onValueChange={(value) =>
                                                    setDate(addDays(new Date(), parseInt(value)))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    <SelectItem value="0">Today</SelectItem>
                                                    <SelectItem value="1">Tomorrow</SelectItem>
                                                    <SelectItem value="3">In 3 days</SelectItem>
                                                    <SelectItem value="7">In a week</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="rounded-md border">
                                                <Calendar mode="single" selected={date} onSelect={setDate} />
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            </div>



            <div className="flex flex-row justify-between">
                <div className="grid grid-flow-row grid-cols-2 space-x-4">
                    <Button type="reset" className="my-button-gray" size="lg">Reset</Button>
                    <Link href="/doctor/dashboard/patient">
                        <Button type="button" className="my-button-blue" size="lg">
                            <HomeIcon className="w-4 h-4 mr-2" />
                            Go Back to Home</Button>
                    </Link>
                </div>

                <Link href="/doctor/dashboard/patient/prescription">
                    <Button type="submit" className="my-button-blue" size="lg">
                        <PrinterIcon className="w-4 h-4 mr-2" />
                        Save and Print
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default LabRequestPage