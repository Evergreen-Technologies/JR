"use client";
import React, { cache } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { formatDistanceToNow, subSeconds } from "date-fns";
import Delete from "../../../../../public/delete.svg";
import Edit from "../../../../../public/edit.svg";
import Suspend from "../../../../../public/suspend.svg";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import EmptyList from "@/../public/better.gif";
import ReallySuspened from "@/../public/suspended.svg";

import Image from "next/image";
import { usePathname } from "next/navigation";

const page = () => {
  const current_path = usePathname();

  interface post {
    title: string;
    post: string;
    suspended: boolean;
    date: Date;
  }

  const [suspend, setSuspend] = useState([]);
  const [posts, setposts] = useState([]);
  const [checkEmpty, setCheckEmpty] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/Blog");
      let data = await response.json();

      // Format dates here
      const formattedData = data.map((post: post) => ({
        ...post,
        formattedDate: formatDistanceToNow(new Date(post.date)),
      }));

      formattedData.reverse();
      setposts(formattedData);
      posts.length === 0 ? setCheckEmpty(true) : null;
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };

  const deletePost = async (id: any) => {
    try {
      // Update the fetch request to send the id in the request bodys
      const response = await fetch(`/api/Blog`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ id }), // Send the id in the body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedPosts = posts.filter((post: any) => post._id !== id); // Use _id for filtering

      setposts(updatedPosts);
      console.log("Post deleted successfully:", await response.json());
    } catch (error) {
      console.error("Error deleting post:", error);
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
    <div className="w-[74%] rounded-[30px] flex justify-center items-start  min-h-[40vh] shadow-2xl py-10">
      <ul className="w-[90%] flex flex-col item-center justify-center h-full">
        {!posts[0] && !checkEmpty && (
          <div className="flex items-center justify-center h-full">
            <Progress value={progress} className="w-[30%] " />
          </div>
        )}
        <div className="">
          {checkEmpty && posts.length == 0 && (
            <div
              className=" flex items-center justify-center pt-10 flex-col
            "
            >
              <div>No Posts Yet!</div>
              <div className=" pt-14">
                <span>
                  <Image
                    src={EmptyList}
                    alt="Empty List!"
                    className="h-[60px] w-[60px]"
                  />
                </span>
              </div>
            </div>
          )}
        </div>
        {posts.map((post: any, index: number) => {
          return (
            <div className="w-full  shadow-lg rounded-[20px] p-10">
              <Link
                key={index}
                className=""
                href={`/admin/blog/${post._id}/post`}
              >
                <p
                  className="bg-gray-200 py-2  rounded-full pl-4 text-[18px]
            "
                >
                  <div
                    // className="pl-4 mt-4 bg-gray-100 min-h-10 rounded-[30px] flex items-center text-[16px] py-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        post.post.length > 200
                          ? `${post.title.slice(0, 200)} ....`
                          : post.title,
                    }}
                  />
                </p>
                <div
                  className="pl-4 mt-4 bg-gray-100 min-h-10 rounded-[30px] flex items-center text-[16px] py-3"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.post.length > 200
                        ? `${post.post.slice(0, 200)} ....`
                        : post.post,
                  }}
                />
              </Link>
              <div className="flex justify-end pt-5">
                <div className="w-1/3 flex justify-start gap-x-3">
                  {current_path.includes("admin") && (
                    <div className="flex gap-x-2 items-center relative">
                      <span className="relative -top-1">
                        <Link href={`/admin/blog/${post._id}/edit`}>
                          <Image
                            src={Edit}
                            alt="Edit post"
                            className="h-5 w-5"
                          />
                        </Link>
                      </span>
                      {/* <span>
                      <button
                        onClick={() => {
                          setposts((prevPosts: any) =>
                            prevPosts.map((p) =>
                              p._id === post._id
                                ? { ...p, suspended: !p.suspended }
                                : p
                            )
                          );
                        }}
                      >
                        <Image
                          src={!post?.suspended ? Suspend : ReallySuspened}
                          alt="Suspend post"
                          className="h-6 w-6"
                        />
                      </button>
                    </span> */}
                      <span>
                        <button
                          onClick={() => {
                            deletePost(post._id);
                          }}
                        >
                          <Image
                            src={Delete}
                            alt="Delete post"
                            className="h-6 w-6"
                          />
                        </button>
                      </span>
                    </div>
                  )}
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
          );
        })}
      </ul>
    </div>
  );
};

export default page;
