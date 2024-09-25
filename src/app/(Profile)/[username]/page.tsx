import axios from 'axios';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from '../(Components)/Header';
import { Suspense } from 'react';
import Tabs from '../(ProfileTabs)/Tabs';


interface Params {
  username: string;
}

interface ProfileCounts {
  discoverCount: number;
  rentalCount: number;
  applicationCount: number;
}

const Username = async ({ params }: { params: Params }) => {
  try {
    const session = await auth();
    const { username } = params;

    if (!session?.user?.username) return redirect("/");

    const currentUser = session.user.username;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/user`,
      { username }
    );

    if (response.data.success) {
      const { user, discoverprofile, rentalprofile, applicationprofile } =
        response.data.data;

      const isAllowed = user.connections[currentUser]?.isallowed;

      const profileCounts: ProfileCounts = {
        discoverCount: discoverprofile.length,
        rentalCount: rentalprofile.length,
        applicationCount: applicationprofile.length,
      };

      return (
        <Suspense>
          <div className="container mx-auto">
            <Header user={user} currentUser={currentUser} />

            <div className="flex gap-10 justify-center ">
              <Tabs
                discoverpro={discoverprofile}
                rentalpro={rentalprofile}
                applicationpro={applicationprofile}
                isAllowed={isAllowed}
                profileCounts={profileCounts}
              />
            </div>
          </div>
        </Suspense>
      );
    } else {
      console.error(response.data.message || "Failed to fetch user data");
      return redirect("/");
    }
  } catch (error) {
    
    return redirect("/");
  }
};

export default Username;