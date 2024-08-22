"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { CirclePlus } from 'lucide-react'

const ClerkDashboardPage = () => {

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const year = currentDate.getFullYear();
    const dayOfMonth = currentDate.getDate();

    const [date, setDate] = React.useState<Date>()

    return (
        <div className='grid gap-6'>
            <div className="flex justify-between">
                <div className="flex flex-col items-start">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md antialiased">
                        Hi Karla,
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
                    <DialogContent className="max-w-[90%]">
                        <DialogHeader>
                            <DialogTitle className='text-[#0E313E] antialised 2xl:text-2xl text-lg'>Add a New Patient Record</DialogTitle>
                            <DialogDescription>
                                Input the the necessary information to add a new patient record.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-5 gap-6 py-4">
                            <div className='col-span-3'>
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="First Name" />
                            </div>

                            <div className='col-span-2'>
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Last Name" />
                            </div>

                            <div className='col-span-3'>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="Address" />
                            </div>

                            <div className='col-span-2'>
                                <Label htmlFor="city">City</Label>
                                <Input id="city" placeholder="City" />
                            </div>

                            <div className='col-span-2 grid gap-1.5'>
                                <Label htmlFor="birthdate">Date of Birth</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                            id="birthdate"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="col-span-1">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="sex">
                                        Sex
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-[70%]" id="sex">
                                            <SelectValue placeholder="Sex" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Sex</SelectLabel>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="col-span-2">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="marital-status">
                                        Marital Status
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="w-[70%]" id="marital-status">
                                            <SelectValue placeholder="Marital Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Marital Status</SelectLabel>
                                                <SelectItem value="single">Single</SelectItem>
                                                <SelectItem value="married">Married</SelectItem>
                                                <SelectItem value="divorced">Divorced</SelectItem>
                                                <SelectItem value="widowed">Widowed</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className='col-span-3'>
                                <Label htmlFor="occupation">Occupation</Label>
                                <Input id="occupation" placeholder="Occupation" className="w-[50%]" />
                            </div>

                            <div className='col-span-2'>
                                <Label htmlFor="contact">Contact Number</Label>
                                <Input id="contact" placeholder="Contact" type="number" className="w-[70%]" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="my-button-blue" size="lg">Save Entry</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default ClerkDashboardPage