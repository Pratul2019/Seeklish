import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gradient-to-t from-teal-800 to-header">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-around md:flex-nowrap gap-4">
          <div className="items-center flex flex-col text-sm md:text-left w-full md:w-auto">
            2024 Seeklish. All rights reserved.
            <a href="/Terms&Conditions" className="text-xs text-blue-500 underline">
              Terms & Condition
            </a>
          </div>

          <div className="flex gap-4 w-full justify-center md:w-auto md:justify-start">
            <Link
              href="https://www.instagram.com/pratulaggarwal13/"
              target="_blank"
            >
              <FaInstagram
                size={25}
                className="hover:text-teal-500 cursor-pointer"
              />
            </Link>
            <Link
              href="https://www.linkedin.com/in/pratul-aggarwal-33418b117/"
              target="_blank"
            >
              <FaLinkedin
                size={25}
                className="hover:text-teal-500 cursor-pointer"
              />
            </Link>
            <Link
              href="https://www.facebook.com/pratul.agarwal.5/"
              target="_blank"
            >
              <FaFacebookF
                size={25}
                className="hover:text-teal-500 cursor-pointer"
              />
            </Link>
            <Link href="https://www.youtube.com/@seeklish" target="_blank">
              <FaYoutube
                size={25}
                className="hover:text-teal-500 cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
