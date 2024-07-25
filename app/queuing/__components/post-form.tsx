// this is a client component
"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

// Define the shape of the form errors
interface FormErrors {
  name?: string[];
  spotNumber?: string[];
  status?: string[];
}

// Define the shape of the form state
interface FormState {
  errors: FormErrors;
}

// Define the props that the PostForm component expects
interface PostFormProps {
  formAction: any; // The action to perform when the form is submitted
  initialData: {
    // The initial data for the form fields
    name: string;
    spotNumber: number;
    status: string;
  };
}

// The formAction is the action to perform when the form is submitted. We use it as a props because
// we will use this for create and edit page which both page doesn't have the same action
// The initialData is the initial data for the form fields.
export default function PostForm({ formAction, initialData }: PostFormProps) {
  // Initialize the form state and action
  const [formState, action] = useFormState<FormState>(formAction, {
    errors: {},
  });

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        {initialData.name ? "Update" : "Create"} Post
      </h1>
      <form action={action}>
        <div className="w-96">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Patient Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={initialData.name}
              className="rounded p-2 w-full"
            />
            {formState.errors.name && (
              <div className="text-red-500">
                {formState.errors.name?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block mb-2">
              Status of Patient in Queue: {/* {initialData.status} */}
            </label>
            <select
              id="status"
              name="status"
              defaultValue={initialData.status}
              className="rounded p-2 w-full"
            >
              <option value="" disabled={true}>
                Select Status of Patient in Queue
              </option>
              <option value="Waiting">Waiting</option>
              <option value="On Going Checkup">On Going Checkup</option>
              <option value="Finished Checkup">Finished Checkup</option>
              {/* <option value="waiting">Waiting</option>
              <option value="onGoing">On Going Checkup</option>
              <option value="finished">Finished Checkup</option> */}
            </select>
            {formState.errors.status && (
              <div className="text-red-500">
                {formState.errors.status?.join(", ")}
              </div>
            )}
          </div>

          {/* <div className="mb-4">
            <label htmlFor="spotNumber" className="block mb-2">
              Queue Number
            </label>
            <input
              type="number"
              id="spotNumber"
              name="spotNumber"
              defaultValue={initialData.spotNumber}
              className="rounded p-2 w-full"
            />
            {formState.errors.spotNumber && (
              <div className="text-red-500">
                {formState.errors.spotNumber?.join(", ")}
              </div>
            )}
          </div> */}

          <div className="mb-4">
            <button type="submit" className="bg-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <Link href="/queuing" className="bg-transparent px-4 py-2 rounded">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
