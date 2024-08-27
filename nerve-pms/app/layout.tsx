import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { SessionProvider, useSession } from "next-auth/react";
import { auth } from "@/auth";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Nerve PMS",
  description: "A patient record management system.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await auth();

  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
    </SessionProvider>
  );
}
