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
} from "@/components/ui/form";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { savePatientInfo } from "@/actions/save-patient-info";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PatientInformationForm = () => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [patientId, setPatientId] = useState<string>("");

    /* For S3 Image Upload */
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];

            // Check if the file size is greater than 3MB
            if (file.size > 3 * 1024 * 1024) {
                setError("File size must be less than 3MB.");
                setSelectedFile(null);
                return;
            }

            // Check if the file type is allowed (png, jpg, jpeg)
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
            if (!allowedTypes.includes(file.type)) {
                setError("File must be in PNG, JPG, or JPEG format.");
                setSelectedFile(null);
                return;
            }

            setSelectedFile(file);
            setError(""); // Clear any previous errors
        }
    };

    const uploadToS3 = async (file: File): Promise<string> => {
        try {

            console.log('Requesting presigned URL for:', file.name);
            const response = await fetch(`/api/presigned?fileName=${encodeURIComponent(file.name)}&contentType=${encodeURIComponent(file.type)}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Presigned URL response:', response.status, errorText);
                throw new Error(`Failed to get presigned URL: ${response.statusText}`);
            }

            const { signedUrl } = await response.json();
            console.log('Received presigned URL:', signedUrl);

            const uploadResponse = await fetch(signedUrl, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type,
                },
            });

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                console.error('Upload error details:', errorText);
                throw new Error(`Upload failed with status: ${uploadResponse.status}`);
            }

            // Return the URL of the uploaded image
            return signedUrl.split('?')[0]; // Return the URL without the query string
        } catch (error) {
            console.error('Error uploading to S3:', error);
            throw error;
        }
    };
    /* For S3 Image Upload */

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
        },
    });

    const onSubmit = async (values: z.infer<typeof PatientInformationSchema>) => {
        try {
            if (selectedFile) {
                const imageUrl = await uploadToS3(selectedFile);
                values.imageUrl = imageUrl;
            }

            setError('');
            setSuccess('');

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
                    });
            });
        } catch (error) {
            console.error('Error in form submission:', error);
            setError("Failed to upload image or save patient information.");
        }
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Patient Information</CardTitle>
                <CardDescription>Fill up the form below to register a new patient.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="grid grid-cols-3 grid-flow-row 2xl:gap-8 gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="col-span-2 max-w-sm">
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Patient Image
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                // {...field}
                                                id="picture"
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                onChange={handleFileChange}
                                                disabled={!!isPending || !!success}
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
                                                placeholder="Full Name"
                                                disabled={!!isPending || !!success}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

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
                                            placeholder="City Only"
                                            disabled={!!isPending || !!success}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="col-span-3">
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
                                                placeholder="Address"
                                                disabled={!!isPending || !!success}
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
                                            placeholder="Age"
                                            disabled={!!isPending || !!success}
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
                                        <Select disabled={!!isPending || !!success} onValueChange={field.onChange} defaultValue={field.value}>
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
                                            placeholder="mm/dd/yyyy"
                                            disabled={!!isPending || !!success}
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
                                        <Select disabled={!!isPending || !!success} onValueChange={field.onChange} defaultValue={field.value}>
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
                                            placeholder="Occupation"
                                            disabled={!!isPending || !!success}
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
                                        <Select disabled={!!isPending || !!success} onValueChange={field.onChange} defaultValue={field.value}>
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
                                            placeholder="Religion"
                                            disabled={!!isPending || !!success}
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
                                            disabled={!!isPending || !!success}
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
                                            disabled={!!isPending || !!success}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastVisit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Last Visit
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="mm/dd/yyyy"
                                            type="date"
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
                                        className="my-button-blue"
                                        disabled={isPending}>
                                        Save Patient Information
                                    </Button>
                                )}

                                {success && (
                                    <Button type="button" size="lg" asChild className="my-button-blue">
                                        <Link href={`/dashboard/add-patient-vitals?patientId=${patientId}`}>
                                            Add Patient Vitals
                                            <ArrowRight className="ml-2 size-4" />
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

export default PatientInformationForm