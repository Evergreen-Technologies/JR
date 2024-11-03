import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Materials from "@/models/Materials";

export async function GET(request) {
  await connectDB();
  const Material = await Materials.find({});
  return NextResponse.json(Material);
}

export async function POST(request) {
  await connectDB();
  const MaterialData = await request.json();
  const Material = await Materials.create(MaterialData);
  return NextResponse.json(Material);
}

export async function PUT(request) {
  await connectDB();
  const { id, ...updateData } = await request.json();
  const Material = await Materials.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return NextResponse.json(Material);
}

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();
  await Materials.findByIdAndDelete(id);
  return NextResponse.json({ message: "User deleted successfully" });
}
