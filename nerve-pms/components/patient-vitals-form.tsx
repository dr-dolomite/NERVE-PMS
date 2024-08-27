"use client";
import * as z from "zod";
import {
    useTransition,
    useState
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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

const PatientVitalsForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof PatientVitalsSchema>>({
        resolver: zodResolver(PatientVitalsSchema),
        defaultValues: {
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
                    } else {
                        setSuccess(data.success);
                        form.reset();
                    }
                })
                .catch(() => {
                    setError("An error occurred.");
                })
        });
    };

    return (
        <Form {...form}>
            <form className="grid grid-cols-3 grid-flow-row 2xl:gap-6 gap-4">
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
                                    placeholder="0"
                                    disabled={isPending}
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
                                    placeholder="0"
                                    disabled={isPending}
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
                                    placeholder="0"
                                    disabled={isPending}
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
                                    placeholder="0"
                                    disabled={isPending}
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
                                    placeholder="0"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col col-span-3 w-[200px] mt-4 gap-y-4 text-center">
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button type="submit" className="my-button-blue" onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
                        Save Patient Vitals
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default PatientVitalsForm