"use client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import "../../app/globals.css";
import { CSSProperties } from "react";
import UploadIcon from "../../../public/upload-folder-svgrepo-com (2).svg";
import { useState } from "react";
import axios from "axios";

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
  const handleSubmit = async () => {
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form
        action=""
        className="flex flex-col font-plus border border-gray-600 w-[600px] p-10 rounded-[10px] gap-y-16"
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
            className="border border-solid border-black bg-gray-900 h-12 rounded-[8px] outline-none pl-5"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              setForm({ ...form, imageUrl: res[0].appUrl });
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="px-16 bg-gray-900 rounded-[8px] border-none p-5"
            appearance={{
              uploadIcon: {
                contentVisibility: "hidden",
              },
              allowedContent: {
                contentVisibility: "hidden",
              },
              button: {
                position: "relative",
                top: "70px",
                backgroundColor: "white",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
                borderRadius: "7px",
                color: "black",
                fontWeight: "bold",
                width: "132%",
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
              setForm({ ...form, videoUrl: res[0].appUrl });
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
            className="px-16 bg-gray-900 rounded-[8px] border-none p-5"
            appearance={{
              uploadIcon: {
                backgroundColor: "red",
                contentVisibility: "hidden",
              },
              allowedContent: {
                contentVisibility: "hidden",
              },
              button: {
                position: "relative",
                top: "70px",
                backgroundColor: "white",
                paddingTop: "20px",
                paddingBottom: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
                borderRadius: "8px",
                color: "black",
                fontWeight: "bold",
                width: "135%",
                content: "upload file",
              },
            }}
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
<<<<<<< Updated upstream
          className="border border-white bg-[#0a660a] text-black font-bold disabled:bg-white disabled:text-gray-500 rounded-md h-10 border-none"
=======
          className="border border-white bg-[#0a660a] text-black font-bold disabled:bg-white disabled:text-gray-500 rounded-md h-10 outline-none border-none"
>>>>>>> Stashed changes
          disabled={!save}
        >
          submit
        </button>
      </form>
    </main>
  );
}
