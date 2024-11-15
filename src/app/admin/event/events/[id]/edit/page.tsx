"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { Editor } from "primereact/editor";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

const page = () => {
  interface event {
    _id: string;
    name: string;
    details: string;
    location: string;
    date: Dayjs;
  }

  const [event, setEvent] = useState<event>({
    _id: "",
    name: "",
    details: "",
    location: "",
    date: dayjs(),
  });

  const { id } = useParams();
  const fetchPost = async () => {
    try {
      console.log(id);
      const response = await fetch("/api/Event");
      const data = await response.json();
      const selectById = data.find((event: any) => event._id == id);
      console.log(data);
      console.log(selectById);
      if (selectById) {
        setEvent({
          _id: selectById._id,
          name: selectById.name,
          details: selectById.details,
          location: selectById.location,
          date: dayjs(selectById.date),
        });
      }
    } catch (err) {
      console.log("Error Fetching Event:", err);
    }
  };

  const handleEdit = async () => {
    try {
      console.log(event);
      const response = await axios.put("/api/Event", event);
      console.log("submitted SuccesFully:", response.data);

      if (response.data) {
        toast.success("تم التعديل بنجاح!");
        setTimeout(() => {
          window.location.href = "/admin/event/events";
        }, 1500);
      } else {
        toast.error("حدث خطأ ما، يرجى المحاولة مرة أخرى!");
      }
      setEvent({
        _id: "",
        name: "",
        details: "",
        location: "",
        date: dayjs(),
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
    if (event.name && event.details && event.location && event.date) {
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
    <div className="sm:w-[74%] w-[95%] rounded-[30px] flex justify-center items-center min-h-[65vh] shadow-2xl py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col items-center justify-center gap-y-5 sm:w-[80%] w-full"
      >
        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">اسم الحدث</label>
          <Editor
            value={event.name}
            onTextChange={(e: any) =>
              setEvent({ ...event, name: e.htmlValue || "" })
            }
            style={
              window.innerWidth > 768
                ? { height: "60px", fontSize: "17px" }
                : { height: "70px", fontSize: "15px", paddingBottom: "10px" }
            }
            className="  rounded-md  pt-3 outline-none w-[80%] shadow-xl"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">تفاصيل الحدث</label>
          <Editor
            value={event.details}
            onTextChange={(e: any) =>
              setEvent({ ...event, details: e.htmlValue || "" })
            }
            style={
              window.innerWidth > 768
                ? { height: "60px", fontSize: "17px" }
                : { height: "70px", fontSize: "15px", paddingBottom: "10px" }
            }
            className="  rounded-md  pt-3 outline-none w-[80%] shadow-xl"
          />
        </div>

        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">موقع الحدث</label>
          <Editor
            value={event.location}
            onTextChange={(e: any) =>
              setEvent({ ...event, location: e.htmlValue || "" })
            }
            style={
              window.innerWidth > 768
                ? { height: "60px", fontSize: "17px" }
                : { height: "70px", fontSize: "15px", paddingBottom: "10px" }
            }
            className="  rounded-md  pt-3 outline-none w-[80%] shadow-xl"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">تاريخ الحدث</label>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Controlled picker"
                value={event.date}
                onChange={(newValue) => setEvent({ ...event, date: newValue })}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="flex justify-center w-full">
          <button
            className={`bg-red-700 text-white font-bold sm:px-44 px-32 py-2 rounded-[4px] outline-none`}
            onClick={() => {
              handleEdit();
              buttonEffect();
            }}
          >
            {!progrees && <>تعديل الحدث!</>}
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
