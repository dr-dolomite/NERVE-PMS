"use client";

import * as z from "zod"

import {
    useTransition,
    useState
} from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/ui/back-button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import Social from "@/components/auth/social"

import { RegisterSchema } from "@/schemas"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";

const RegisterForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {

        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }

    return (
        <div className="flex items-center justify-center h-screen w-full">
            <Card className="mx-auto max-w-lg p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up to Nerve</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">

                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                First Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="name"
                                                    placeholder="John"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Last Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="name"
                                                    placeholder="Doe"
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

                            <Button type="submit" className="w-full my-button-blue">
                                Create an account
                            </Button>
                        </form>
                    </Form>
                    <Social />
                    <div className="mt-4 text-center text-sm">
                        <BackButton href="/login" label="Already have an account?" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterForm