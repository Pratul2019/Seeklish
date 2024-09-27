import axios from "axios";
import { App } from "@/Components/types";
import AppPost from "./AppPost/page";

interface Params {
  _id: string;
}

interface ApiResponse {
  success: boolean;
  data: App | null;
  message?: string;
}

export default async function AppPage({ params }: { params: Params }) {
  
  try {
    const response = await axios.post<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/ShareModal/App`,
      { postid: params._id }
    );

    if (response.data.success && response.data.data) {
      return <AppPost app={response.data.data} />;
    } else {
      return <div>App Post not found</div>;
    }
  } catch (error) {
    console.error("Error fetching app data:", error);
    return <div>An error occurred while fetching the app data</div>;
  }
}