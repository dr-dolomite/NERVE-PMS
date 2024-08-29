"use client";
import * as z from "zod";
import {
  useTransition,
  useState
} from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { PatientFollowUpsSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { savePatientFollowup } from "@/actions/save-followups";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CirclePlus } from "lucide-react";

const PatientFollowupForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");
  const vitalSignsId = searchParams.get("vitalSignsId");


  const form = useForm<z.infer<typeof PatientFollowUpsSchema>>({
    resolver: zodResolver(PatientFollowUpsSchema),
    defaultValues: {
      patientId: patientId ?? undefined,
      vitalSignsId: vitalSignsId ?? undefined,
      chiefComplaint: "",
      so: "",
      diagnosis: "",
      treatment: "",
      plan: "",
      labResults: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PatientFollowUpsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      savePatientFollowup(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
            // setvitalSignsId(data.vitalSignsId);
          }
        })
        .catch(() => {
          setError("An error occurred.");
        })
    });
  };

  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle>Patient Follow-up</CardTitle>
        <CardDescription>
          Fill up the form below to save patient follow-up.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="chiefComplaint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Chief Complaint
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Chief Complaint"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="so"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      S/O
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="S/O"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="labResults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Lab Results
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Lab Results"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Diagnosis
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Diagnosis"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="treatment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Treatment
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Treatment"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Plan
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Plan"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col mt-4 col-span-2 gap-y-4">
              <div className="text-center">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>

              <div className="flex flex-row gap-x-12 mt-4">
                {!success && (
                  <Button
                    type="submit"
                    className="my-button-blue"
                    size="lg"
                    disabled={isPending}>
                    Save Patient Follow-up
                  </Button>
                )}

                {success && (
                  <div className="flex flex-row items-center 2xl:gap-x-12 gap-x-8 mt-4">
                    <Button
                      type="button"
                      className="my-button-blue"
                      size="lg"
                      asChild
                    >
                      <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}&type=followUp`} >
                      <CirclePlus className="size-4 mr-2"/>
                        Add Another Follow-up
                      </Link>
                    </Button>

                    <Button
                      type="button"
                      className="my-button-gray"
                      size="lg"
                      asChild
                    >
                      <Link href="/dashboard/home">
                        Go Back
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card >
  )
}

export default PatientFollowupForm