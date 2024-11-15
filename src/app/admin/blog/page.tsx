"use client";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Editor } from "primereact/editor";

const page = () => {
  interface post {
    title: string;
    post: string;
    suspended: boolean;
    date: Date;
  }

  const [post, setPost] = useState<post>({
    title: "",
    post: "",
    suspended: false,
    date: new Date(),
  });

  const handleSubmit = async () => {
    console.log(post);
    try {
      const response = await axios.post("/api/Blog", post);
      console.log("submitted SuccesFully:", response.data);
      setPost({
        title: "",
        post: "",
        suspended: false,
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

  const [editorHeight, setEditorHeight] = useState("320px");

  useEffect(() => {
    const updateHeight = () => {
      setEditorHeight(window.innerWidth < 768 ? "250px" : "320px");
    };

    updateHeight(); // Set initial height
    window.addEventListener("resize", updateHeight); // Update height on resize

    return () => {
      window.removeEventListener("resize", updateHeight); // Cleanup listener
    };
  }, []);

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
    <div
      className="sm:w-[74%] w-full rounded-[30px] flex justify-center items-center min-h-[65vh] shadow-2xl py-5
    "
    >
      <form
        action=""
        // className="w-full flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col items-center justify-center gap-y-3 w-[90%] "
      >
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="" className="pl-5 sm:pl-0">
            عنوان
          </label>
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
          <label htmlFor="" className="pl-5 sm:pl-0">
            منشور
          </label>
          <Editor
            value={post.post}
            onTextChange={(e: any) =>
              setPost({ ...post, post: e.htmlValue || "" })
            }
            style={{
              height: editorHeight,
              fontSize: "17px",
            }}
            className="  rounded-md  pt-3 outline-none"
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            className={`bg-red-700 text-white font-bold px-10 py-2 rounded-[4px] outline-none`}
            onClick={() => {
              handleSubmit();
              buttonEffect();
            }}
          >
            {!progrees && <>نشر</>}
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
