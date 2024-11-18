"use client";
import React from "react";
import axios from "axios";
import { Editor } from "primereact/editor";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useTranslation } from "react-i18next";

const Event = () => {
  const { t } = useTranslation();

  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );

  interface event {
    name: string;
    details: string;
    location: string;
    date: Dayjs;
  }
  const [event, setEvent] = useState({
    name: "",
    details: "",
    location: "",
    date: dayjs(),
  });

  const [progrees, setProgress] = useState(false);
  const buttonEffect = () => {
    if (event.name && event.details && event.location && event.date) {
      setProgress(true);
      setTimeout(() => {
        setProgress((prevProgress) => false);
      }, 1000);
    }
  };
  const handleSubmit = async () => {
    console.log(event);
    try {
      const response = await axios.post("/api/Event", event);
      console.log("submitted SuccesFully:", response.data);
      setEvent({
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
  return (
    <div className="sm:w-[74%] w-full rounded-[30px] flex justify-center items-center min-h-[65vh] shadow-2xl py-5">
      <form
        action=""
        // className="w-full flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col items-center justify-center gap-y-5 sm:w-[80%] w-full"
      >
        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">{t("Event_name")}</label>
          <Editor
            value={event.name}
            onTextChange={(e: any) =>
              setEvent({ ...event, name: e.htmlValue || "" })
            }
            style={{ height: "60px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none w-[80%] shadow-xl"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">{t("Event_Details")}</label>
          <Editor
            value={event.details}
            onTextChange={(e: any) =>
              setEvent({ ...event, details: e.htmlValue || "" })
            }
            style={{ height: "60px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none w-[80%] shadow-xl"
          />
        </div>

        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">{t("Event_Loacation")}</label>
          <Editor
            value={event.location}
            onTextChange={(e: any) =>
              setEvent({ ...event, location: e.htmlValue || "" })
            }
            style={{ height: "60px", fontSize: "17px" }}
            className="  rounded-md  pt-3 outline-none w-[80%] shadow-xl"
          />
        </div>
        <div className="flex flex-col w-full gap-y-2 items-center">
          <label htmlFor="">{t("Event_Date")}</label>

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
            className={`bg-red-700 text-white font-bold px-44 py-2 rounded-[4px] outline-none`}
            onClick={() => {
              handleSubmit();
              buttonEffect();
            }}
          >
            {!progrees && <> {t("Publish_Event")}!</>}
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

export default Event;
