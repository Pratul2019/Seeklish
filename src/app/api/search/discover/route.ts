import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import DiscoverModel from "@/Modals/Discover";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 }
      );
    }

    await dbConnect();

    const results = await DiscoverModel.aggregate([
      {
        $search: {
          index: "Discover",
          text: {
            query: query,
            path: ["discoverName", "place"],
          },
        },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: 1,
          name: 1,
            discoverName: 1,
          image: 1,
          discoverImage: 1,
          caption: 1,
          username: 1,
          place: 1,
          like: 1,
          comment: 1,
          connectiondiscover: { $ifNull: [ "$connectiondiscover", [] ] }
        },
      },
    ]);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Error in search:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching data" },
      { status: 500 }
    );
  }
}
