import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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
    <SessionProvider session={session}>
      <html lang="en">
        <body className={Baskerv.className}>
          <main>{children}</main>
        </body>
      </html>
    </SessionProvider>
  );
}
