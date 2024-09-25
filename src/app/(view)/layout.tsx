import type { Metadata } from "next";
import Header from "./(Components)/Header";

export const metadata: Metadata = {
  title: {
    default: "Explore your City",
    template: "%s | Seeklish",
  },
  description: "Explore different aspects of your city.",
};

export default async function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-20 backdrop-filter backdrop-blur-lg ">
        <div className="max-w-7xl mx-auto ">
          <Header />
        </div>
      </header>

      <main className="flex-1 md:mt-[calc(4rem)] mb-[calc(4rem)] px-2 mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
