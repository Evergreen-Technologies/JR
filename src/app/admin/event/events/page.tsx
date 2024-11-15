"use client";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale("ar");

import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import EmptyList from "@/../public/better.gif";
import { BackgroundGradient } from "../../../../components/ui/background-gradient";
import { format } from "path";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import View from "@/../public/view.svg";
import Delete from "@/../public/delete.svg";
import Edit from "@/../public/edit.svg";
import Link from "next/link";

const page = () => {
  interface post {
    _id: string;
    name: string;
    details: string;

    location: string;
    date: string;
  }
  const [posts, setPosts] = useState([]);
  const [checkEmpty, setCheckEmpty] = useState(false);
  const [countdowns, setCountdowns] = useState<{
    [key: number]: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    };
  }>({});

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/Event");
      const data = response.data;
      console.log(data);
      data.reverse();
      setPosts(data);
      if (data.length === 0) {
        setCheckEmpty(true);
      }
    } catch (err) {
      console.error("Error Fetching content:", err);
    }
  };

  const deletePost = async (id: any) => {
    try {
      // Ensure the ID is sent correctly in the request body
      const response = await fetch(`/api/Event`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Set the content type
        },
        body: JSON.stringify({ id }), // Send the id in the body
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedPosts = posts.filter((post: any) => post._id !== id); // Use _id for filtering

      setPosts(updatedPosts.reverse());
      console.log("Event deleted successfully:", await response.json());
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const calculateCountdown = (eventDate: string) => {
    const now = dayjs();
    const distance = dayjs(eventDate).diff(now);

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length > 0) {
        const newCountdowns = { ...countdowns };
        posts.forEach((post: post, index) => {
          newCountdowns[index] = calculateCountdown(post.date);
        });
        setCountdowns(newCountdowns);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [posts, countdowns]);

  return (
    <div className="sm:w-[74%] w-[90%] min-h-[40vh] rounded-[30px] shadow-2xl flex items-start justify-center py-5">
      {!posts[0] && !checkEmpty && (
        <div className="flex items-start justify-center w-[80%] pt-12">
          <Progress value={progress} className="w-[30%]" />
        </div>
      )}
      <div className="">
        {checkEmpty && posts.length === 0 && (
          <div className="flex items-center justify-center pt-10 flex-col">
            <div className="text-[18px] font-sans">
              لا يوجد سجل للأحداث بعد!
            </div>
            <div className="pt-14">
              <span>
                <Image
                  src={EmptyList}
                  alt="Empty List!"
                  className="h-[60px] w-[60px]"
                />
              </span>
            </div>
          </div>
        )}
      </div>

      <ul className="p-3 flex flex-wrap gap-7 justify-center">
        {posts.map((post: post, index) => {
          const countdown = countdowns[index] || {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
          return (
            <div
              key={index}
              className="sm:rounded-[22px] rounded-[15px] max-w-sm p-2 sm:p-10  flex flex-col rounded-[22px sm:w-[400px] w-[290px] sm:h-[400px] h-[370px] gap-5  items-center  relative shadow-xl"
            >
              <div className="flex w-full justify-end gap-x-3 items-center relative -top-5">
                <div className="relative top-[3px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image src={View} alt="View" className="h-6 w-6" />
                    </DialogTrigger>
                    <DialogContent className="p-1 sm:p-10 bg-white flex flex-col gap-10  items-center text-black sm:h-[80%] sm:min-w-[40%]">
                      <div
                        key={index}
                        className=" h-full w-full flex items-center justify-around flex-col"
                      >
                        <div className="flex w-full justify-end gap-x-3 items-center relative -top-3">
                          <div className="relative -top-[2px]">
                            <Link href={`/admin/event/events/${post._id}/edit`}>
                              <Image
                                src={Edit}
                                alt="View"
                                className="h-6 w-6"
                              />
                            </Link>
                          </div>
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Image
                                  src={Delete}
                                  alt="View"
                                  className="h-6 w-6"
                                />
                              </DialogTrigger>

                              <DialogContent>
                                <div className="flex flex-col w-[300px] h-[170px] rounded-[6px] items-center justify-center gap-y-5">
                                  <div className="text-[17px]">
                                    هل أنت متأكد من رغبتك في حذف هذا الحدث؟
                                  </div>
                                  <div className="flex items-center justify-end w-full pr-10 gap-x-3">
                                    <DialogTrigger asChild>
                                      <button>إلغاء</button>
                                    </DialogTrigger>
                                    <DialogTrigger>
                                      <button
                                        className="text-white bg-red-600   px-4 py-2 rounded-md"
                                        onClick={() => {
                                          deletePost(post._id);
                                        }}
                                      >
                                        حذف
                                      </button>
                                    </DialogTrigger>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className=" sm:w-[600px] w-[350px]  dark:bg-zinc-900  border-b border-b-slate-700 sm:pb-3 pb-1 text-[12px] sm:text-[17px]">
                          <div
                            className=" px-3 py-1  w-full text-center text-black sm:text-[18px] text-[14px] "
                            dangerouslySetInnerHTML={{
                              __html: post.name,
                            }}
                          />
                        </div>
                        <div className=" sm:w-[600px] w-[350px]  dark:bg-zinc-900  border-b border-b-slate-700 sm:pb-3 pb-1 text-[12px] sm:text-[17px]">
                          <div
                            className=" px-3 py-1  w-full text-center text-black  sm:text-[18px] text-[14px]"
                            dangerouslySetInnerHTML={{
                              __html: post.details,
                            }}
                          />
                        </div>
                        <div className=" sm:w-[600px] w-[350px]  dark:bg-zinc-900  border-b border-b-slate-700 sm:pb-3 pb-1 text-[12px] sm:text-[17px]">
                          <div
                            className=" px-3 py-1  w-full text-center text-black  sm:text-[18px] text-[14px]"
                            dangerouslySetInnerHTML={{
                              __html: post.location,
                            }}
                          />
                        </div>
                        <div className=" sm:w-[600px] w-[350px]  dark:bg-zinc-900  border-b border-b-slate-700 sm:pb-3 pb-1 text-[12px] sm:text-[17px]">
                          <div className=" px-3 py-1  w-full text-center text-black sm:text-[18px] text-[14px]">
                            <div className="flex items-center justify-center">
                              <span className="w-1/2 border-r pr-3 border-r-black">
                                {dayjs(post.date)
                                  .locale("ar")
                                  .format("DD MMM, YYYY")}
                              </span>
                              <span className="w-1/2">
                                {dayjs(post.date).locale("ar").format("h:mm A")}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max sm:pt-0 pt-10">
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.days }}
                              ></span>
                            </span>
                            أيام
                          </div>
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.hours }}
                              ></span>
                            </span>
                            ساعات
                          </div>
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.minutes }}
                              ></span>
                            </span>
                            دقائق
                          </div>
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.seconds }}
                              ></span>
                            </span>
                            ثواني
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div>
                  <Link href={`/admin/event/events/${post._id}/edit`}>
                    <Image src={Edit} alt="View" className="h-6 w-6" />
                  </Link>
                </div>
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image src={Delete} alt="View" className="h-6 w-6" />
                    </DialogTrigger>
                    <DialogContent>
                      <div className="flex flex-col w-[400px] h-[170px] rounded-[6px] items-center justify-center gap-y-5">
                        <div className="text-[17px] font-bold">
                          هل أنت متأكد أنك تريد حذف هذا الحدث؟
                        </div>
                        <div className="flex items-center justify-end w-full pr-10 gap-x-3">
                          <DialogTrigger asChild>
                            <button>إلغاء</button>
                          </DialogTrigger>
                          <DialogTrigger>
                            <button
                              className="text-white bg-red-600 font-bold  px-4 py-2 rounded-md"
                              onClick={() => {
                                deletePost(post._id);
                              }}
                            >
                              حذف
                            </button>
                          </DialogTrigger>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className=" sm:w-[300px] w-[250px]  dark:bg-zinc-900 border-b border-b-slate-600 pb-2">
                <div
                  className=" px-3 py-1  w-full text-center text-black sm:text-[16px] text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.name.length > 30
                        ? post.name.slice(0, 30) + "..."
                        : post.name,
                  }}
                />
              </div>
              <div className=" sm:w-[300px] w-[250px]  dark:bg-zinc-900 border-b border-b-slate-600 pb-2">
                <div
                  className=" px-3 py-1  w-full text-center text-black sm:text-[16px] text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.details.length > 30
                        ? post.details.slice(0, 30) + "..."
                        : post.details,
                  }}
                />
              </div>
              <div className=" sm:w-[300px] w-[250px]  dark:bg-zinc-900 border-b border-b-slate-600 pb-2">
                <div
                  className=" px-3 py-1  w-full text-center text-black sm:text-[16px] text-[14px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.location.length > 30
                        ? post.location.slice(0, 30) + "..."
                        : post.location,
                  }}
                />
              </div>
              <div className=" sm:w-[300px] w-[250px]  dark:bg-zinc-900 border-b border-b-slate-600 pb-2">
                <div className=" px-3 py-1  w-full text-center text-black sm:text-[16px] text-[14px]">
                  <div className="flex items-center justify-center">
                    <span className="w-1/2 border-r pr-3 border-r-black">
                      {dayjs(post.date).format("MMM DD, YYYY")}
                    </span>
                    <span className="w-1/2">
                      {dayjs(post.date).format("h:mm A")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-flow-col gap-5 text-center auto-cols-max absolute bottom-3 sm:text-[15px] text-[13px]">
                <div className="flex flex-col">
                  <span className="countdown font-mono sm:text-5xl text-4xl">
                    <span style={{ "--value": countdown.days }}></span>
                  </span>
                  أيام
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono sm:text-5xl text-4xl">
                    <span style={{ "--value": countdown.hours }}></span>
                  </span>
                  ساعات
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono sm:text-5xl text-4xl">
                    <span style={{ "--value": countdown.minutes }}></span>
                  </span>
                  دقائق
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono sm:text-5xl text-4xl">
                    <span style={{ "--value": countdown.seconds }}></span>
                  </span>
                  ثواني
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
