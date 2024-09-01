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
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Textarea } from "@/components/ui/textarea";

import { FollowUpPlanSchema } from "@/schemas";
import { saveFollowUpPlan } from "@/actions/save-follow-up-plan";
import Link from "next/link";
import { Label } from "./ui/label";
import { ArrowRight, Check, PrinterIcon } from "lucide-react";

const FollowUpPlanPage = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");
    const recordId = searchParams.get("id");
    const showContent = success || error === "Follow-up plan already exists.";

    const form = useForm<z.infer<typeof FollowUpPlanSchema>>({
        defaultValues: {
            patientId: patientId ?? "",
            recordId: recordId ?? "",
            nextVisit: "",
            followUpNotes: "",
        },
    });

    const onSubmit = (values: z.infer<typeof FollowUpPlanSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            saveFollowUpPlan(values)
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
                })
        });
    };

    return (
        <Card className="p-8">
            <CardHeader>
                <CardTitle>Patient Plan</CardTitle>
                <CardDescription>
                    Fill up the form below to save plan for the previous record.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="grid grid-cols-1 grid-flow-row gap-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="col-span-1 max-w-screen-md">
                            <FormField
                                control={form.control}
                                name="nextVisit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Schedule Next Visit
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Referral name"
                                                type="date"
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
                                name="followUpNotes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Special Notes for Follow Up
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Type your follow up notes here ..."
                                                disabled={isPending}
                                                className="h-64"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex flex-col mt-4 col-span-1 gap-y-4">
                            <div className="text-center">
                                <FormError message={error} />
                                <FormSuccess message={success} />
                            </div>

                            <div className="flex flex-row gap-x-12 mt-4">
                                {!success && error != "Follow-up plan already exists." && (
                                    <Button
                                        type="submit"
                                        className="my-button-blue"
                                        size="lg"
                                        disabled={isPending}>
                                        Save Patient Record
                                    </Button>
                                )}

                                {showContent && (
                                    <div className="grid grid-cols-1 grid-flow-row gap-8">
                                        <div className="max-w-sm flex flex-row items-center gap-x-6">
                                            <Button
                                                type="button"
                                                className="my-button-blue"
                                                size="lg"
                                                asChild
                                            >
                                                <Link href="/dashboard/home">
                                                    Done
                                                    <Check className="size-4 ml-2" />
                                                </Link>
                                            </Button>

                                            <Button
                                                type="button"
                                                className="my-button-blue"
                                                size="lg"
                                                disabled
                                            >
                                                Print The Plan
                                                <PrinterIcon className="size-4 ml-2" />
                                            </Button>
                                        </div>

                                        <div className="grid gap-2 mt-4">
                                            <Label htmlFor="Add a Follow-up">
                                                Existing patient with a follow up record?
                                            </Label>
                                            <Button
                                                type="button"
                                                className="my-button-blue"
                                                size="lg"
                                                asChild
                                            >
                                                <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}&type=followUp`}>
                                                    Add Follow-up Record
                                                    <ArrowRight className="size-4 ml-2" />
                                                </Link>
                                            </Button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default FollowUpPlanPage