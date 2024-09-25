import type { Metadata } from "next";
import Header from "./(ProfileUpload)/Header";

export const metadata: Metadata = {
  title: {
    default: "Share",
    template: "%s | Seeklish",
  },
  description: "Share with your community.",
};

export default async function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="min-w-96 max-w-2xl bg-header  rounded-3xl shadow-lg overflow-hidden">
        <header className="bg-header border-b border-gray-500  p-6 text-center">
          <Header />
        </header>
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
}
