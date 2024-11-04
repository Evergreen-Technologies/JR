import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Blog from "@/models/Blog";

export async function GET(request) {
  await connectDB();
  const Blog = await Blog.find({});
  return NextResponse.json(Blog);
}

export async function POST(request) {
  await connectDB();
  const BlogData = await request.json();
  const Blog = await Blog.create(BlogData);
  return NextResponse.json(Blog);
}

export async function PUT(request) {
  await connectDB();
  const { id, ...updateData } = await request.json();
  const Blog = await Blog.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return NextResponse.json(Blog);
}

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}
