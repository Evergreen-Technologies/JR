"use client";
import axios from "axios";
import { useEffect, useState } from "react";

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
    <div className="lg:container lg:w-full lg:mx-auto mx-[20px] h-[93vh]">
      <div className="flex items-center justify-center h-[100%]">
        <ul className="w-full">
          {render.map((content, index) => (
            <li key={index} className="w-full pb-4">
              <div className="flex flex-col  w-full">
                <div className=" flex justify-between px-36 w-[80%] border border-black mx-auto items-center rounded-full p-2">
                  <video
                    controls
                    poster={content.imageUrl}
                    className="w-[300px] h-[120px]"
                  >
                    <source src={content.videoUrl} type="video/webm" />
                  </video>
                  <div className="w-1/3">
                    <p className="flex justify-start w-full">{content.title}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Page;
