// Importing the function to fetch posts from the database.
import { fetchPosts } from "./db/queries/posts"; // maybe change path name later
import Link from "next/link";
// Importing a component that handles post deletion.
import PostDelete from "./__components/post-delete";

export default async function Queue() {
  const currentPatients = await fetchPosts(); // Fetching the posts from the database.
  const dateOptions: Intl.DateTimeFormatOptions = {
    // Options for formatting dates.
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-4">
        <Link
          href="/queuing/post/create"
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Queue Number
        </Link>
      </div>
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {currentPatients.map((currentPatient) => {
          // Mapping over the posts and rendering each one.
          return (
            <div
              key={currentPatient.id}
              className="border-4 border-indigo-500/50 "
            >
              <div className="mb-4">
                <h2 className={`mb-3 text-2xl font-semibold`}>Patient Info</h2>
                <p className={`m-0 max-w-[30ch] text-lg `}>
                  Patient Name: <strong>{currentPatient.name}</strong>
                </p>

                <p className={`m-0 max-w-[30ch] text-lg`}>
                  Patient Queue Number:{" "}
                  <strong>{currentPatient.spotNumber} </strong>
                  {/** please change .spotNumber to different name */}
                </p>

                <p className={`m-0 max-w-[30ch] text-lg`}>
                  Patient Queue Status:{" "}
                  <strong>{currentPatient.status} </strong>
                  {/** please change .spotNumber to different name */}
                </p>
              </div>
              <div className="text-sm opacity-30">
                {"Updated at " +
                  currentPatient.updatedAt.toLocaleDateString(
                    "en-US",
                    dateOptions
                  )}
              </div>
              <PostDelete id={currentPatient.id} />
              <Link
                key={currentPatient.id}
                href={`/queuing/post/${currentPatient.id}/edit`}
                className=""
              >
                <h2 className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded`}>
                  UPDATE PATIENT INFO
                </h2>
              </Link>
            </div>
          );
        })}
      </div>
      <Link
        href="/queuing/now_serving"
        className="mt-24 px-4 py-2 bg-amber-500 text-white rounded"
      >
        Redirect to Now Serving
      </Link>
    </main>
  );
}
