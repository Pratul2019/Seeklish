import dbConnect from "@/lib/dbConnect";
import ApplicationModel from "@/Modals/Application";
import DiscoverModel from "@/Modals/Discover";
import RentalModel from "@/Modals/Rental";
import UserModel from "@/Modals/User";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

// Define a general interface for connectionpost objects
interface ConnectionPost {
  _id: string;
  image: string;
  caption: string;
  username: string;
  name: string;
  rentalName?: string;
  rentalImage?: string;
  discoverName?: string;
  discoverImage?: string;
  appName?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { postId, connectionpostId, model } = await request.json();
    await dbConnect();

    let connection;
    let username;
    let user;

    if (model === "Rental") {
      connection = await RentalModel.findOne({ _id: postId });
      username = connection.connectionpost.find((post: ConnectionPost) => post._id === connectionpostId)?.username;
      user = await UserModel.findOne({ username });
      user?.connectpostrental.pull(postId);
      await user?.save();
    } else if (model === "Discover") {
      connection = await DiscoverModel.findOne({ _id: postId });
      username = connection.connectionpost.find((post: ConnectionPost) => post._id === connectionpostId)?.username;
      user = await UserModel.findOne({ username });
      user?.connectpostdiscover.pull(postId);
      await user?.save();
    } else if (model === "App") {
      connection = await ApplicationModel.findOne({ _id: postId });
      username = connection.connectionpost.find((post: ConnectionPost) => post._id === connectionpostId)?.username;
      user = await UserModel.findOne({ username });
      user?.connectpostapplication.pull(postId);
      await user?.save();
    }

    if (connection) {
      const connectionPostIndex = connection.connectionpost.findIndex(
        (post: ConnectionPost) => post._id === connectionpostId
      );

      if (connectionPostIndex !== -1) {
        const connectionPost = connection.connectionpost[connectionPostIndex];
        const imageKey = connectionPost.rentalImage || connectionPost.discoverImage || connectionPost.image;

        if (imageKey) {
          const key = imageKey.split("https://seeklish.s3.amazonaws.com/").pop();
          const s3Client = new S3Client({
            region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
            credentials: {
              accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID!,
              secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY!,
            },
          });
          const deleteCommand = new DeleteObjectCommand({
            Bucket: "seeklish",
            Key: key!,
          });
          await s3Client.send(deleteCommand);
        }

        connection.connectionpost.splice(connectionPostIndex, 1);
        await connection.save();
      }
    }

    return NextResponse.json(
      { message: "Connection rental deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting connection rental:", error);
    return NextResponse.json(
      { message: "Error deleting connection rental" },
      { status: 500 }
    );
  }
}
