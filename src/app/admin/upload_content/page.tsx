"use client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import "../../globals.css";
import { CSSProperties } from "react";
import UploadIcon from "../../../public/upload-folder-svgrepo-com (2).svg";
import { useState } from "react";
import axios from "axios";
import { title } from "process";

export default function Home() {
  interface form {
    title: string;
    imageUrl: string;
    videoUrl: string;
  }

  const [form, setForm] = useState<form>({
    title: "",
    imageUrl: "",
    videoUrl: "",
  });

  type StyleField = string | CSSProperties;

  type UploadDropzoneProps = {
    /* rest of props */
    appearance?: {
      container?: StyleField;
      uploadIcon?: StyleField;
      label?: StyleField;
      allowedContent?: StyleField;
      button?: StyleField;
    };
  };

  const save =
    Boolean(form.title) && Boolean(form.imageUrl) && Boolean(form.videoUrl);
  const handleSubmit = async (e: any) => {
    console.log(form);
    try {
      const response = await axios.post("/api/Materials", form);
      console.log("Form submitted successfully:", response.data);
      // Handle successful submission (e.g., show success message, redirect)
      const re1 = await axios.get("/api/Materials");
      const data = re1.data;
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 pt-10">
      <form
        action=""
        className="flex flex-col font-plus  w-[600px] p-10 rounded-[10px] gap-y-16 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col">
          <label htmlFor="" className="font-plus pb-2">
            Title
          </label>
          <input
            type="text"
            className="border border-solid border-gray-300  h-12 rounded-[8px] outline-none pl-5 text-black"
            value={form.title}
            onChange={(e) =>
              setForm((prevForm) => ({ ...prevForm, title: e.target.value }))
            }
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="font-plus pb-2">
            Upload Thumbnail
            <span className="text-red-500"> (Optional)</span>
          </label>
          <UploadDropzone
            endpoint="attachImage"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setForm((prevForm) => ({ ...prevForm, imageUrl: res[0].appUrl }));
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="px-16 border border-gray-300 rounded-[8px] p-5"
            appearance={{
              uploadIcon: {
                backgroundColor: "gray",
                borderRadius: "50%",
                marginTop: "30px",
              },
              allowedContent: {
                // contentVisibility: "hidden",
                color: "black",
              },
              button: {
                position: "relative",
                top: "70px",
                backgroundColor: "#cfcdcd",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
                borderRadius: "7px",
                color: "black",
                fontWeight: "bold",
                width: "110%",
                // content: "upload file",
              },
            }}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <label htmlFor="" className="font-plus pb-2">
            Upload Video
            <span className="text-red-500"> (Optional)</span>
          </label>
          <UploadDropzone
            endpoint="attachVideo"
            onClientUploadComplete={(res) => {
              console.log("Files: ", res);
              setForm((prevForm) => ({ ...prevForm, videoUrl: res[0].appUrl }));
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="px-16 border border-gray-300 rounded-[8px] p-5"
            appearance={{
              uploadIcon: {
                backgroundColor: "gray",
                borderRadius: "50%",
                marginTop: "30px",

                // contentVisibility: "hidden",
              },
              allowedContent: {
                // contentVisibility: "hidden",
                color: "black",
              },
              button: {
                position: "relative",
                top: "70px",
                backgroundColor: "#cfcdcd",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
                borderRadius: "8px",
                color: "black",
                fontWeight: "bold",
                width: "110%",
                content: "upload file",
              },
            }}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="border border-white bg-[#cfcdcd] text-black disabled:text-gray-400 font-bold  rounded-sm h-10 outline-none disabled:rounded-md"
          disabled={!save}
        >
          submit
        </button>
      </form>
    </main>
  );
}
