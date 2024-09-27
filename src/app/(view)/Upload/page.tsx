import { auth } from "@/auth";
import { redirect } from "next/navigation";


export default async function Upload() {
  const session = await auth();

  if (!session?.user.username)
  {
    redirect ('/');
  }

  return (
    <div className="flex  items-center justify-center p-4">
       Start Sharing your Experience
    </div>
  );
}
