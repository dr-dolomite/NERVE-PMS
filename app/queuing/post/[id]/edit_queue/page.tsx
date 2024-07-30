// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.

import { updateQueuePost } from "@/app/queuing/actions/post";
// import PostFormQueue from "@/app/queuing/__components/post-form";
import PostFormQueue from "@/app/queuing/__components/post-form-queue";
import { fetchPostById } from "@/app/queuing/db/queries/posts";

interface PostsEditProps {
  params: {
    id: string;
  };
}

// Defining a new page, server component PostsEdit
export default async function PostsEditQueue({ params }: PostsEditProps) {
  // Receives params as a prop, which includes the id of the post to be edited.
  const { id } = params;

  // Fetches the post from the database
  const post = await fetchPostById(id);

  // binds the id to the updatePost action to create an updateAction,
  const updateAction = updateQueuePost.bind(null, id);

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostFormQueue
          formAction={updateAction}
          initialData={{
            name: post?.name ?? "",
            spotNumber: post?.spotNumber ?? 0,
            status: post?.status ?? "waiting",
          }}
        />
      </div>
    </main>
  );
}
