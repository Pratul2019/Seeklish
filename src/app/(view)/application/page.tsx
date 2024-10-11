import type { App } from "@/Components/types"; // Type-only import
import axios from 'axios';
import { Fragment } from "react";
import Appui from "./AppUi";

async function getapp(): Promise<App[]> {
 
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/Appfetch`);
    if (!response.data) {
      throw new Error('Failed to fetch data');
    }
    if (Array.isArray(response.data)) {
      return response.data as App[]; // Cast to App[]
    } else {
      throw new Error("Data is not an array");
    }
  } catch (error) {
    console.error("Error fetching discovers:", error);
    throw error;
  }
}

export default async function App() {
  try {
    const apps = await getapp(); 
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4 md:mx-4  mt-20 md:mt-0">
        {apps.map((app: App) => (
          <Fragment key={app._id}>
            <Appui app={app} />
          </Fragment>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching Data:", error);
    return (
      <div>Error: {error instanceof Error ? error.message : String(error)}</div>
    );
  }
}