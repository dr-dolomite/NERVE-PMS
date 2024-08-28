"use client";
import * as z from "zod";
import {
    useTransition,
    useState
} from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { PatientInformationSchema } from "@/schemas";

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
import { savePatientInfo } from "@/actions/save-patient-info";
import Link from "next/link";

const PatientInformationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [patientId, setPatientId] = useState<string>("");

    const form = useForm<z.infer<typeof PatientInformationSchema>>({
        resolver: zodResolver(PatientInformationSchema),
        defaultValues: {
            name: "",
            city: "",
            age: "",
            sex: "",
            birthday: "",
            civilStatus: "",
            occupation: "",
            handedness: "",
            religion: "",
            phone: "",
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof PatientInformationSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            savePatientInfo(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                        setPatientId(data.patientId);
                    }
                })
                .catch(() => {
                    setError("An error occurred.");
                })
        })
    };

    return (
        <Form {...form}>
            <form className="grid grid-cols-3 grid-flow-row 2xl:gap-6 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="col-span-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="name"
                                        placeholder="John Doe"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="col-span-1">
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    City
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Iloilo City"
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
                    name="age"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Age
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="18"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sex"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Sex
                            </FormLabel>
                            <FormControl>
                                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Sex" />
                                    </SelectTrigger>
                                    <SelectContent
                                    >
                                        <SelectGroup>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Birthday
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="08/11/2002"
                                    disabled={isPending}
                                    type="date"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="civilStatus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Civil Status
                            </FormLabel>
                            <FormControl>
                                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Civil Status" />
                                    </SelectTrigger>
                                    <SelectContent
                                    >
                                        <SelectGroup>
                                            <SelectItem value="single">Single</SelectItem>
                                            <SelectItem value="married">Married</SelectItem>
                                            <SelectItem value="widowed">Widowed</SelectItem>
                                            <SelectItem value="divorced">Divorced</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="occupation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Occupation
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Worker"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="handedness"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Handedness
                            </FormLabel>
                            <FormControl>
                                <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose Handedness" />
                                    </SelectTrigger>
                                    <SelectContent
                                    >
                                        <SelectGroup>
                                            <SelectItem value="left">Left</SelectItem>
                                            <SelectItem value="right">Right</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="religion"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Religion
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Catholic"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Contact
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="+639 999 9999"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="email@example.com"
                                    disabled={isPending}
                                    type="email"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col mt-4 w-[200px] gap-y-4 text-center">
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    {!success && (
                        <Button type="submit" className="my-button-blue" disabled={isPending}>
                            Save Patient Information
                        </Button>
                    )}

                    {success && (
                        <Button type="button" asChild className="my-button-blue">
                            <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}`}>
                                Add Patient Vitals
                            </Link>
                        </Button>
                    )}

                </div>
            </form>
        </Form>
    )
}

export default PatientInformationForm