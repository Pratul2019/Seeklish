"use client"

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const LoggingButton = () => {
  const { data: session } = useSession();

  return (
    <Link href={session ? "/" : "/signin"} className="hover:bg-teal-400 mt-2 bg-teal-800 rounded-xl p-2 px-6 w-fit">
      
        {session ? "Explore" : "Login/Sign-Up"}
    
    </Link>
  );
};

export default LoggingButton
