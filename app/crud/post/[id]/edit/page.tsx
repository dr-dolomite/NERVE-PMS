// src/app/posts/[id]/edit/page.tsx
// The [id] in the folder name indicates that this is a dynamic route, corresponding to a specific post ID.

import { updatePost } from "@/app/crud/actions/post";
import PostForm from "@/app/crud/__components/post-form";
import { fetchPostById } from "@/app/crud/db/queries/posts";

interface PostsEditProps {
  params: {
    id: string;
  };
}

// Defining a new page, server component PostsEdit
export default async function PostsEdit({ params }: PostsEditProps) {
  // Receives params as a prop, which includes the id of the post to be edited.
  const { id } = params;

  // Fetches the post from the database
  const post = await fetchPostById(id);

  // binds the id to the updatePost action to create an updateAction,
  const updateAction = updatePost.bind(null, id);

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostForm
          formAction={updateAction}
          initialData={{
            // title: post?.name ?? "",
            // content: post?.address ?? "",
            name: post?.name ?? "",
            email: post?.email ?? "",
            address: post?.address ?? "",
            age: post?.age ?? 0, // Ensure age is a number
            gender: post?.gender ?? "",
            birthday: post?.birthday ?? new Date(), // Ensure it's a Date object
            civilStatus: post?.civilStatus ?? "",
            occupation: post?.occupation ?? "",
            handedness: post?.handedness ?? "",
            lastVisit: post?.lastVisit ?? new Date(), // Ensure it's a Date object
            referredBy: post?.referredBy ?? "",
          }}
        />
      </div>
    </main>
  );
}
