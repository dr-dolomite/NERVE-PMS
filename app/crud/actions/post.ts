// src/app/actions/posts.ts

// this is a server action
'use server'

// Import the database client and the Post type from Prisma
import { db } from '@/lib/db'
import type { Patient } from '@prisma/client'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the post using Zod
const postSchema = z.object({
    // // the title must be a string between 3 and 255 characters
    // title: z.string().min(3).max(255),
    // // the content must be a string between 10 and 4000 characters
    // content: z.string().min(10).max(4000),

    name: z.string(),
    email: z.string().optional(), // Optional field
    address: z.string(),
    age: z.number().int(), // Assuming age is an integer
    gender: z.string(),
    birthday: z.date(), // Assuming birthday is a date
    civilStatus: z.string(),
    occupation: z.string(),
    handedness: z.string(),
    lastVisit: z.date(), // Assuming lastVisit is a date
    referredBy: z.string(),
})

// Define an interface for the form state
interface PostFormState {
    errors: {
        // title?: string[],
        // content?: string[],
        // _form?: string[],
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
        _form?: string[]; // Optional general form-level errors
    }
}

// Define an asynchronous function to create a post
export async function createPost(
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // Validate the form data against the post schema
    // If the form data does not match the schema, the safeParse method returns an object 
    // with a success property of false and an error property containing the validation errors. 
    // If the form data matches the schema, the safeParse method returns an object 
    // with a success property of true and a data property containing the validated data. 
    const result = postSchema.safeParse({
        // title: formData.get('title'),
        // content: formData.get('content'),
        name: formData.get('name') as string, // Asserting as string
        email: formData.get('email') as string | undefined, // Asserting as string or undefined
        address: formData.get('address') as string, // Asserting as string
        age: parseInt(formData.get('age') as string), // Parsing and asserting as string
        gender: formData.get('gender') as string, // Asserting as string
        birthday: formData.get('birthday') ? new Date(formData.get('birthday') as string) : new Date(), // Null check and parsing as date
        civilStatus: formData.get('civilStatus') as string, // Asserting as string
        occupation: formData.get('occupation') as string, // Asserting as string
        handedness: formData.get('handedness') as string, // Asserting as string
        lastVisit: formData.get('lastVisit') ? new Date(formData.get('lastVisit') as string) : new Date(), // Null check and parsing as date
        referredBy: formData.get('referredBy') as string, // Asserting as string
      
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure 
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Patient
    try {
        // If validation passes, create a new post in the database
        post = await db.patient.create({
            data: {
                //title: result.data.title,
                // content: result.data.content,
                name: result.data.name,
                email: result.data.email,
                address: result.data.address,
                age: result.data.age,
                gender: result.data.gender,
                birthday: result.data.birthday,
                civilStatus: result.data.civilStatus,
                occupation: result.data.occupation,
                handedness: result.data.handedness,
                lastVisit: result.data.lastVisit,
                referredBy: result.data.referredBy,
            }
        })
    } catch (error: unknown) {
        // If there's an error, return it
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Revalidate the path and redirect to the "/crud" directory
    revalidatePath('/crud')
    redirect('/crud')
}

export async function updatePost(
    id: string,
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const result = postSchema.safeParse({
        // title: formData.get('title'),
        // content: formData.get('content'),
        name: formData.get('name') as string, // Asserting as string
        email: formData.get('email') as string | undefined, // Asserting as string or undefined
        address: formData.get('address') as string, // Asserting as string
        age: parseInt(formData.get('age') as string), // Parsing and asserting as string
        gender: formData.get('gender') as string, // Asserting as string
        birthday: formData.get('birthday') ? new Date(formData.get('birthday') as string) : new Date(), // Null check and parsing as date
        civilStatus: formData.get('civilStatus') as string, // Asserting as string
        occupation: formData.get('occupation') as string, // Asserting as string
        handedness: formData.get('handedness') as string, // Asserting as string
        lastVisit: formData.get('lastVisit') ? new Date(formData.get('lastVisit') as string) : new Date(), // Null check and parsing as date
        referredBy: formData.get('referredBy') as string, // Asserting as string
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Patient
    try {
        post = await db.patient.update({
            where: { id },
            data: {
                // title: result.data.title,
                // content: result.data.content,
                name: result.data.name,
                email: result.data.email,
                address: result.data.address,
                age: result.data.age,
                gender: result.data.gender,
                birthday: result.data.birthday,
                civilStatus: result.data.civilStatus,
                occupation: result.data.occupation,
                handedness: result.data.handedness,
                lastVisit: result.data.lastVisit,
                referredBy: result.data.referredBy,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/crud')
    redirect('/crud')
}

export async function deletePost(
    id: string,
): Promise<PostFormState> {
    let post: Patient
    try {
        post = await db.patient.delete({
            where: { id },
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    revalidatePath('/crud')
    redirect('/crud')
}