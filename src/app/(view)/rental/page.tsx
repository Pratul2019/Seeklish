import type { Rental } from "@/Components/types";
import axios from 'axios';
import Rentalui from "./RentalUi";

async function Rental() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Fetch/Rentalfetch`);
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:p-4 md:mx-4  mt-20 md:mt-0">
        {response.data.map((rental: Rental) => (
          <Rentalui key={rental._id} rental={rental} />
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

export default Rental;