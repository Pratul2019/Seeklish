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
import Application from "../../public/Application.jpg";
import globe from "../../public/globe.jpg";
import rentals from "../../public/rentals.jpg";
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
    <main className="w-full h-full min-h-screen flex flex-col gap-24 bg-header">
      <div className={`${Cookies.className} flex justify-center`}>
        <h1 className="p-2  text-6xl bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-gray-700">
          Seeklish
        </h1>
      </div>
      <div
        className="flex flex-col gap-6 items-center justify-center py-24 bg-gradient-to-t from-teal-800 to-header"
      >
        <h1 className="text-3xl italic text-center">
          Guide to Seamless Transitions
        </h1>
        <p className="text-2xl text-center">
          Empowering Explorers with local knowledge for a smooth experience.
        </p>
        <div className=" font-thin flex flex-col text-center">
          <p>
            Help us build a stronger community by sharing your
            neighbourhood&apos;s story!
          </p>
          <p>
            We&apos;ve started with Montreal, now it&apos;s your turn -
            contribute your local knowledge and let&apos;s expand our reach
            together!
          </p>
        </div>
      </div>
      <div className="grid lg:flex gap-4 items-center justify-center  py-24 bg-gradient-to-t from-teal-800 to-header">
        <HomeCard
          icon={<SiWpexplorer size={30} className="text-teal-400" />}
          name="Local Insights"
          description="Discover hidden gems and popular spots in your new city, curated by locals"
          link="/discover"
          image={globe}
        />
        <div>
          <HomeCard
            icon={<MdAppShortcut size={30} className="text-teal-400" />}
            name="Essential Apps"
            description="Get a curated list of must-have apps used by locals for seamless city living."
            link="/application"
            image={Application}
          />
        </div>
        <div>
          <HomeCard
            icon={<HiHomeModern size={30} className="text-teal-400" />}
            name="Housing Solutions"
            description="Find the perfect home with our community-driven rental listings and insights."
            link="/rental"
            image={rentals}
          />
        </div>
      </div>
      <div className=" bg-gradient-to-t from-teal-800 to-header">
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

        <div>

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
