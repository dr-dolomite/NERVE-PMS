
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";

import { getPatientVitalsById } from "@/data/get-patient-info";
import { getPatientFollowUpById } from "@/data/get-patient-info";
import { TbGaugeFilled } from "react-icons/tb";

import {
    FaThermometerHalf,
    FaHeartbeat,
    FaFillDrip,
    FaClock
} from "react-icons/fa";
import { Separator } from "./ui/separator";
import PlanDetailsPage from "./plan-notes";

interface FollowUpViewProps {
    followUpId: string;
    vitalsId: string;
}

const FollowUpViewPage = async ({ vitalsId, followUpId }: FollowUpViewProps) => {

    const patientVitals = await getPatientVitalsById(vitalsId);
    const patientFollowUp = await getPatientFollowUpById(followUpId);
    const patientPlan = patientFollowUp?.plan;
    const followUpRecordId = patientFollowUp?.id;

    return (
        <div className="grid grid-cols-2 grid-flow-row gap-6 gap-y-8 p-4">
            <div className="col-span-2">
                <Card className="p-4 grid grid-cols-3 grid-flow-row gap-6 drop-shadow-md">
                    <div className="flex flex-row 2xl:gap-x-6 gap-x-4 items-center">
                        <h1 className="font-medium">
                            Blood Pressure
                        </h1>
                        <p className="flex flex-row items-center 2xl:gap-x-2 gap-x-1">
                            <TbGaugeFilled className="size-4 text-[#2F80ED]" />
                            <span className="font-medium">
                                {patientVitals?.bloodPressure}
                            </span>
                            mmHg
                        </p>
                    </div>

                    <div className="flex flex-row 2xl:gap-x-6 gap-x-4 items-center">
                        <h1 className="font-medium">
                            Pulse Rate
                        </h1>
                        <p className="flex flex-row items-center 2xl:gap-x-2 gap-x-1">
                            <FaHeartbeat className="size-4 text-[#2F80ED]" />
                            <span className="font-medium">
                                {patientVitals?.pulseRate}
                            </span>
                            bpm
                        </p>
                    </div>

                    <div className="flex flex-row 2xl:gap-x-6 gap-x-4 items-center">
                        <h1 className="font-medium">
                            Body Temperature
                        </h1>
                        <p className="flex flex-row items-center 2xl:gap-x-2 gap-x-1">
                            <FaThermometerHalf className="size-4 text-[#2F80ED]" />
                            <span className="font-medium">
                                {patientVitals?.bodyTemperature}
                            </span>
                            °C
                        </p>
                    </div>

                    <div className="flex flex-row 2xl:gap-x-6 gap-x-4 items-center">
                        <h1 className="font-medium">
                            Oxygen Saturation
                        </h1>
                        <p className="flex flex-row items-center 2xl:gap-x-2 gap-x-1">
                            <FaFillDrip className="size-4 text-[#2F80ED]" />
                            <span className="font-medium">
                                {patientVitals?.oxygen}
                            </span>
                            %
                        </p>
                    </div>

                    <div className="flex flex-row 2xl:gap-x-6 gap-x-4 items-center">
                        <h1 className="font-medium">
                            Weight
                        </h1>
                        <p className="flex flex-row items-center 2xl:gap-x-2 gap-x-1">
                            <FaClock className="size-4 text-[#2F80ED]" />
                            <span className="font-medium">
                                {patientVitals?.weight}
                            </span>
                            kg
                        </p>
                    </div>
                </Card>
            </div>

            <div className="col-span-2">
                <div className="grid grid-cols-3 grid-flow-row gap-6 ">
                    {/* Left Side */}
                    <div className="col-span-1 flex flex-row gap-x-4">
                        <Card className="col-span-1 flex flex-col gap-2 p-4 drop-shadow-md">
                            <div className="flex shrink-0">
                                <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                                    Laboratory Result
                                </Label>
                            </div>
                            <p className="text-wrap">
                                {patientFollowUp?.labResults}
                            </p>
                        </Card>
                        <Separator orientation="vertical"/>
                    </div>

                    {/* Right Side */}
                    <div className="col-span-2 grid grid-cols-2 grid-flow-row gap-6">
                        <Card className="col-span-1 flex flex-col gap-2 p-4 drop-shadow-md">
                            <div className="flex shrink-0">
                                <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                                    S/O
                                </Label>
                            </div>
                            <p className="text-wrap">
                                {patientFollowUp?.so}
                            </p>
                        </Card>

                        <Card className="col-span-1 flex flex-col gap-2 p-4 drop-shadow-md">
                            <div className="flex shrink-0">
                                <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                                    Diagnosis
                                </Label>
                            </div>
                            <p className="text-wrap">
                                {patientFollowUp?.diagnosis}
                            </p>
                        </Card>

                        <Card className="col-span-1 flex flex-col gap-2 p-4 drop-shadow-md">
                            <div className="flex shrink-0">
                                <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                                    Treatment Plan
                                </Label>
                            </div>
                            <p className="text-wrap">
                                {patientFollowUp?.treatment}
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
            <Separator className="col-span-2" />
            <div className="col-span-2">
                <PlanDetailsPage plan={patientPlan || ""} recordId={followUpRecordId || ""} />
            </div>
        </div>
    )
}

export default FollowUpViewPage