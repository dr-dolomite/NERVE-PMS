import { Label } from "@/components/ui/label";

interface PlanNotesProps {
    plan: string;
    recordId: string;
}

import { getFollowUpPlanById } from "@/data/get-patient-info";

const PlanDetailsPage = async ({ plan, recordId }: PlanNotesProps) => {

    if (plan === "follow-up") {
        const followUpPlanRecord = await getFollowUpPlanById(recordId);
        console.log(plan);
        console.log(recordId);
        console.log(followUpPlanRecord);
        return (
            <div className="grid 2xl:grid-cols-5 grid-cols-4 grid-flow-row gap-4">

                <div className="col-span-1 flex flex-col gap-2">
                    <div className="flex shrink-0">
                        <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                            Plan Type
                        </Label>
                    </div>

                    <p className="text-wrap">
                        Follow-up
                    </p>
                </div>

                <div className="2xl:col-span-2 col-span-1 flex flex-col gap-2">
                    <div className="flex shrink-0">
                        <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                            Plan Scheduled Visit
                        </Label>
                    </div>

                    <p className="text-wrap">
                        {followUpPlanRecord?.nextVisit?.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="col-span-2 flex flex-col gap-2">
                    <div className="flex shrink-0">
                        <Label className="font-semibold bg-[#2F80ED] p-3 text-white">
                            Plan Notes
                        </Label>
                    </div>

                    <p className="text-wrap">
                        {followUpPlanRecord?.followUpNotes}
                    </p>
                </div>
            </div>

        );
    }
}

export default PlanDetailsPage