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

import { PatientHistorySchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { savePatientHistory } from "@/actions/save-patient-history";
import { Textarea } from "@/components/ui/textarea";

const PatientHistoryForm = () => {

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const patientId = searchParams.get("patientId");
  const vitalSignsid = searchParams.get("vitalSignsid");


  const form = useForm<z.infer<typeof PatientHistorySchema>>({
    resolver: zodResolver(PatientHistorySchema),
    defaultValues: {
      patientId: patientId ?? undefined,
      vitalSignsid: vitalSignsid ?? undefined,
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

  const onSubmitHistory = (values: z.infer<typeof PatientHistorySchema>) => {
    console.log("Submitting patient history for:", patientId);
    console.log("Form values:", values);
    console.log({" I was pressed": patientId});

    setError("");
    setSuccess("");

    startTransition(() => {
      savePatientHistory(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
          }
        })
        .catch(() => {
          setError("An error occurred.");
        })
    });
  };

  return (
    <Form {...form}>
      <p>
        Patient ID: <strong>{patientId}</strong>
        Vital Signs ID: <strong>{vitalSignsid}</strong>
      </p>
      <form className="grid grid-cols-2 gap-6" onSubmit={form.handleSubmit(onSubmitHistory)}>
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
                    disabled={isPending}
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
                  disabled={isPending}
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
                    disabled={isPending}
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
                    disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                  disabled={isPending}
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
                {/* <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
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
                </Select> */}
                <Input
                  {...field}
                  placeholder="Plan"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col mt-4 max-w-[200px] col-span-2 gap-y-4 text-center">
          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="my-button-blue" disabled={isPending}>
            Save Patient History
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PatientHistoryForm