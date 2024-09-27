import axios from "axios";
import { Rental } from "@/Components/types";
import RentalPost from "./RentalPost/page";

interface Params {
  _id: string;
}

interface ApiResponse {
  success: boolean;
  data: Rental | null;
  message?: string;
}

export default async function RentalPage({ params }: { params: Params }) {
  
  try {
    const response = await axios.post<ApiResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/ShareModal/Rental`,
      { postid: params._id }
    );

    if (response.data.success && response.data.data) {
      return <RentalPost rental={response.data.data} />;
    } else {
      return <div>Rental Post not found</div>;
    }
  } catch (error) {
    console.error("Error fetching rental data:", error);
    return <div>An error occurred while fetching the rental data</div>;
  }
}