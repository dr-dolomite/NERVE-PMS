"use client";
import * as z from "zod";
import {
    useTransition,
    useState
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Link from "next/link";
import { PatientVitalsSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { savePatientVitals } from "@/actions/save-patient-vitals";
import { ArrowRight } from "lucide-react";

const PatientVitalsForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [vitalSignsid, setVitalSignsid] = useState<string>("");
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");
    const type = searchParams.get("type");

    const form = useForm<z.infer<typeof PatientVitalsSchema>>({
        resolver: zodResolver(PatientVitalsSchema),
        defaultValues: {
            patientId: patientId ?? undefined,
            pulseRate: 0,
            bodyTemperature: "",
            bloodPressure: "",
            weight: "",
            oxygen: 0,
        },
    });

    const onSubmit = (values: z.infer<typeof PatientVitalsSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            savePatientVitals(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                        setVitalSignsid(data.vitalSignsid);
                    }
                })
                .catch(() => {
                    setError("An error occurred.");
                })
        });
    };


    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Vitals</CardTitle>
                <CardDescription>Fill up the form below to save patient vitals.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="grid grid-cols-3 grid-flow-row 2xl:gap-6 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="pulseRate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Pulse Rate
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            placeholder="bpm"
                                            disabled={!!isPending || !!success}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bodyTemperature"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Body Temperature
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="°C"
                                            disabled={!!isPending || !!success}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="bloodPressure"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Blood Pressure
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="mmHg"
                                            disabled={!!isPending || !!success}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Weight
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="kg"
                                            disabled={!!isPending || !!success}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="oxygen"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Oxygen
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value || ''}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            placeholder="%"
                                            disabled={!!isPending || !!success}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col col-span-3 mt-4 gap-y-4">
                            <div className="text-center">
                                <FormError message={error} />
                                <FormSuccess message={success} />
                            </div>

                            <div>
                                {!success && (
                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="my-button-blue 2xl:w-[200px]"
                                        disabled={isPending}>
                                        Save Patient Vitals
                                    </Button>
                                )}

                                {success && patientId && vitalSignsid && (
                                    <Button type="button" size="lg" asChild className="my-button-blue">
                                        <Link
                                            href={`/dashboard/${type === 'followUp' ? `add-followup` : `add-patient-history`}?patientId=${patientId}&vitalSignsId=${vitalSignsid}`}
                                        >
                                            {type === 'followUp' ? 'Add Follow-up' : 'Add Patient History'}
                                            <ArrowRight className="size-4 ml-2" />
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}

export default PatientVitalsForm