"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Delete from "../../../../../public/delete.svg";
import Edit from "../../../../../public/edit.svg";
import Suspend from "../../../../../public/suspend.svg";

import Image from "next/image";

const page = () => {
  interface post {
    title: string;
    post: string;
    date: Date;
  }
  const [posts, setposts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/Blog");
      const data = await response.json();

      setposts(data.reverse());
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="w-[74%] rounded-[30px] flex justify-center items-start pt-10 min-h-[40vh] shadow-2xl">
      <ul className="w-[90%] flex flex-col item-center justify-center h-full">
        {!posts[0] && (
          <div className="flex items-center justify-center h-full">
            Loading...
          </div>
        )}
        {posts.map((post: any, index: number) => (
          <li key={index} className="w-full  shadow-lg rounded-[20px] p-10">
            <p
              className="bg-gray-200 py-2  rounded-full pl-4 text-[18px]
            "
            >
              {post.title}
            </p>
            <p className="pl-4 mt-4 bg-gray-100 min-h-10 rounded-full flex items-center text-[16px] py-3">
              {post.post.length > 200
                ? `${post.post.slice(0, 200)} ....`
                : post.post}
            </p>
            <div className="flex justify-end pt-5">
              <div className="w-1/3 flex justify-start gap-x-3">
                <div className="flex gap-x-2 items-center">
                  <span>
                    <button>
                      <Image src={Edit} alt="Edit post" className="h-5 w-5" />
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
                <div>
                  <span className="text-[14px] text-gray-500">
                    {formatDistanceToNow(new Date(post.date))}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
