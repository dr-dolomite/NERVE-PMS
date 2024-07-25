"use client"; // Mark this component as a client component
import Link from "next/link";
import React, { useState } from "react";

interface Patient {
  id: string;
  name: string;
  spotNumber: number; // Ensure this field name is correct
  status: string;
}

interface NowServingClientProps {
  currentPatients: Patient[];
}

const NowServingClient: React.FC<NowServingClientProps> = ({
  currentPatients,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Use null for default value

  const handleNextPatient = () => {
    if (currentIndex === null) {
      setCurrentIndex(0); // Show the first patient when button is clicked
    } else if (currentIndex < currentPatients.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentPatient =
    currentIndex !== null ? currentPatients[currentIndex] : null;

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <div>
          <div className="mb-4">
            <h2 className={`mb-3 text-2xl font-semibold`}>Now Serving</h2>
            <p className={`mb-3 text-xl font-normal`}>
              Patient Name: {currentPatient ? currentPatient.name : "----"}
            </p>
            <p className={`mb-3 text-xl font-normal`}>
              Patient Queue Number:{" "}
              {currentPatient ? currentPatient.spotNumber : "----"}
            </p>

            <p className={`mb-3 text-xl font-normal`}>
              Patient Status: {currentPatient ? currentPatient.status : "----"}
            </p>

            <select
              id="status"
              name="status"
              // defaultValue={currentPatient.status}
              defaultValue={currentPatient?.status}
              className="rounded p-2 w-full"
            >
              <option value="waiting">Waiting</option>
              <option value="onGoing">On Going Checkup</option>
              <option value="finished">Finished Checkup</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-14">
        {currentIndex === null || currentIndex < currentPatients.length - 1 ? (
          <button
            onClick={handleNextPatient}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next Patient
          </button>
        ) : null}

        <button
          onClick={() => console.log("Click is working")}
          className="mt-4 px-4 py-2 bg-slate-500 text-white rounded"
        >
          Notify
        </button>
      </div>

      <Link
        href="/queuing"
        className="mt-24 px-4 py-2 bg-amber-500 text-white rounded"
      >
        Redirect to Now Serving
      </Link>
    </main>
  );
};

export default NowServingClient;

// **********************************************************
// July 25, 2024

// "use client"; // Mark this component as a client component
// import Link from "next/link";
// import React, { useState } from "react";
// import { redirect } from "next/navigation";
// import { z } from "zod";
// //import { db } from '@/app/queuing/db';
// import { db } from "@/lib/db";

// import { revalidatePath } from "next/cache";

// interface Patient {
//   id: string;
//   name: string;
//   spotNumber: number; // Ensure this field name is correct
//   status: string;
// }

// interface NowServingClientProps {
//   currentPatients: Patient[];
// }

// export default function NowServingClient({
//   currentPatients,
// }: NowServingClientProps) {
//   const [currentIndex, setCurrentIndex] = useState<number | null>(null); // Use null for default value
//   const [currentStatus, setCurrentStatus] = useState<string | null>(null);

//   const handleNextPatient = () => {
//     if (currentIndex === null) {
//       setCurrentIndex(0); // Show the first patient when button is clicked
//     } else if (currentIndex < currentPatients.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//     setCurrentStatus(null);
//   };

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setCurrentStatus(event.target.value);
//   };

//   const handleStatusUpdate = async (event: React.FormEvent) => {
//     event.preventDefault();
//     if (currentPatient && currentStatus) {
//       try {
//         await db.queueNumber.update({
//           where: { id: currentPatient.id },
//           data: { status: currentStatus },
//         });

//         revalidatePath("/queuing");
//         redirect("/queuing");
//       } catch (error: unknown) {
//         console.error("Error updating status:", error);
//       }
//     }
//   };

//   const currentPatient =
//     currentIndex !== null ? currentPatients[currentIndex] : null;

//   return (
//     <main className="flex min-h-screen flex-col items-start p-24">
//       <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <div>
//           <div className="mb-4">
//             <h2 className={`mb-3 text-2xl font-semibold`}>Now Serving</h2>
//             <p className={`mb-3 text-xl font-normal`}>
//               Patient Name: {currentPatient ? currentPatient.name : "----"}
//             </p>
//             <p className={`mb-3 text-xl font-normal`}>
//               Patient Queue Number:{" "}
//               {currentPatient ? currentPatient.spotNumber : "----"}
//             </p>

//             <p className={`mb-3 text-xl font-normal`}>
//               Patient Status: {currentPatient ? currentPatient.status : "----"}
//             </p>

//             {/* {currentPatient && (
//               <form onSubmit={handleStatusUpdate}>
//                 <select
//                   id="status"
//                   name="status"
//                   value={currentStatus ?? currentPatient.status}
//                   onChange={handleStatusChange}
//                   className="rounded p-2 w-full"
//                 >
//                   <option value="" disabled>
//                     -- select an option --
//                   </option>
//                   <option value="Waiting">Waiting</option>
//                   <option value="On Going Checkup">On Going Checkup</option>
//                   <option value="Finished Checkup">Finished Checkup</option>
//                 </select>

//                 {currentPatient &&
//                   currentStatus &&
//                   currentStatus !== currentPatient.status && (
//                     <button
//                       type="submit"
//                       className="mt-4 px-4 py-2 bg-slate-500 text-white rounded"
//                     >
//                       Update Status
//                     </button>
//                   )}
//               </form>
//             )} */}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row space-x-14">
//         {currentIndex === null || currentIndex < currentPatients.length - 1 ? (
//           <button
//             onClick={handleNextPatient}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
//           >
//             Next Patient
//           </button>
//         ) : null}
//       </div>

//       <button
//         onClick={() => console.log("Click is working")}
//         className="mt-12 px-4 py-2 bg-slate-500 text-white rounded"
//       >
//         Notify
//       </button>

//       <Link
//         href="/queuing"
//         className="mt-24 px-4 py-2 bg-amber-500 text-white rounded"
//       >
//         Redirect to Now Serving
//       </Link>
//     </main>
//   );
// }
