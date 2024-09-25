"use client"

import Link from 'next/link';
import { useSession } from 'next-auth/react';

const LoggingButton = () => {
  const { data: session } = useSession();

  return (
    <Link href={session ? "/" : "/signin"}>
      <button className="hover:bg-cyan-700 border mt-2 bg-header rounded-2xl p-2 px-4">
        {session ? "Explore" : "Get Started"}
      </button>
    </Link>
  );
};

export default LoggingButton
