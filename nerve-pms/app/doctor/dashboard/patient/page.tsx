import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";

import Link from "next/link";

const data = [
    {
        patientId: "03-01-22",
        type: "History",
        chiefComplaint: "Headache",
        date: "March 1, 2022",
    },
    {
        patientId: "04-01-22",
        type: "Follow-up",
        chiefComplaint: "Headache",
        date: "April 1, 2022",
    },
    {
        patientId: "05-01-22",
        type: "Follow-up",
        chiefComplaint: "Headache",
        date: "May 1, 2022",
    },
]


const PatientPage = () => {

    const patientInfo = {
        chiefComp: "Headache",
        patientStatus: "New Patient",
        recordStatus: true,
    }

    // onClick function that will show the accordion content for History

    return (
        <>
            <div className="grid grid-cols-2 2xl:gap-x-8 gap-6">
                <Card className="w-full bg-[#eefcfd]">
                    <CardHeader>
                        <CardDescription className="text-xs">
                            Chief Complaint
                        </CardDescription>
                        <CardTitle className="text-lg">Headache</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="w-full bg-[#eefcfd]">
                    <CardHeader>
                        <CardDescription className="text-xs">
                            Patient Status
                        </CardDescription>
                        <CardTitle className="text-lg">New Patient</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            <div>
                {!patientInfo.recordStatus && (
                    <div className="mt-6 flex items-center flex-col 2xl:gap-y-6 gap-y-4">
                        <div className="text-muted-foreground italic 2xl:text-md text-base">
                            Patient record not found
                        </div>

                        <Button className="my-button-blue" size="lg" variant="default">
                            + Create New Record
                        </Button>
                    </div>
                )}

                {patientInfo.recordStatus && (
                    <Table>
                        <TableCaption>End of the list</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Patient ID</TableHead>
                                <TableHead>Record Type</TableHead>
                                <TableHead>Chief Complaint</TableHead>
                                <TableHead className="text-right">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((data) => (
                                <TableRow key={data.type}>
                                    <TableCell>{data.patientId}</TableCell>
                                    <TableCell className="font-medium hover:underline">
                                        <Link href={`/doctor/dashboard/patient/history/${data.patientId}`}>
                                            {data.type}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{data.chiefComplaint}</TableCell>
                                    <TableCell className="text-right">{data.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
            <Link href="/doctor/dashboard/patient/follow-up">
                <Button className="my-button-blue w-40" size="lg" variant="default">
                    + Add New Entry
                </Button>
            </Link>
        </>
    )
}

export default PatientPage