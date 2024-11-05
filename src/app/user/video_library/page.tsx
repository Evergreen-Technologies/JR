"use client";
import PlayIcon from "@/components/PlayIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import ReactPlayer from "react-player/lazy";
import Video from "next-video";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";

import { Progress } from "@/components/ui/progress";

// import { CldVideoPlayer } from "next-cloudinary";
// import "next-cloudinary/dist/cld-video-player.css";

const Page = () => {
  const [render, setRender] = useState([]);
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

  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lg:container lg:w-full lg:mx-auto mx-[20px] min-h-[93vh]  mt-10 rounded-[30px] shadow-2xl">
      <div className="flex flex-wrap gap-10 justify-center items-center w-full p-10">
        {!render[0] && <Progress value={progress} className="w-[10%] " />}

        {render.map((vid: any, index: number) => (
          <div className="w-[400px] h-[380px]  rounded-[12px] flex items-center justify-center shadow-xl relative">
            <Plyr
              source={{
                type: "video",
                sources: [
                  {
                    src: vid.videoUrl,
                    type: "video/mp4",
                  },
                ],
              }}
              options={{
                controls: [
                  "play-large",
                  "play",
                  "progress",
                  "current-time",
                  "mute",
                  "volume",
                  "fullscreen",
                ],
              }}
            />
            <div className="absolute bottom-0 h-20 transition-all ease-in-out bg-gray-300 text-black opacity-100 w-full flex items-center justify-center rounded-b-[12px] ">
              {vid.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
// <CldVideoPlayer width="1920" height="1080" src={vid.videoUrl} />
