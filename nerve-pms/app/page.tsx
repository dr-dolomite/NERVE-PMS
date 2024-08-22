import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen w-full">
      <Link href="/login">
      <Button className="my-button-blue" size="lg">
        Go to Login
      </Button>
      </Link>
    </main>

  );
}