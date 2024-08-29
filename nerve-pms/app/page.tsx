import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-12 items-center justify-center leading-snug bg-white h-screen w-full">
      <h1 className="font-bold text-[#292D32] text-8xl">
        We always care.
      </h1>

      <Button asChild size="lg" className="my-button-blue">
        <Link href="/login">
          Get Started with NERVE
          <ArrowRight className="size-4 ml-2"/>
        </Link>
      </Button>
    </main>

  );
}