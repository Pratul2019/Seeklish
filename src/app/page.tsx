import { auth } from "@/auth";
import HomeCard from "@/Components/Comp_Indv/Homecard";
import { Cookie } from "next/font/google";
import Image from "next/image";
import { redirect } from "next/navigation";
import { HiHomeModern } from "react-icons/hi2";
import { MdAppShortcut } from "react-icons/md";
import { SiWpexplorer } from "react-icons/si";
import Uploadfunction from "../../public/Uploadfunction.jpeg";
import LoggingButton from "@/Components/Comp_Indv/LoggingButton";
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
    <main className="w-full h-full min-h-screen flex flex-col gap-24">
      <div className={`${Cookies.className} flex justify-center`}>
        <h1 className="p-2  text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-gray-800">
          Seeklish
        </h1>
      </div>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl ">Guide to Seamless Transitions</h1>
        <p className="text-xl text-center">
          Empowering Explorers with local knowledge for a smooth experience.
        </p>
        <div className="text-sm font-thin flex flex-col text-center">
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
      <div className="grid lg:flex gap-4 items-center justify-center py-24 bg-header">
        <HomeCard
          icon={<SiWpexplorer size={30} className="text-cyan-700" />}
          name="Local Insights"
          description="Discover hidden gems and popular spots in your new city, curated by locals"
          link="/discover"
          image="/globe.jpeg"
        />
        <div>
          <HomeCard
            icon={<MdAppShortcut size={30} className="text-cyan-700" />}
            name="Essential Apps"
            description="Get a curated list of must-have apps used by locals for seamless city living."
            link="/application"
            image="/Application.jpg"
          />
        </div>
        <div>
          <HomeCard
            icon={<HiHomeModern size={30} className="text-cyan-700" />}
            name="Housing Solutions"
            description="Find the perfect home with our community-driven rental listings and insights."
            link="/rental"
            image="/rentals.jpeg"
          />
        </div>
      </div>
      <div className="w-full gap-10 grid md:flex items-center justify-center py-12 bg-header">
        
        <Image
          alt=""
          src={Uploadfunction}
          height={400}
          className="opacity-40 rounded-2xl"
        />
        <div className="flex flex-col gap-4 ml-6 md:ml-0">
          <p className="w-72 ">
           
            Share your Experience!. <br/>Collaborate with friends by adding to their
            existing posts!
          </p>
          <LoggingButton />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
