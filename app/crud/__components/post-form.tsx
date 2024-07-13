// src/components/post-form.tsx

// this is a client component
"use client";

import Link from "next/link";
import { useFormState } from "react-dom";

// Define the shape of the form errors
interface FormErrors {
  name?: string[];
  email?: string[];
  address?: string[];
  age?: string[];
  gender?: string[];
  birthday?: string[];
  civilStatus?: string[];
  occupation?: string[];
  handedness?: string[];
  lastVisit?: string[];
  referredBy?: string[];
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
    email?: string;
    address: string;
    age: number;
    gender: string;
    birthday: Date;
    civilStatus: string;
    occupation: string;
    handedness: string;
    lastVisit: Date;
    referredBy: string;
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
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              defaultValue={initialData.email}
              className="rounded p-2 w-full"
            />
            {formState.errors.email && (
              <div className="text-red-500">
                {formState.errors.email?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={initialData.address}
              className="rounded p-2 w-full"
            />
            {formState.errors.address && (
              <div className="text-red-500">
                {formState.errors.address?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="age" className="block mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              defaultValue={initialData.age}
              className="rounded p-2 w-full"
            />
            {formState.errors.age && (
              <div className="text-red-500">
                {formState.errors.age?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block mb-2">
              Sex
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue={initialData.gender}
              //onChange={handleChange}
              className="rounded p-2 w-full"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formState.errors.gender && (
              <div className="text-red-500">
                {formState.errors.gender?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="birthday" className="block mb-2">
              Birthday
            </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              defaultValue={initialData.birthday.toISOString().substring(0, 10)}
              className="rounded p-2 w-full"
            />
            {formState.errors.birthday && (
              <div className="text-red-500">
                {formState.errors.birthday?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="civilStatus" className="block mb-2">
              Civil Status
            </label>
            <input
              type="text"
              id="civilStatus"
              name="civilStatus"
              defaultValue={initialData.civilStatus}
              className="rounded p-2 w-full"
            />
            {formState.errors.civilStatus && (
              <div className="text-red-500">
                {formState.errors.civilStatus?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="occupation" className="block mb-2">
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              defaultValue={initialData.occupation}
              className="rounded p-2 w-full"
            />
            {formState.errors.occupation && (
              <div className="text-red-500">
                {formState.errors.occupation?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="handedness" className="block mb-2">
              Handedness
            </label>
            <select
              id="handedness"
              name="handedness"
              defaultValue={initialData.handedness}
              className="rounded p-2 w-full"
            >
              <option value="right">Right</option>
              <option value="left">Left</option>
              <option value="ambidextrous">Ambidextrous</option>
            </select>
            {formState.errors.handedness && (
              <div className="text-red-500">
                {formState.errors.handedness?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="lastVisit" className="block mb-2">
              Last Visit
            </label>
            <input
              type="date"
              id="lastVisit"
              name="lastVisit"
              defaultValue={initialData.lastVisit
                .toISOString()
                .substring(0, 10)}
              className="rounded p-2 w-full"
            />
            {formState.errors.lastVisit && (
              <div className="text-red-500">
                {formState.errors.lastVisit?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="referredBy" className="block mb-2">
              Reffered By
            </label>
            <input
              type="text"
              id="referredBy"
              name="referredBy"
              defaultValue={initialData.referredBy}
              className="rounded p-2 w-full"
            />
            {formState.errors.referredBy && (
              <div className="text-red-500">
                {formState.errors.referredBy?.join(", ")}
              </div>
            )}
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-white px-4 py-2 rounded mr-2">
              Save
            </button>
            <Link href="/crud" className="bg-transparent px-4 py-2 rounded">
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
