interface ViewSearchResultPageProps {
    patientName: string
}

import {
    Card
} from "@/components/ui/card"

import { searchPatientByName } from "@/data/get-patient-info"

const ViewSearchResultPage = async ({ patientName }: ViewSearchResultPageProps) => {

    const resultPatient = await searchPatientByName(patientName);

    return (
        <Card className="grid gap-4 p-4">
            {resultPatient.map((patient) => (
                <Card key={patient.id} className="grid gap-4 p-4">
                    <p className="text-wrap">
                        <span className="font-semibold">Name:</span> {patient.name}
                    </p>
                </Card>
            ))}

        </Card>
    )
}

export default ViewSearchResultPage