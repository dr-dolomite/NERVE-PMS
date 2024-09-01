"use client";

import * as z from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    useState,
    useEffect,
    useTransition
} from "react";

import { getPatientInformationOnlyById } from "@/data/get-patient-info";
import { PatientInformationSchema } from "@/schemas";

import { useRouter } from "next/navigation";

interface EditPatientInformationPageProps {
    patientId: string
}

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
import { updatePatientInfo } from "@/actions/update/update-patient-info";



const EditPatientInformationPage = ({ patientId }: EditPatientInformationPageProps) => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<z.infer<typeof PatientInformationSchema>>({
        resolver: zodResolver(PatientInformationSchema),
        defaultValues: {
            name: "",
            city: "",
            completeAddress: "",
            age: "",
            sex: "",
            birthday: "",
            civilStatus: "",
            occupation: "",
            handedness: "",
            religion: "",
            phone: "",
            email: "",
            lastVisit: "",
            imageUrl: "",
            id: "",
        },
    });

    useEffect(() => {
        getPatientInformationOnlyById(patientId).then((data) => {
            if (data) {
                form.reset({
                    name: data.name,
                    city: data.city,
                    completeAddress: data.completeAddress,
                    age: data.age,
                    sex: data.sex,
                    birthday: data.birthday.toISOString().split('T')[0],
                    civilStatus: data.civilStatus,
                    occupation: data.occupation,
                    handedness: data.handedness,
                    religion: data.religion,
                    phone: data.phone,
                    email: data.email ?? "",
                    lastVisit: data.lastVisit.toISOString().split('T')[0],
                    imageUrl: data.imageURL ?? "",
                    id: data.id,
                });
            }

        })
    }, [patientId, form])

    const onSubmit = async (values: z.infer<typeof PatientInformationSchema>) => {
        try {
            // if (selectedFile) {
            //     const imageUrl = await uploadToS3(selectedFile);
            //     values.imageUrl = imageUrl;
            // }

            setError('');
            setSuccess('');

            startTransition(() => {
                updatePatientInfo(values)
                    .then((data) => {
                        if (data?.error) {
                            form.reset();
                            setError(data.error);
                        }

                        if (data?.success) {
                            form.reset();
                            setSuccess(data.success);
                        }
                    })
                    .catch(() => {
                        setError("An error occurred.");
                    });
                router.refresh();
            });
        } catch (error) {
            console.error('Error in form submission:', error);
            setError("Failed to upload image or save patient information.");
        }
    };

    return (
        <Form {...form}>
            <form className="grid 2xl:grid-cols-5 grid-cols-3 grid-flow-row gap-8 2xl:gap-x-12" onSubmit={form.handleSubmit(onSubmit)}>
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
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                        name="completeAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Complete Address
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Phone
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
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
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
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
                        name="birthday"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Birthday
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="date"
                                        disabled={!!isPending || !!success}
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
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Age
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
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
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Sex
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Civil Status
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Occupation
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                        name="religion"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Religion
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
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
                        name="handedness"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Handedness
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={!!isPending || !!success}
                                        className="capitalize"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col 2xl:col-span-5 col-span-3 mt-4 gap-y-4">
                    <div className="text-center">
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>

                    <div className="max-w-sm">
                        <Button
                            type="submit"
                            disabled={!!isPending || !!success}
                            className="my-button-blue"
                        >
                            {isPending ? "Saving..." : "Update Information"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default EditPatientInformationPage