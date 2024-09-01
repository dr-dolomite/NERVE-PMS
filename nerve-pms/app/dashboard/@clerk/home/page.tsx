"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const ClerkDashboardPage = () => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const day = currentDate.toLocaleString('default', { weekday: 'long' });
    const year = currentDate.getFullYear();
    const dayOfMonth = currentDate.getDate();

    const user = useCurrentUser();

    return (
        <div className='grid gap-6'>
            <div className="flex justify-between">
                <div className="flex flex-col items-start">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md antialiased">
                        Hi {user?.name},
                    </h2>
                    <h1 className="text-primary font-semibold 2xl:text-2xl text-xl antialiased">
                        Welcome Back!
                    </h1>
                </div>

                <div className="flex flex-col items-end">
                    <h2 className="text-gray font-medium 2xl:text-lg text-md  antialiased">
                        Today is
                    </h2>
                    <h1 className="text-primary font-medium 2xl:text-lg text-md antialiased">
                        {day} {month} {dayOfMonth}, {year}
                    </h1>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                        Since some features are not yet available, you can only add existing patients for now.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-2 grid-flow-row gap-x-12">
                        <Button asChild className="my-button-blue max-w-sm">
                            <Link href="/dashboard/add-existing-user">
                                <CirclePlus className="w-6 h-6 mr-2" /> Add Existing Patient
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {/* <div className='flex flex-col justify-center items-center'>
                <div className="grid grid-cols-2 grid-flow-row gap-x-12">
                    <Button asChild className="my-button-blue">
                        <Link href="/dashboard/add-existing-user">
                            <CirclePlus className="w-6 h-6 mr-2" /> Add Existing Patient
                        </Link>
                    </Button>
                </div>
            </div> */}
        </div>
    );
};

export default ClerkDashboardPage;