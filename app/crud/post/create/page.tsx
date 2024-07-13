// src/app/posts/create/page.tsx
import { createPost } from "../../actions/post";
import PostForm from "../../__components/post-form";

// create a new server component PostsCreate.
export default function PostsCreate() {
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <PostForm
          formAction={createPost}
          initialData={{
            name: "",
            email: "",
            address: "",
            age: 0,
            gender: "",
            birthday: new Date(),
            civilStatus: "",
            occupation: "",
            handedness: "",
            lastVisit: new Date(),
            referredBy: "",
          }}
        />
      </div>
    </main>
  );
}
// name: string;
//     email?: string;
//     address: string;
//     age: number;
//     gender: string;
//     birthday: Date;
//     civilStatus: string;
//     occupation: string;
//     handedness: string;
//     lastVisit: Date;
//     referredBy: string;
