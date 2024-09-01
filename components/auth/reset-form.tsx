"use client";
import * as z from "zod"
import {
    useTransition,
    useState
} from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { ResetSchema } from "@/schemas";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/ui/back-button"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { reset } from "@/actions/reset";

const ResetForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            reset(values)
                .then((data) => {
                    setError(data?.error);
                    // TODO: for 2FA
                    setSuccess(data?.success);
                })
        });
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <Card className="mx-auto p-4 max-w-lg w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">Forgot your password?</CardTitle>
                    <CardDescription>
                        Let&apos;s get you back into your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
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
                                                type="email"
                                                placeholder="john.doe@example.com"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormError
                                message={error}
                            />

                            <FormSuccess
                                message={success}
                            />

                            <Button type="submit" className="w-full my-button-blue mt-4" disabled={isPending} >
                                Send reset email
                            </Button>
                        </form>
                    </Form>

                    {/* <Social /> */}

                    <div className="mt-4 text-center text-sm">
                        <BackButton href="/login" label="Back to login" />
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default ResetForm