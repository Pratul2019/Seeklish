import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: "Seeklish",
    template: "%s | Seeklish",
  },
  description: "Explore your New City",
};

const Baskerv = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={Baskerv.className}>
        <SessionProvider session={session}>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}