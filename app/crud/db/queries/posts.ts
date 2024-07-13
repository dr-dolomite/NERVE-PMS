
// src/db/queries/posts.ts

import type { Patient } from '@prisma/client' // Importing the Post type from the Prisma client library.
import { db } from '@/lib/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchPosts(): Promise<Patient[]> {  // Function to fetch all posts from the database.
    return await db.patient.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            }
        ],
    })
}

export async function fetchPostById(id: string): Promise<Patient | null> { // Function to fetch a single post by its ID.
    const post = await db.patient.findFirst({
        where: {
            id
        }
    })

    if (!post) {
        notFound() // If the post is not found, a 404 error is thrown.
    }

    return post
}