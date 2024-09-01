"use client";

interface DeletePatientIconProps {
    patientName: string
}

import { Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useToast } from "@/components/ui/use-toast"

import { deletePatientRecord } from '@/actions/delete-patient-record';

import { useRouter } from 'next/navigation';


const DeletePatientIcon = ({ patientName }: DeletePatientIconProps) => {
    const { toast } = useToast();
    const router = useRouter();

    const onDelete = () => {
        deletePatientRecord(patientName);
        toast({
            title: "Deleted successfuly!",
            description: "Please refresh the page if the record still shows.",
        })
        router.refresh();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Trash2Icon className='w-4 h-4' />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className='my-button-red'>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeletePatientIcon