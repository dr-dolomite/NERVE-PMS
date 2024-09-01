"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { ArrowRight } from "lucide-react"

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

import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/components/ui/use-toast";

import Link from 'next/link';

const FormSchema = z.object({
  diagnosis: z
    .string()
    .min(10, {
      message: "Diagnosis must be at least 10 characters.",
    })
    .max(160, {
      message: "Diagnosis must not be longer than 30 characters.",
    }),
})

const DiagnosisPage = () => {

  const [date, setDate] = React.useState<Date>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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
      <div>
        <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Diagnosis </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-10/12">
          <FormField
            control={form.control}
            name="diagnosis"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray 2xl:text-md">Input current diagnosis of patient here.</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type here..."
                    className="h-52 2xl:text-base text-md focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                    You can <span>@mention</span> other users and organizations.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="my-4 grid 2xl:space-y-4 space-y-2">
            <h2 className="font-medium">Schedule an appointment for next visit.</h2>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[260px] justify-start text-left font-medium 2xl:text-md 2xl:py-6",
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
                    <SelectItem value="1" className="focus:bg-[#D4F7F9]">Tomorrow</SelectItem>
                    <SelectItem value="3" className="focus:bg-[#D4F7F9]">In 3 days</SelectItem>
                    <SelectItem value="7" className="focus:bg-[#D4F7F9]">In a week</SelectItem>
                    <SelectItem value="14" className="focus:bg-[#D4F7F9]">In 2 weeks</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>
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
                    <Link href="/doctor/dashboard/patient/prescription">
                        <Button type="submit" className="my-button-blue" size="lg">
                            Save and Proceed to Prescription
                            <ArrowRight className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>
            </div>
        </form>
      </Form>
    </>
  )
}

export default DiagnosisPage