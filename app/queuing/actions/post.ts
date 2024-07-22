// src/app/actions/posts.ts

// this is a server action
'use server'

// Import the database client and the Post type from Prisma
import { db } from '@/lib/db'
import type { QueueNumber } from '@prisma/client'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the post using Zod
const postSchema = z.object({
    name: z.string(),
})

// Define an interface for the form state
interface PostFormState {
    errors: {
        name?: string[];
        _form?: string[]; // Optional general form-level errors
    }
}

// Define an asynchronous function to create a post
export async function createPost(
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
     const result = postSchema.safeParse({
        name: formData.get('name') as string, // Asserting as string
      
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure 
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let post:  QueueNumber 
    try {
        // If validation passes, create a new post in the database
        post = await db.queueNumber.create({
            data: {
                //title: result.data.title,
                // content: result.data.content,
                name: result.data.name,
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
    revalidatePath('/queuing')
    redirect('/queuing')
}

export async function updatePost(
    id: string,
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    const result = postSchema.safeParse({
        name: formData.get('name') as string, // Asserting as string
        spotNumber: formData.get('spotNumber') as string, // Asserting as string
       
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: QueueNumber
    try {
        post = await db.queueNumber.update({
            where: { id },
            data: {
                // title: result.data.title,
                // content: result.data.content,
                name: result.data.name,
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

    revalidatePath('/queuing')
    redirect('/queuing')
}

export async function deletePost(
    id: string,
): Promise<PostFormState> {
    let post:  QueueNumber 
    try {
        post = await db.queueNumber.delete({
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

    revalidatePath('/queuing')
    redirect('/queuing')
}