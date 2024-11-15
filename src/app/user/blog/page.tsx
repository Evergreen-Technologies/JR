"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Delete from "@/../public/delete.svg";
import Edit from "@/../public/edit.svg";
import Suspend from "@/../public/suspend.svg";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

import EmptyList from "@/../public/better.gif";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { setupFsCheck } from "next/dist/server/lib/router-utils/filesystem";

const page = () => {
  const current_path = usePathname();
  interface post {
    title: string;
    post: string;
    date: Date;
  }
  const [posts, setposts] = useState([]);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/Blog");
      const data = await response.json();

      setposts(data.reverse());
      if (data.length === 0) {
        setCheckEmpty(true);
      }
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className=" rounded-[30px] flex justify-center items-start py-14 min-h-[40vh] shadow-2xl lg:container lg:mx-auto mt-10">
      <ul className="w-[90%] flex flex-col item-center justify-center h-full gap-y-3">
        {!posts[0] && !checkEmpty && (
          <div className="flex items-center justify-center h-full flex-col gap-y-20">
            <Progress value={progress} className="w-[30%] " />
          </div>
        )}
        <div>
          {checkEmpty && (
            <div className="flex flex-col items-center justify-center gap-y-5 pt-10">
              <div>No Posts Yet..</div>
              <Image src={EmptyList} alt="Empty List!" />
            </div>
          )}
        </div>
        {posts
          .filter((post: any) => post.suspended == false)
          .map((post: any, index: number) => (
            <Link
              key={index}
              className="w-full  shadow-lg rounded-[20px] p-10"
              href={`/user/blog/${post._id}/post`}
            >
              <p
                className="bg-gray-200 py-2  rounded-[20px] pr-5 sm:text-[18px] text-[16px] text-end
            "
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.title,
                  }}
                />
              </p>
              <p className="px-5 mt-4 bg-gray-100 min-h-10 rounded-[20px] text-[16px] py-3 text-end">
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      post.post.length > 250
                        ? `${post.post.slice(0, 250)} ....`
                        : post.post,
                  }}
                />
              </p>
              <div className="flex justify-end pt-5">
                <div className="w-1/3 flex justify-end gap-x-3 pr-10">
                  {current_path.includes("admin") && (
                    <div className="flex gap-x-2 items-center">
                      <span>
                        <button>
                          <Image
                            src={Edit}
                            alt="Edit post"
                            className="h-5 w-5"
                          />
                        </button>
                      </span>
                      <span>
                        <button>
                          <Image
                            src={Suspend}
                            alt="Suspend post"
                            className="h-6 w-6"
                          />
                        </button>
                      </span>
                      <span>
                        <button>
                          <Image
                            src={Delete}
                            alt="Delete post"
                            className="h-6 w-6"
                          />
                        </button>
                      </span>
                    </div>
                  )}
                  <div className="flex justify-end">
                    <span className="text-[14px] text-gray-500 text-end">
                      {isNaN(new Date(post.date).getTime())
                        ? "Invalid date"
                        : formatDistanceToNow(new Date(post.date))}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default page;
