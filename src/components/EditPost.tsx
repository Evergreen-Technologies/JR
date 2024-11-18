"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Editor } from "primereact/editor";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const EditPost = () => {
  const { t } = useTranslation();
  interface post {
    title: string;
    post: string;
    suspended: boolean;
    date: Date;
  }

  const [post, setPost] = useState({
    title: "",
    post: "",
    suspended: false,
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
      setPost(selectById);
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };
  const current_path = usePathname();

  const handleEdit = async () => {
    console.log(post);
    try {
      const response = await axios.put(`/api/Blog`, post);
      console.log("submitted SuccesFully:", response.data);

      if (response.data) {
        toast.success("تم التعديل بنجاح!");
        setTimeout(() => {
          window.location.href = "/admin/blog/posts";
        }, 1500);
      } else {
        toast.error("حدث خطأ ما، يرجى المحاولة مرة أخرى!");
      }
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

  const [progrees, setProgress] = useState(false);
  const buttonEffect = () => {
    if (post.title && post.post) {
      setProgress(true);
      setTimeout(() => {
        setProgress((prevProgress) => false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div
      className="w-[74%] rounded-[30px] flex justify-center items-center min-h-[65vh] shadow-2xl py-5
    "
    >
      <form
        action=""
        // className="w-full flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col items-center justify-center gap-y-3 w-[80%]"
      >
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="">{t("Title")}</label>
          <Editor
            value={post.title}
            onTextChange={(e: any) =>
              setPost({ ...post, title: e.htmlValue || "" })
            }
            style={{ height: "60px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="">{t("Post")}</label>
          <Editor
            value={post.post}
            onTextChange={(e: any) =>
              setPost({ ...post, post: e.htmlValue || "" })
            }
            style={{ height: "320px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none"
          />
        </div>
        <div className="flex justify-end w-full">
          <button
            className={`bg-red-700 text-white font-bold px-10 py-2 rounded-[4px] outline-none`}
            onClick={() => {
              handleEdit();
              buttonEffect();
            }}
          >
            {!progrees && <>{t("Edit_Post")}</>}
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

export default EditPost;
