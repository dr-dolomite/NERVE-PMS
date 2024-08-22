import { Button } from "@/components/ui/button";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// import { 
//     ContactRound,
//  } from 'lucide-react';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const PatientPage = () => {

    const patientInfo = {
        chiefComp: "Headache",
        patientStatus: "New Patient",
        recordStatus: true,
    }

    return (
        <>

            <div className="grid grid-cols-2 2xl:gap-x-8 gap-6">
                <Card className="w-full bg-[#eefcfd]">
                    <CardHeader>
                        <CardDescription>
                            Chief Complaint
                        </CardDescription>
                        <CardTitle>Headache</CardTitle>
                    </CardHeader>
                </Card>

                <Card className="w-full bg-[#eefcfd]">
                    <CardHeader>
                        <CardDescription>
                            Patient Status
                        </CardDescription>
                        <CardTitle>New Patient</CardTitle>
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
                    <Accordion type="single" collapsible className="w-full 2xl:text-lg text-md">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>History of Present Illness</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient is a 45-year-old male who presents with a 3-day history of severe headaches.
                                        The headaches are described as throbbing and are located primarily in the frontal region.
                                        The patient reports that the pain is exacerbated by bright lights and loud noises.
                                        He has tried over-the-counter pain medications with minimal relief.
                                    </p>
                                    <p>
                                        The patient denies any recent head trauma, fever, or visual disturbances.
                                        He has a history of hypertension, which is currently managed with medication.
                                        There is no family history of migraines or other neurological conditions.
                                    </p>
                                    <p>
                                        On physical examination, the patient appears in mild distress due to pain.
                                        Vital signs are within normal limits. Neurological examination is unremarkable.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Past Medical History</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient has a history of hypertension, which is currently managed with lisinopril.
                                        He has a history of hyperlipidemia, which is managed with atorvastatin.
                                        He has a history of gastroesophageal reflux disease (GERD), which is managed with omeprazole.
                                    </p>
                                    <p>
                                        The patient has a history of tobacco use, with a 20-pack-year smoking history.
                                        He quit smoking 5 years ago. He denies alcohol or illicit drug use.
                                    </p>
                                    <p>
                                        The patient has no history of diabetes, heart disease, or cancer.
                                        He has no known drug allergies.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Family History</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient&apos;s father has a history of hypertension and heart disease.
                                        His mother has a history of diabetes and breast cancer.
                                        His sister has a history of migraines.
                                    </p>
                                    <p>
                                        The patient has 2 children who are healthy.
                                        He is married and lives with his wife and children.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Personal, Social, and Emotional History</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient is a non-smoker and consumes alcohol occasionally, primarily during social events.
                                        He works as an accountant and reports that his job is relatively sedentary but can be stressful at times.
                                        He exercises regularly, engaging in moderate physical activity such as jogging and swimming at least three times a week.
                                    </p>
                                    <p>
                                        The patient has a supportive family and a strong social network.
                                        He reports no significant emotional or psychological issues but mentions occasional stress related to work deadlines.
                                        He practices mindfulness and meditation to manage stress.
                                    </p>
                                    <p>
                                        The patient is actively involved in his community and participates in local charity events.
                                        He enjoys reading, traveling, and spending time with his family during his leisure time.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>OB-Gyne History</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient has no history of gynecological or obstetric issues. She has had regular menstrual cycles since menarche at age 13, with no history of dysmenorrhea or menorrhagia. She has had two full-term pregnancies, both resulting in uncomplicated vaginal deliveries. She has no history of miscarriages or ectopic pregnancies.
                                    </p>
                                    <p>
                                        The patient has undergone routine Pap smears, all of which have been normal. She has no history of sexually transmitted infections. She is currently using an intrauterine device (IUD) for contraception, which was placed 2 years ago without complications.
                                    </p>
                                    <p>
                                        The patient reports no history of pelvic inflammatory disease, endometriosis, or ovarian cysts. She has no family history of gynecological cancers. She performs regular breast self-examinations and has had no abnormal findings.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-6">
                            <AccordionTrigger>Physical Examination</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        On physical examination, the patient appears well-nourished and in no acute distress. Vital signs are as follows: blood pressure 130/80 mmHg, heart rate 72 beats per minute, respiratory rate 16 breaths per minute, and temperature 98.6°F.
                                    </p>
                                    <p>
                                        Head: Normocephalic and atraumatic. No signs of head trauma or tenderness.
                                    </p>
                                    <p>
                                        Eyes: Pupils are equal, round, and reactive to light and accommodation. Extraocular movements are intact. No conjunctival injection or discharge.
                                    </p>
                                    <p>
                                        Ears: Tympanic membranes are clear with no signs of infection or effusion.
                                    </p>
                                    <p>
                                        Nose: Nasal passages are clear with no signs of congestion or discharge.
                                    </p>
                                    <p>
                                        Throat: Oropharynx is clear with no erythema or exudates.
                                    </p>
                                    <p>
                                        Neck: Supple with no lymphadenopathy or thyromegaly.
                                    </p>
                                    <p>
                                        Cardiovascular: Heart sounds are normal with no murmurs, rubs, or gallops. Peripheral pulses are intact and equal bilaterally.
                                    </p>
                                    <p>
                                        Respiratory: Lungs are clear to auscultation bilaterally with no wheezes, rales, or rhonchi.
                                    </p>
                                    <p>
                                        Abdomen: Soft, non-tender, and non-distended. Bowel sounds are present and normal. No hepatosplenomegaly or masses palpated.
                                    </p>
                                    <p>
                                        Extremities: No edema, cyanosis, or clubbing. Full range of motion in all joints.
                                    </p>
                                    <p>
                                        Neurological: Alert and oriented to person, place, and time. Cranial nerves II-XII are intact. Motor and sensory functions are normal. Reflexes are 2+ and symmetric.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-7">
                            <AccordionTrigger>Neurological Examination</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient is alert and oriented to person, place, and time. Cranial nerves II-XII are intact. Motor strength is 5/5 in all extremities. Sensation is intact to light touch, pinprick, and vibration. Reflexes are 2+ and symmetric. Coordination is normal with no signs of ataxia. Gait is steady and normal.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-8">
                            <AccordionTrigger>Diagnosis</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        Based on the patient&apos;s history and physical examination, the most likely diagnosis is a primary headache disorder, specifically a migraine without aura. The patient&apos;s symptoms of severe, throbbing headaches located in the frontal region, exacerbated by bright lights and loud noises, are characteristic of migraines. The absence of red flag symptoms such as recent head trauma, fever, or visual disturbances further supports this diagnosis.
                                    </p>
                                    <p>
                                        Differential diagnoses to consider include tension-type headache, cluster headache, and secondary causes of headache such as sinusitis or hypertension. However, the patient&apos;s clinical presentation is most consistent with a migraine.
                                    </p>
                                    <p>
                                        Further evaluation and management may include lifestyle modifications, pharmacologic therapy with triptans or other migraine-specific medications, and preventive measures to reduce the frequency and severity of migraine attacks.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-9">
                            <AccordionTrigger>Plan</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    <p>
                                        The patient will be advised to maintain a headache diary to track the frequency, duration, and triggers of his headaches. Lifestyle modifications will be recommended, including regular sleep patterns, stress management techniques, and dietary changes to identify and avoid potential triggers.
                                    </p>
                                    <p>
                                        Acute treatment options for migraine attacks will be discussed, including over-the-counter pain medications, triptans, and antiemetics as needed. The patient will be educated on the appropriate use of these medications and potential side effects.
                                    </p>
                                    <p>
                                        Preventive treatment options will be considered based on the frequency and severity of the patient&apos;s headaches. These may include beta-blockers, calcium channel blockers, tricyclic antidepressants, or antiepileptic drugs. The risks and benefits of each medication will be discussed with the patient.
                                    </p>
                                    <p>
                                        Follow-up appointments will be scheduled to monitor the patient&apos;s response to treatment, adjust medications as needed, and provide ongoing support and education.
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>)}
            </div>
        </>
    )
}

export default PatientPage