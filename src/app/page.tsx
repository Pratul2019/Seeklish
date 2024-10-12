import { auth } from "@/auth";
import HomeCard from "@/Components/Comp_Indv/Homecard";
import { Cookie } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import { HiHomeModern } from "react-icons/hi2";
import { MdAppShortcut } from "react-icons/md";
import { SiWpexplorer } from "react-icons/si";
import Uploadfunction from "../../public/Uploadfunction.jpg";
import LoggingButton from "@/Components/Comp_Indv/LoggingButton";
import Application from "../../public/Application.jpeg";
import globe from "../../public/globe.jpeg";
import rentals from "../../public/rentals.jpeg";
import Footer from "./(Homepage)/(Components)/Footer";

const Cookies = Cookie({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return redirect("/discover");
  }

  return (
    <main className="w-full h-full min-h-screen flex flex-col gap-24 bg-light">
      <div className={`${Cookies.className} flex justify-center`}>
        <h1 className="p-2  text-6xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-gray-700">
          Seeklish
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center  p-4">
        <div className="max-w-4xl mx-auto text-center animate-fadeIn">
          <h1 className="text-xl md:text-2xl font-bold mb-6 ">
            Your One-Stop Guide to Effortless Travel
          </h1>

          <div className="shadow-teal-800 flex flex-col gap-4 text-base md:text-lg backdrop-blur-lg rounded-2xl p-6 shadow-xl">
            <p>
              Empowering Explorers / Curious Traveler with Insights for a
              Seamless Travel Experience.
            </p>
            <p>
              Help us build a stronger community by sharing your neighbourhood&apos;s
              story!
            </p>
            <p>
              We&apos;ve started with Montreal, now it&apos;s your turn - contribute your
              local knowledge and let&apos;s expand our reach together!
            </p>
          </div>
        </div>
      </div>
      <div className="grid lg:flex gap-4 items-center justify-center py-20 shadow-xl shadow-teal-800">
        <HomeCard
          icon={<SiWpexplorer size={30} className="text-teal-400" />}
          name="Local Insights"
          description="Discover hidden gems and popular spots in your new city, curated by locals"
          link="/discover"
          image={globe}
        />

        <div>
          <HomeCard
            icon={<HiHomeModern size={30} className="text-teal-400" />}
            name="Housing Solutions"
            description="Find the perfect home with our community-driven rental listings and insights."
            link="/rental"
            image={rentals}
          />
        </div>
        <div>
          <HomeCard
            icon={<MdAppShortcut size={30} className="text-teal-400" />}
            name="Essential Apps"
            description="Get a curated list of must-have apps used by locals for seamless city living."
            link="/application"
            image={Application}
          />
        </div>
      </div>
      <div className=" shadow-xl shadow-teal-800">
        <div className="w-full gap-10  items-center justify-center py-24 grid md:flex">
          <Image
            alt=""
            src={Uploadfunction}
            height={400}
            className="opacity-40 rounded-2xl"
          />
          <div className="flex flex-col gap-4 ml-6 md:ml-0 md:mt-16">
            <p className="w-72 ">
              Share your Experience!. <br />
              Collaborate with friends by adding to their existing posts!
            </p>
            <LoggingButton />
          </div>
        </div>

        <div></div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
