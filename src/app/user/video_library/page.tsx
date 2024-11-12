"use client";
import PlayIcon from "@/components/PlayIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import ReactPlayer from "react-player/lazy";
import Video from "next-video";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Progress } from "@/components/ui/progress";
import { setSourceMapsEnabled } from "process";
import { formatDistanceToNow } from "date-fns";

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
        {!render[0] && (
          <div className="w-[90%] pt-10">
            <Progress value={progress} className="w-[10%] " />
          </div>
        )}

        {render.map((vid: any, index: number) => (
          <div className="rounded-[12px] flex items-start justify-center shadow-xl  h-[250px] w-[400px] relative">
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
            <Dialog>
              <DialogTrigger asChild>
                <div className="absolute top-0 bottom-0 right-0 left-0 border border-blac"></div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1000px] border-none p-0 rounded-md">
                <div className="w-full h-full m-0">
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
                      autoplay: true,
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
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
// <CldVideoPlayer width="1920" height="1080" src={vid.videoUrl} />
