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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

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
                    className="h-48 2xl:text-lg text-md focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
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

          <div className="grid">
            <h2 className="font-medium">Schedule an appointment</h2>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Form>



    </>
  )
}

export default DiagnosisPage