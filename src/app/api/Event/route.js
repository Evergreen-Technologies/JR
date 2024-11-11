import { NextResponse } from "next/server";
import connectDB from "@/config/database";
import Events from "@/models/Event";

export async function GET(request) {
  await connectDB();
  const Event = await Events.find({});
  return NextResponse.json(Event);
}

export async function GETById(request, { params }) {
  await connectDB();

  const { id } = params;
  const video = await Events.findById(id);

  if (!video) {
    return new Response("Video not found", { status: 404 });
  }

  return NextResponse.json(video);
}
export async function POST(request) {
  await connectDB();
  const EventData = await request.json();
  const Event = await Events.create(EventData);
  return NextResponse.json(Event);
}

export async function PUT(request) {
  await connectDB();

  const { _id, ...updateData } = await request.json();
  console.log("Updating Event with ID:", _id);
  console.log("Update Data:", updateData);

  const Event = await Events.findByIdAndUpdate(_id, updateData, {
    new: true,
  });

  if (!Event) {
    console.error("Event not found for ID:", _id);
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(Event);
}

export async function DELETE(request) {
  await connectDB();
  const { id } = await request.json();
  await Events.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event deleted successfully" });
}
