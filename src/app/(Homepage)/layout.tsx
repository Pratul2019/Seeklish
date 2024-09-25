import { Metadata } from "next";
import Header from "./(Components)/Header";
import Footer from "./(Components)/Footer";

export const metadata: Metadata = {
  title: {
    default: "Self Experiences",
    template: "Seeklish | %s",
  },
  description: "",
};

export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen">
      <nav>
        <Header />
      </nav>

      <main className="flex-grow">{children}</main>

      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </section>
  );
}
