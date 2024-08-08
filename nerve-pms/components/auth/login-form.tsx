"use client";

import * as z from "zod"

import {
    useTransition,
    useState
} from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Link from "next/link"

import { LoginSchema } from "@/schemas"

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
import { login } from "@/actions/login";

const LoginPage = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }
    return (
        <Card className="mx-auto max-w-lg p-4">
            <CardHeader>
                <CardTitle className="text-2xl">Login to Nerve</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
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

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Your password"
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

                        <Button type="submit" className="w-full my-button-blue" disabled={isPending} >
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 text-center text-sm">
                    <BackButton href="/register" label="Don&apos;t have an account?" />
                </div>
            </CardContent>
        </Card>
    )
}

export default LoginPage