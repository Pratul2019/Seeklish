import type { Metadata } from "next";

export const metadata: Metadata ={
  title: {
    default: "Profile",
    template: "Seeklish | %s",
  },
  description: "Manage Your Profile",
}

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>      
      <main className="mt-2">{children}</main>
    </section>
  );
}
