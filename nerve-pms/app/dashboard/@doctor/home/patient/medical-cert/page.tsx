import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { PrinterIcon } from "lucide-react";

import Link from "next/link";

const MedicalCertificatePage = () => {

    const currentDate = new Date();
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();
    const dayOfMonth = currentDate.getDate();

    // Combine all the date in this format:
    // Month Day, Year
    const fullDate = `${month} ${dayOfMonth}, ${year}`

    const patientInformation = {
        name: 'John Doe',
        age: 25,
        city: 'Iloilo City',
        diagnosis: 'The patient is diagnosed with a mild case of flu and is advised to rest for 3 days. The patient is also advised to take the prescribed medicine. '
    }


    return (
        <>
            <div>
                <h2 className='font-semibold 2xl:text-2xl text-lg bg-gradient-to-r from-[#2F80ED] to-[#1EBDD2] inline-block text-transparent bg-clip-text'> Medical Certificate </h2>
            </div>

            <div className="grid gap-4">
                <div className="flex justify-end">
                    <div className="grid w-full max-w-sm justify-end items-center gap-1.5">
                        <Label htmlFor="dateToday">Date</Label>
                        <p className="text-gray 2xl:text-lg text-base font-normal"> {fullDate} </p>
                    </div>
                </div>

                <div className="grid grid-cols-5 grid-flow-row gap-4 gap-y-12">
                    <div className="col-span-2">
                        <p className="uppercase text-gray 2xl:text-lg text-base font-normal antialiased">
                            To Whom it May Concern:
                        </p>
                    </div>
                    <div className="col-span-5">
                        <div className="grid grid-cols-3 grid-flow-row gap-x-4">
                            <p className="col-span-1 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                This is to certify that Mr./Mrs.
                            </p>
                            <div className="col-span-2 border-1 border-gray-400 border-b flex items-center justify-center">
                                <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                    {patientInformation.name}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                            <div className="col-span-5 border-1 border-gray-400 border-b flex items-center justify-center">
                                <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                    {patientInformation.age}
                                </p>
                            </div>
                            <p className="col-span-1 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                years old
                            </p>

                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                            <p className="col-span-3 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                single / married and presently residing at
                            </p>
                            <div className="col-span-3 border-1 border-gray-400 border-b flex items-center justify-center">
                                <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                    {patientInformation.city}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                            <div className="col-span-4 border-1 border-gray-400 border-b flex items-center justify-center">
                                <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                    {/* {patientInformation.age} */}
                                </p>
                            </div>
                            <p className="col-span-2 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                consulted at my clinic on
                            </p>
                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="grid grid-cols-6 grid-flow-row gap-x-4">
                            <div className="col-span-3 border-1 border-gray-400 border-b flex items-center justify-center">
                                <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                    {fullDate}
                                </p>
                            </div>
                            <p className="col-span-3 text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                and the following diagnosis was given:
                            </p>
                        </div>
                    </div>

                    <div className="col-span-5">
                        <div className="border-1 border-b border-gray-400">
                            <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                                {patientInformation.diagnosis}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-5 pt-6">
                        <div className="grid w-full gap-2">
                            <Label htmlFor="remarks">Remarks</Label>
                            <Textarea placeholder="Type your message here." id="remarks" className="h-32 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide text-gray" />
                        </div>
                    </div>

                    <div className="col-span-5">
                        <p className="text-gray 2xl:text-lg text-base font-normal antialiased leading-8 tracking-wide">
                            This certificate is issued upon the request of the patient. Thank you.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-end pt-6">
                <div className="flex flex-row items-center justify-center space-x-6">
                    <Link href="/doctor/dashboard/patient">
                        <Button type="button" className="my-button-gray" size="lg">
                            Go Back</Button>
                    </Link>
                    <Link href="/doctor/dashboard/patient/prescription">
                        <Button type="submit" className="my-button-blue" size="lg">
                            Save and Print
                            <PrinterIcon className="w-4 h-4 ml-2" /></Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MedicalCertificatePage