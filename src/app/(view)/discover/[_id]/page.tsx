import axios from "axios";
import { Discover } from "@/Components/types";
import DiscoverPost from "./DiscoverPost/page";

interface Params {
  _id: string;
}

interface ApiResponse {
  success: boolean;
  data: Discover | null;
  message?: string;
}

export default async function DiscoverPage({ params }: { params: Params }) {
  
  try {
    const response = await axios.post<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/ShareModal/Discover`,
      { postid: params._id }
    );

    if (response.data.success && response.data.data) {
      return <DiscoverPost discover={response.data.data} />;
    } else {
      return <div>Discover Post not found</div>;
    }
  } catch (error) {
    console.error("Error fetching discover data:", error);
    return <div>An error occurred while fetching the discover data</div>;
  }
}