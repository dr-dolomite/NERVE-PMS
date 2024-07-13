// Importing the function to fetch posts from the database.
import { fetchPosts } from "./db/queries/posts";
import Link from "next/link";
// Importing a component that handles post deletion.
import PostDelete from "./__components/post-delete";

export default async function PatientInfo() {
  const patients = await fetchPosts(); // Fetching the posts from the database.
  const dateOptions: Intl.DateTimeFormatOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-4">
        <Link href="/crud/post/create" className="bg-white px-4 py-2 rounded">
          Create Post
        </Link>
      </div>
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {patients.map((patient) => {
          // Mapping over the posts and rendering each one.
          return (
            <div key={patient.id}>
              <div className="mb-4">
                <h2 className={`mb-3 text-2xl font-semibold`}>Patient Info</h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Name: {patient.name}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Email: {patient.email}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Address: {patient.address}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Age: {patient.age}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Gender:{patient.gender}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Birthday:{" "}
                  {new Date(patient.birthday).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Civil Status: {patient.civilStatus}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Occupation: {patient.occupation}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Handedness: {patient.handedness}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Last Visit:{" "}
                  {new Date(patient.lastVisit).toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
                </p>

                <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                  Reffered By: {patient.referredBy}
                </p>
              </div>
              <div className="text-sm opacity-30">
                {"Updated at " +
                  patient.updatedAt.toLocaleDateString("en-US", dateOptions)}
              </div>
              <PostDelete id={patient.id} />
              <Link
                key={patient.id}
                href={`/crud/post/${patient.id}/edit`}
                className=""
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  UPDATE PATIENT
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
