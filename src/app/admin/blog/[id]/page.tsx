"use client";
import { useParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import Delete from "../../../../../public/delete.svg";
import Edit from "../../../../../public/edit.svg";
import Suspend from "../../../../../public/suspend.svg";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const page = () => {
  const current_path = usePathname();

  interface post {
    title: string;
    post: string;
    date: Date;
  }
  const [post, setpost] = useState<post>({
    title: "",
    post: "",
    date: new Date(),
  });

  const { id } = useParams();

  const fetchPost = async () => {
    try {
      console.log(id);
      const response = await fetch("/api/Blog");
      const data = await response.json();
      const selectById = data.find((post: any) => post._id == id);
      console.log(data);
      console.log(selectById);
      setpost(selectById);
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };

  const deletePost = async () => {
    try {
      const response = await fetch(`/api/Blog`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      //   const updatedPosts = post.filter((post: any) => post._id !== id);
      setpost({
        title: "",
        post: "",
        date: new Date(),
      });
      window.location.href = "/admin/blog/posts";
      //   console.log("Post deleted successfully:", await response.json());
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const [progress, setProgress] = useState(13);

  useEffect(() => {
    fetchPost();
    const timer = setTimeout(() => setProgress(66), 200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="w-[74%]  flex items-start justify-center shadow-2xl min-h-[40vh] rounded-[30px] pt-10">
      {!post.title && (
        <div className="w-[90%]">
          <Progress value={progress} className="w-full " />
        </div>
      )}
      {post.title && (
        <div className="w-full  shadow-lg rounded-[20px] p-10">
          <div className="flex justify-end pt-5">
            <div className="w-1/3 flex justify-end gap-x-3">
              {current_path.includes("admin") && (
                <div className="flex gap-x-10 items-center justify-end w-full mb-10">
                  <span>
                    <button>
                      <Image src={Edit} alt="Edit post" className="h-7 w-7" />
                    </button>
                  </span>
                  <span>
                    <button>
                      <Image
                        src={Suspend}
                        alt="Suspend post"
                        className="h-8 w-8"
                      />
                    </button>
                  </span>
                  <span>
                    <button
                      onClick={() => {
                        deletePost();
                      }}
                    >
                      <Image
                        src={Delete}
                        alt="Delete post"
                        className="h-8 w-8"
                      />
                    </button>
                  </span>
                </div>
              )}
            </div>
          </div>
          <p
            className="bg-gray-200 py-2  rounded-full pl-4 text-[18px]
            "
          >
            <div
              // className="pl-4 mt-4 bg-gray-100 min-h-10 rounded-[30px] flex items-center text-[16px] py-3"
              dangerouslySetInnerHTML={{
                __html: post.title,
              }}
            />
          </p>
          <p className=" mt-4 bg-gray-100 min-h-10 rounded-[30px] flex items-center text-[16px] py-3 text-justify pt-10 pb-10 pl-10 pr-10">
            <div
              className="pl-4 mt-4 bg-gray-100 min-h-10 rounded-[30px] flex items-center text-[16px] py-3"
              dangerouslySetInnerHTML={{
                __html: post.post,
              }}
            />
          </p>
          <div className="flex justify-end pt-5">
            <div className="w-1/3 flex justify-end gap-x-3">
              <div>
                <span className="text-[14px] text-gray-500">
                  {isNaN(new Date(post.date).getTime())
                    ? "Invalid date"
                    : formatDistanceToNow(new Date(post.date))}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
