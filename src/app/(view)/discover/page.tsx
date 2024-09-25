import type { Discover } from "@/Components/types";
import axios from 'axios';
import Discoverui from "./DiscoverUi";


const Discover = async () => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/Discoverfetch`);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4 md:mx-4  mt-20 md:mt-0">
        {response.data.map((discover: Discover) => (
          <Discoverui key={discover._id} discover={discover} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
    return (
      <div>Error: {error instanceof Error ? error.message : String(error)}</div>
    );
  }
};

export default Discover;