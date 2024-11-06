"use client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import "../../globals.css";
import { CSSProperties } from "react";
import UploadIcon from "../../../public/upload-folder-svgrepo-com (2).svg";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Plyr from "plyr-react";
import "plyr/dist/plyr.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import Tick from "@/../public/tick.svg";
import Image from "next/image";

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

  const [display, setDisplay] = useState(false);
  const [submitted, setSubmitted] = useState<form>({
    title: "",
    imageUrl: "",
    videoUrl: "",
  });

  const save =
    Boolean(form.title) && Boolean(form.imageUrl) && Boolean(form.videoUrl);
  const handleSubmit = async (e: any) => {
    setDisplay(false);
    console.log(form);
    try {
      const response = await axios.post("/api/Materials", form);
      console.log("Form submitted successfully:", response.data);
      setSubmitted(response.data);
      // alert("Upload Completed");
      setForm({
        title: "",
        videoUrl: "",
        imageUrl: "",
      });
      const re1 = await axios.get("/api/Materials");
      const data = re1.data;
      setDisplay(true);
      console.log(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className=" lg:container lg:mx-auto flex min-h-screen items-start justify-around  p-24 pt-10">
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={!display ? { x: 0, opacity: 1 } : { x: "-4%", opacity: 1 }}
        transition={{ duration: 1 }}
        className=" w-[600px] p-10 rounded-[10px] shadow-2xl"
      >
        <form
          action=""
          className="flex flex-col font-plus w-full gap-y-10 "
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

          <div className="space-y-[80px]">
            <div className="flex flex-col">
              <label htmlFor="" className="font-plus pb-2 font-medium">
                Upload Thumbnail
              </label>
              <UploadDropzone
                endpoint="attachImage"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  setForm((prevForm) => ({
                    ...prevForm,
                    imageUrl: res[0].appUrl,
                  }));
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                className="px-16 border border-gray-300 rounded-[8px] p-5 h-[150px]"
                appearance={{
                  uploadIcon: {
                    // backgroundColor: "gray",
                    borderRadius: "50%",
                    marginTop: "30px",
                  },
                  allowedContent: {
                    // contentVisibility: "hidden",
                    color: "black",
                  },
                  button: {
                    position: "relative",
                    top: "60px",
                    backgroundColor: "black",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    borderRadius: "7px",
                    color: "white",
                    fontWeight: "bold",
                    width: "132%",
                    // content: "upload file",
                  },
                }}
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label htmlFor="" className="font-plus pb-2 font-medium">
                Upload Video
              </label>
              <UploadDropzone
                endpoint="attachVideo"
                onClientUploadComplete={(res) => {
                  console.log("Files: ", res);
                  setForm((prevForm) => ({
                    ...prevForm,
                    videoUrl: res[0].appUrl,
                  }));
                }}
                onUploadError={(error: Error) => {
                  alert(`ERROR! ${error.message}`);
                }}
                className="px-16 border border-gray-300 rounded-[8px] p-5 h-[150px]"
                appearance={{
                  uploadIcon: {
                    // backgroundColor: "gray",
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
                    top: "60px",
                    backgroundColor: "black",
                    paddingTop: "20px",
                    paddingBottom: "20px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "bold",
                    width: "132%",
                    content: "upload file",
                  },
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border border-white disabled:bg-[#cfcdcd] bg-black text-white disabled:text-gray-400 font-bold  rounded-[8px] h-10 outline-none disabled:rounded-md mt-10"
            disabled={!save}
          >
            submit
          </button>
        </form>
      </motion.div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        animate={!display ? { x: 0, opacity: 0 } : { x: "2%", opacity: 1 }}
        transition={{ duration: 1 }}
        className={`h-44 w-[40%] p-5 pr-0 rounded-md ${
          !display ? "hidden" : "block mt-32"
        }`}
      >
        {submitted ? (
          <div className="shadow-2xl rounded-[30px] pl-5 py-5">
            <div className="flex items-center justify-start gap-x-3">
              <div className="rounded-[12px] flex items-center justify-start w-[200px] relative border-none">
                <Plyr
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: submitted.videoUrl,
                        type: "video/mp4",
                      },
                    ],
                  }}
                  options={{
                    controls: [
                      "play-large",
                      "play",
                      "progress",
                      "current-time",
                      "mute",
                      "volume",
                      "fullscreen",
                    ],
                  }}
                />
                {/* <div className="absolute bottom-0 h-20 transition-all ease-in-out bg-gray-300 text-black opacity-100 w-full flex items-center justify-center rounded-b-[12px] ">
                    {submitted.title}
                  </div> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="absolute top-0 bottom-0 right-0 left-0"></div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[1000px] border-none p-0 rounded-md">
                    <div className="w-full h-full m-0">
                      <Plyr
                        source={{
                          type: "video",
                          sources: [
                            {
                              src: submitted.videoUrl,
                              type: "video/mp4",
                            },
                          ],
                        }}
                        options={{
                          autoplay: true,
                          controls: [
                            "play-large",
                            "play",
                            "progress",
                            "current-time",
                            "mute",
                            "volume",
                            "fullscreen",
                          ],
                        }}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-col items-center justify-start w-full gap-x-3">
                <div className="w-full">
                  {submitted.title.length > 26
                    ? `${submitted.title.slice(0, 26)}...`
                    : submitted.title}
                </div>
                <div className="flex justify-end gap-x-2 w-full items-center pr-10">
                  <span className="text-green-600 font-bold">Submitted</span>
                  <span>
                    <Image src={Tick} alt="Tick" className="h-10 w-10" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </motion.div>
    </main>
  );
}
