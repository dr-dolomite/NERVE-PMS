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
} from "@/components/ui/form";

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { savePatientFollowup } from "@/actions/save-followups";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, CirclePlus, PrinterIcon } from "lucide-react";

const PatientFollowupForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [planType, setPlanType] = useState<string | undefined>("");
  const [followUpRecordId, setFollowUpRecordId] = useState<string>("");
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
            setFollowUpRecordId(data.followUpRecordId);
            setPlanType(data.planType);
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
          <form className="grid grid-cols-2 grid-flow-row gap-6" onSubmit={form.handleSubmit(onSubmit)}>
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
                        className="h-32"
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
                        className="h-32"
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
                        className="h-32"
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
                        className="h-32"
                        disabled={!!isPending || !!success}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="max-w-sm">
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
                            <SelectItem value="follow-up">Follow Up</SelectItem>
                            <SelectItem value="opd">OPD</SelectItem>
                            <SelectItem value="admit">Admit</SelectItem>
                            <SelectItem value="referral">Referred To</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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

              <div className="flex flex-row 2xl:gap-x-12 gap-x-8 mt-4">
                {!success && error !== "Patient history already exists" && (
                  <Button
                    type="submit"
                    className="my-button-blue"
                    size="lg"
                    disabled={isPending}>
                    Save Patient Folow-up
                  </Button>
                )}

                {success && (
                  <Button
                    type="button"
                    asChild
                    className="my-button-blue"
                    size="lg"
                  >
                    <Link href={`/dashboard/add-plan/${planType}?patientId=${patientId}&id=${followUpRecordId}`}>
                      Add Patient Plan Information
                      <ArrowRight className="size-4 ml-2" />
                    </Link>
                  </Button>
                )}

                {error === "Patient history already exists" && (
                  <>
                    <Button
                      type="button"
                      asChild
                      className="my-button-blue"
                      size="lg"
                    >
                      <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}`}>
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
    </Card >
  )
}

export default PatientFollowupForm