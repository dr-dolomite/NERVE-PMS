import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto h-screen">
      <div className="flex items-center h-full justify-center">
        <Link href="/doctor/dashboard/patient">
          <h1 className="font-medium">Go to Doctor Dashboard</h1>
        </Link>
      </div>
    </main>
  );
}