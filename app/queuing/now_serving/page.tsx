import { getCurrentPatients } from "./lib/getCurrentPatients";
import NowServingClient from "./NowServingClient";

export default async function NowServing() {
  const currentPatients = await getCurrentPatients(); // Fetching the posts from the database.

  return <NowServingClient currentPatients={currentPatients} />;
}

// import React, { useState } from "react";

// // Importing the function to fetch posts from the database.
// import { fetchPosts } from "../db/queries/posts";
// import Link from "next/link";

// export default async function NowServing() {
//   const currentPatients = await fetchPosts(); // Fetching the posts from the database.
//   const dateOptions: Intl.DateTimeFormatOptions = {
//     // Options for formatting dates.
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };

//   return (
//     <main className="flex min-h-screen flex-col items-start p-24">
//       <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         {currentPatients.map((currentPatient) => {
//           // Mapping over the posts and rendering each one.
//           return (
//             <div key={currentPatient.id}>
//               <div className="mb-4">
//                 <h2 className={`mb-3 text-2xl font-semibold`}>Now Serving</h2>
//                 <p className={`mb-3 text-xl font-normal`}>
//                   Patient Name: {currentPatient.name}
//                 </p>
//                 <p className={`mb-3 text-xl font-normal`}>
//                   Patient Queue Number: {currentPatient.spotNumber}{" "}
//                   {/** please change .spotNumber to different name */}
//                 </p>
//               </div>

//               {/* <PostDelete id={currentPatient.id} /> */}
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// }
