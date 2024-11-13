import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Blogs from "@/models/Blog";

export async function GET(request) {
  await connectDB();
  const Blog = await Blogs.find({});
  return NextResponse.json(Blog);
}

export async function GETById(request, { params }) {
  await connectDB();

  const { id } = params;
  const video = await Blogs.findById(id);

  if (!video) {
    return new Response("Video not found", { status: 404 });
  }

  return NextResponse.json(video);
}
export async function POST(request) {
  await connectDB();
  const BlogData = await request.json();
  const Blog = await Blogs.create(BlogData);
  return NextResponse.json(Blog);
}

export async function PUT(request) {
  await connectDB();

  const { _id, ...updateData } = await request.json();
  const Blog = await Blogs.findByIdAndUpdate(_id, updateData, {
    new: true,
  });
  return NextResponse.json(Blog);
}

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();
  await Blogs.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}
