"use client";
import PlayIcon from "@/components/PlayIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import ReactPlayer from "react-player/lazy";
// import { CldVideoPlayer } from "next-cloudinary";
// import "next-cloudinary/dist/cld-video-player.css";

const Page = () => {
  const [render, setRender] = useState([
    {
      title: "video Title",
      imageUrl:
        "https://imgs.search.brave.com/oEmjW0UDCCn7R5L6OlJ77LHvDU8sIP2KycVcV4w1uw4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzEwNTI1ODE4L3Iv/aWwvZTg5ZTNhLzM4/NzA4OTQzNjMvaWxf/NjAweDYwMC4zODcw/ODk0MzYzXzMxcjUu/anBn",
      videoUrl: "https://youtu.be/SqcY0GlETPk",
    },
  ]);
  const render_video_library = async () => {
    try {
      const re1 = await axios.get("/api/Materials");
      const data = re1.data;
      setRender(data);
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message)
    }
  };
  useEffect(() => {
    render_video_library();
  }, []);
  return (
    <div className="lg:container lg:w-full lg:mx-auto mx-[20px] min-h-[93vh]  mt-10 rounded-[30px] shadow-2xl">
      <div className="flex flex-wrap gap-10 justify-center items-center w-full p-10">
        <div className="w-[400px] h-[400px]  rounded-[12px] flex items-center justify-center shadow-xl relative">
          {render.map((vid, index) => (
            <div className="absolute bottom-0 h-24 transition-all ease-in-out bg-gray-300 text-black opacity-100 w-full flex items-center justify-center rounded-b-[12px] ">
              Title
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

// <CldVideoPlayer width="1920" height="1080" src={vid.videoUrl} />
