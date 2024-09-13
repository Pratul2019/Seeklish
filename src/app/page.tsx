// import { auth } from "@/auth";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    return redirect('/view/discover');
  }

  return redirect('/Homepage');
}