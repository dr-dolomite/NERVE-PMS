"use client";

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

import {
  Card,
  CardContent,
  CardHeader
} from '@/components/ui/card'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "@/components/ui/use-toast"

import {
  ArrowRight,
  PrinterIcon,
  HomeIcon,
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


const FormsPage = () => {

  const [date, setDate] = React.useState<Date>()

  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const dayOfMonth = currentDate.getDate();

  const fullDate = `${month} ${dayOfMonth}, ${year}`

  const patientInformation = {
    name: 'John Doe',
    age: 25,
    city: 'Iloilo City',
    diagnosis: 'The patient is diagnosed with a mild case of flu and is advised to rest for 3 days. The patient is also advised to take the prescribed medicine. '
  }

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
    <div className='grid gap-4'>
      <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Form Request </h2>

      <Card className='flex justify-center items-center'>
        <Tabs defaultValue="certificate" className="2xl:w-[800px] w-[600px]">
          <CardHeader>
            <TabsList className="grid w-full grid-cols-3 gap-4">
              <TabsTrigger value="certificate">Certificate</TabsTrigger>
              <TabsTrigger value="prescription">Prescription</TabsTrigger>
              <TabsTrigger value="lab-request">Lab Request</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="certificate" className='grid 2xl:gap-8 gap-6'>
              <div>
                <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Medical Certificate </h2>
              </div>
              <div className="grid gap-4">
                <div className="flex justify-end">
                  <div className="grid w-full max-w-sm justify-end items-center gap-1.5">
                    <Label htmlFor="dateToday">Date</Label>
                    <p className="text-gray 2xl:text-lg text-base font-normal"> {fullDate} </p>
                  </div>
                </div>

                <div className="grid grid-cols-5 grid-flow-row gap-4 gap-y-12">
                  <div className="col-span-2">
                    <p className="uppercase text-gray 2xl:text-lg text-base font-normal antialiased">
                      To Whom it May Concern:
                    </p>
                  </div>
                  <div className="col-span-5">
                    <div className="grid grid-cols-3 grid-flow-row gap-x-4">
                      <p className="col-span-1 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                        This is to certify that Mr./Mrs.
                      </p>
                      <div className="col-span-2 border-1 border-gray-400 border-b flex items-center justify-center">
                        <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                          {patientInformation.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                      <div className="col-span-5 border-1 border-gray-400 border-b flex items-center justify-center">
                        <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                          {patientInformation.age}
                        </p>
                      </div>
                      <p className="col-span-1 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                        years old
                      </p>

                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                      <p className="col-span-3 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                        single / married and presently residing at
                      </p>
                      <div className="col-span-3 border-1 border-gray-400 border-b flex items-center justify-center">
                        <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                          {patientInformation.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                      <div className="col-span-4 border-1 border-gray-400 border-b flex items-center justify-center">
                        <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                          {/* {patientInformation.age} */}
                        </p>
                      </div>
                      <p className="col-span-2 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                        consulted at my clinic on
                      </p>
                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                      <div className="col-span-3 border-1 border-gray-400 border-b flex items-center justify-center">
                        <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                          {fullDate}
                        </p>
                      </div>
                      <p className="col-span-3 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                        and the following diagnosis was given:
                      </p>
                    </div>
                  </div>

                  <div className="col-span-5">
                    <div className="border-1 border-b border-gray-400">
                      <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                        {patientInformation.diagnosis}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-5 pt-6">
                    <div className="grid w-full gap-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea placeholder="Type your message here." id="remarks" className="h-32 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide text-gray" />
                    </div>
                  </div>

                  <div className="col-span-5">
                    <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                      This certificate is issued upon the request of the patient. Thank you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-end pt-6">
                <div className="flex flex-row items-center justify-center space-x-6">
                  <Link href="/doctor/dashboard/patient">
                    <Button type="button" className="my-button-gray" size="lg">
                      Go Back</Button>
                  </Link>
                  <Link href="/doctor/dashboard/patient/prescription">
                    <Button type="submit" className="my-button-blue" size="lg">
                      Save and Print
                      <PrinterIcon className="w-4 h-4 ml-2" /></Button>
                  </Link>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="prescription" className='grid 2xl:gap-8 gap-6'>
              <div>
                <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Prescription </h2>
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
            </TabsContent>

            <TabsContent value="lab-request" className='grid 2xl:gap-8 gap-6'>
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
            </TabsContent>

          </CardContent>

        </Tabs>
      </Card>

    </div>
  )
}

export default FormsPage