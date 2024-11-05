"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";

const page = () => {
  interface post {
    title: string;
    post: string;
    date: Date;
  }

  const [post, setPost] = useState<post>({
    title: "this is title",
    post: "this is the content of the post!",
    date: new Date(),
  });

  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get("/api/Blog");
  //       const data = response.data;
  //       setposts(data);
  //     } catch (err) {
  //       console.log("Error Fetching content:", err);
  //     }
  //   };

  const handleSubmit = async () => {
    console.log(post);
    try {
      const response = await axios.post("/api/Blog", post);
      console.log("submitted SuccesFully:", response.data);
      //   fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  return (
    <div className="w-[74%] rounded-[30px] flex justify-center items-center min-h-[40vh] shadow-2xl">
      <form
        action=""
        // className="w-full flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col items-center justify-center gap-y-3 w-[80%]"
      >
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="border border-gray-300 h-12 rounded-md pl-3 outline-none"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="">Post</label>
          <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            className="border border-gray-300 h-32 rounded-md pl-3 pt-3 outline-none"
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            className="bg-[#085008] font-bold text-white px-10 py-2"
            onClick={handleSubmit}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
