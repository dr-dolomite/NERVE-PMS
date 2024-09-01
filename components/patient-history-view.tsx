import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface PatientHistoryViewPageProps {
    patientId: string;
}

import { getPatientHistoryById } from "@/data/get-patient-info";
import { getPatientVitalsById } from "@/data/get-patient-info";
import {
    FaThermometerHalf,
    FaHeartbeat,
    FaFillDrip,
    FaClock
} from "react-icons/fa";
import { Separator } from "./ui/separator";
import PlanDetailsPage from "./plan-notes";

const PatientHistoryViewPage = async ({ patientId }: PatientHistoryViewPageProps) => {
    const patientHist = await getPatientHistoryById(patientId);
    const patientVitals = await getPatientVitalsById(patientHist?.vitalSignsid ? patientHist?.vitalSignsid : "");
    const patientPlan = patientHist?.plan;
    const historyRecordId = patientHist?.id;

    return (
        <div className="grid grid-cols-2 grid-flow-row p-4 gap-8">
            <div className="col-span-2">
                <div className="grid 2xl:grid-cols-5 grid-cols-3 gap-4">
                    <Card className="drop-shadow-md">
                        <CardHeader className="text-center">
                            <CardDescription>
                                Blood Pressure
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center flex flex-row items-center justify-center">
                            <CardTitle className="font-bold text-[#0E313E] text-4xl">
                                {patientVitals?.bloodPressure}
                            </CardTitle>
                            <Label className="ml-2">
                                mm <br /> Hg
                            </Label>
                        </CardContent>
                    </Card>

                    <Card className="drop-shadow-md">
                        <CardHeader className="text-center">
                            <CardDescription>
                                Pulse Rate
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center flex flex-row items-center justify-center">
                            <FaHeartbeat className="size-8 mr-2 text-[#2F80ED]" />
                            <CardTitle className="font-bold text-[#0E313E] text-4xl">
                                {patientVitals?.pulseRate}
                            </CardTitle>
                            <Label className="ml-1">
                                bpm
                            </Label>
                        </CardContent>
                    </Card>

                    <Card className="drop-shadow-md">
                        <CardHeader className="text-center">
                            <CardDescription>
                                Body Temperature
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center flex flex-row items-center justify-center">
                            <FaThermometerHalf className="size-8 mr-2 text-[#2F80ED]" />
                            <CardTitle className="font-bold text-[#0E313E] text-4xl">
                                {patientVitals?.bodyTemperature}
                            </CardTitle>
                            <Label className="ml-1">
                                °C
                            </Label>
                        </CardContent>
                    </Card>

                    <Card className="drop-shadow-md">
                        <CardHeader className="text-center">
                            <CardDescription>
                                Oxygen Saturation
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center flex flex-row items-center justify-center">
                            <FaFillDrip className="size-8 mr-2 text-[#2F80ED]" />
                            <CardTitle className="font-bold text-[#0E313E] text-4xl">
                                {patientVitals?.oxygen}
                            </CardTitle>
                            <Label className="ml-1">
                                mm Hg
                            </Label>
                        </CardContent>
                    </Card>

                    <Card className="drop-shadow-md">
                        <CardHeader className="text-center">
                            <CardDescription>
                                Weight
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center flex flex-row items-center justify-center">
                            <FaClock className="size-8 mr-2 text-[#2F80ED]" />
                            <CardTitle className="font-bold text-[#0E313E] text-4xl">
                                {patientVitals?.weight}
                            </CardTitle>
                            <Label className="ml-1">
                                kl
                            </Label>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator className="col-span-2" />

            <div className="col-span-2 grid 2xl:grid-cols-3 grid-cols-2 grid-flow-row gap-6 gap-x-12">
                <div className="2xl:col-span-2 col-span-1 flex flex-col gap-2">
                    <div className="flex shrink-0">
                        <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                            Chief Complaint:
                        </Label>
                    </div>

                    <p className="text-wrap">
                        {patientHist?.chiefComplaint}
                    </p>
                </div>

                <div className="col-span-1 flex flex-col gap-2">
                    <div className="flex shrink-0">
                        <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                            Referred By:
                        </Label>
                    </div>
                    <p className="text-wrap">
                        {patientHist?.referredBy}
                    </p>
                </div>
            </div>
            <Separator className="col-span-2 mt-4" />
            
            <div className="col-span-2">
                <PlanDetailsPage plan={patientPlan || ""} recordId={historyRecordId || ""} />
            </div>

            <Separator className="col-span-2 mt-4" />
            <div className="col-span-2 flex flex-col gap-2 ">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        History of Present Illness:
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.historyOfPresentIllness}
                </p>
            </div>

            <div className="col-span-2 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        Past Medical History:
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.pastMedicalHistory}
                </p>
            </div>
            <Separator className="col-span-2 mb-4" />

            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        Family History
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.familyHistory}
                </p>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        Personal, Social, and Emotional History
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.personalSocialHistory}
                </p>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        OB-GYNE History
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.obgyneHistory}
                </p>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        Neurological Examination
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.neurologicalExamination}
                </p>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        Physical Examination
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.physicalExamination}
                </p>
            </div>

            <div className="col-span-1 flex flex-col gap-2">
                <div className="flex shrink-0">
                    <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                        Treatment Plan
                    </Label>
                </div>
                <p className="text-wrap">
                    {patientHist?.treatmentPlan}
                </p>
            </div>
        </div>
    )
}

export default PatientHistoryViewPage