import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Blogs from "@/models/Blog";

export async function GET(request) {
  await connectDB();
  const Blog = await Blogs.find({});
  return NextResponse.json(Blog);
}

export async function POST(request) {
  await connectDB();
  const BlogData = await request.json();
  const Blog = await Blogs.create(BlogData);
  return NextResponse.json(Blog);
}

export async function PUT(request) {
  await connectDB();
  const { id, ...updateData } = await request.json();
  const Blog = await Blogs.findByIdAndUpdate(id, updateData, {
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
