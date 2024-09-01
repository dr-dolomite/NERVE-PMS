"use client";

import { useEffect, useCallback, useState } from "react";
import {
    BeatLoader
} from "react-spinners";

import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const NewVerificationForm = () => {

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");

    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Your email verification token is invalid.");
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data?.success);
                setError(data?.error);
            })
            .catch(() => {
                setError("An error occurred while verifying your email.");
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="max-w-xl p-4">
                <CardHeader className="grid grid-cols-1 gap-y-4 text-center">
                    <CardTitle>
                        NERVE Email Verification
                    </CardTitle>
                    <CardDescription>
                        We are veriying your email address...
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-y-6 justify-center place-items-center">
                    {!success && !error && (
                        <div className="flex items-center justify-center">
                            <BeatLoader />
                        </div>
                    )}
                    <FormSuccess message={success} />
                    {!success && (
                        <FormError message={error} />
                    )}
                    <Link href="/login">
                        <Button className="my-button-blue">Go back to Login</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewVerificationForm