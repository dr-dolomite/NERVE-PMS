
// src/db/queries/posts.ts

import type { QueueNumber } from '@prisma/client'// Importing the Post type from the Prisma client library.
import { db } from '@/lib/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchPosts(): Promise< QueueNumber[]> {  // Function to fetch all posts from the database.
    return await db.queueNumber.findMany({
        orderBy: [
            {
                // updatedAt: 'desc',
                updatedAt: 'asc',
            }
        ],
    })
}

export async function fetchPostById(id: string): Promise< QueueNumber | null> { // Function to fetch a single post by its ID.
    const post = await db.queueNumber.findFirst({
        where: {
            id
        }
    })

    if (!post) {
        notFound() // If the post is not found, a 404 error is thrown.
    }

    return post
}