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

import { PatientHistorySchema } from "@/schemas";

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
import { savePatientHistory } from "@/actions/save-patient-history";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

const PatientHistoryForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");
  const vitalSignsId = searchParams.get("vitalSignsId");


  const form = useForm<z.infer<typeof PatientHistorySchema>>({
    resolver: zodResolver(PatientHistorySchema),
    defaultValues: {
      patientId: patientId ?? undefined,
      vitalSignsId: vitalSignsId ?? undefined,
      referredBy: "",
      chiefComplaint: "",
      historyOfPresentIllness: "",
      pastMedicalHistory: "",
      familyHistory: "",
      personalSocialHistory: "",
      obgyneHistory: "",
      physicalExamination: "",
      neurologicalExamination: "",
      treatmentPlan: "",
      plan: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PatientHistorySchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      savePatientHistory(values)
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
        <CardTitle>Patient History</CardTitle>
        <CardDescription>
          Fill up the form below to save patient history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="grid grid-cols-2 gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="col-span-1">
              <FormField
                control={form.control}
                name="referredBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Referred By
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Referral name"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="historyOfPresentIllness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      History of Present Illness
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type here..."
                        disabled={!!isPending || !!success}
                        className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <FormField
                control={form.control}
                name="pastMedicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Past Medical History
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type here..."
                        disabled={!!isPending || !!success}
                        className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                        {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <FormField
              control={form.control}
              name="familyHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Family History
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      disabled={!!isPending || !!success}
                      className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="personalSocialHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Social History
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      disabled={!!isPending || !!success}
                      className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="obgyneHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    OBGyne History
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      disabled={!!isPending || !!success}
                      className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="physicalExamination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Physical Examination
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      disabled={!!isPending || !!success}
                      className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neurologicalExamination"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Neurological Examination
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      disabled={!!isPending || !!success}
                      className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatmentPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Treatment
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type here..."
                      disabled={!!isPending || !!success}
                      className="h-36 font-medium focus:ring-2 focus:ring-[#2F80ED] focus:ring-opacity-60"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Plan
                  </FormLabel>
                  <FormControl>
                    <Select disabled={!!isPending || !!success} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose Plan" />
                      </SelectTrigger>
                      <SelectContent
                      >
                        <SelectGroup>
                          <SelectItem value="followup">Follow Up</SelectItem>
                          <SelectItem value="admit">Admit</SelectItem>
                          <SelectItem value="referredTo">Referred To</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col mt-4 col-span-2 gap-y-4">
              <div className="text-center">
                <FormError message={error} />
                <FormSuccess message={success} />
              </div>

              <div className="flex flex-row 2xl:gap-x-12 gap-x-8 mt-4">
                {!success && error !== "Patient history already exists" && (
                  <Button 
                  type="submit" 
                  className="my-button-blue" 
                  size="lg" 
                  disabled={isPending}>
                    Save Patient History
                  </Button>
                )}

                {success && (
                  <div className="flex flex-row 2xl:gap-x-12 gap-x-8">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          type="button"
                          className="my-button-blue"
                          size="lg"
                        >
                          Add Patient Follow-up
                          <ArrowRight className="size-4 ml-2" />
                        </Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Adding Patient Follow-up</AlertDialogTitle>
                          <AlertDialogDescription>
                            You will need the respected vital signs to proceed for each patient follow-up.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="my-button-blue" asChild>
                            <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}&type=followUp`}>
                              Continue
                            </Link>
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      type="button"
                      asChild
                      className="my-button-gray"
                      size="lg"
                    >
                      <Link href="/dashboard/home">
                        Go Back
                      </Link>
                    </Button>

                  </div>
                )}

                {error === "Patient history already exists" && (
                  <>
                  <Button
                    type="button"
                    asChild
                    className="my-button-blue"
                    size="lg"
                  >
                    <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}&type=followUp`}>
                      Add Patient Follow-up
                    </Link>
                  </Button>

                  <Button
                      type="button"
                      asChild
                      className="my-button-gray"
                      size="lg"
                    >
                      <Link href="/dashboard/home">
                        Go Back
                      </Link>
                    </Button>
                    </>
                )
                }

              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default PatientHistoryForm