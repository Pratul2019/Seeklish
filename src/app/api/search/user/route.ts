import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/Modals/User';
import dbConnect from '@/lib/dbConnect';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

   await dbConnect();

    const results = await UserModel.aggregate([
        {
          $search: {
            index: "SearchUser",
            text: {
              query: query,
              path: ["name", "username"]
            }
          }
        },
        {
          $limit: 10
        },
        {
          $project: {
            _id: 1,
            name: 1,
            username: 1,
            image: 1,
            audience: 1,
          }
        }
      ]);

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error in user search:', error);
    return NextResponse.json({ error: 'An error occurred while fetching data' }, { status: 500 });
  }
  //  finally {
  //   await mongoose.disconnect();
  // }
}