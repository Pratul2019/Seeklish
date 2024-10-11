import type { Rental } from "@/Components/types"; // Type-only import
import axios from 'axios';
import { Fragment } from "react";
import Rentalui from "./RentalUi";

async function getrental(): Promise<Rental[]> {
 
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/Rentalfetch`);
    if (!response.data) {
      throw new Error('Failed to fetch data');
    }
    if (Array.isArray(response.data)) {
      return response.data as Rental[]; // Cast to Rental[]
    } else {
      throw new Error("Data is not an array");
    }
  } catch (error) {
    console.error("Error fetching discovers:", error);
    throw error;
  }
}

export default async function Rental() {
  try {
    const rentals = await getrental(); 
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4 md:mx-4  mt-20 md:mt-0">
        {rentals.map((rental: Rental) => (
          <Fragment key={rental._id}>
            <Rentalui rental={rental} />
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