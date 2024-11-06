"use client";
import axios from "axios";
import React from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Editor } from "primereact/editor";

const page = () => {
  interface post {
    title: string;
    post: string;
    date: Date;
  }

  const [post, setPost] = useState<post>({
    title: "",
    post: "",
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
      setPost({
        title: "",
        post: "",
        date: new Date(),
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Axios error:", err.response?.data || err.message);
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  //   useEffect(() => {
  //     fetchPosts();
  //   }, []);

  const [progrees, setProgress] = useState(false);
  const buttonEffect = () => {
    if (post.title && post.post) {
      setProgress(true);
      setTimeout(() => {
        setProgress((prevProgress) => false);
      }, 1000);
    }
  };

  return (
    <div className="w-[74%] rounded-[30px] flex justify-center items-center min-h-[65vh] shadow-2xl">
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
          <Editor
            value={post.title}
            onTextChange={(e: any) =>
              setPost({ ...post, title: e.htmlValue || "" })
            }
            style={{ height: "60px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none"
          />
          {/* <input
            type="text"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            className="border border-gray-300 h-12 rounded-md pl-3 outline-none"
            required
          /> */}
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="">Post</label>
          <Editor
            value={post.post}
            onTextChange={(e: any) =>
              setPost({ ...post, post: e.htmlValue || "" })
            }
            style={{ height: "320px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none"
          />
          {/* <textarea
            value={post.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            className="border border-gray-300 h-32 rounded-md pl-3 pt-3 outline-none"
            required
          /> */}
        </div>
        <div className="flex justify-end w-full">
          <button
            className={`bg-red-700 text-white font-bold px-10 py-2 rounded-[4px] outline-none`}
            onClick={() => {
              handleSubmit();
              buttonEffect();
            }}
          >
            {!progrees && <>Post</>}
            {progrees && (
              <CircularProgress
                style={{
                  height: "18px",
                  width: "20px",
                  marginRight: "7px",
                  marginLeft: "7px",
                }}
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
