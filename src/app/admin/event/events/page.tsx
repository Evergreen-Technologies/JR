"use client";
import axios from "axios";
import dayjs from "dayjs";
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
      data.length == 0 ? setCheckEmpty(true) : null;
    } catch (err) {
      console.error("Error Fetching content:", err);
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
    <div className="w-[74%] min-h-[40vh] rounded-[30px] shadow-2xl flex items-start justify-center py-5">
      {!posts[0] && !checkEmpty && (
        <div className="flex items-start justify-center w-[80%] pt-12">
          <Progress value={progress} className="w-[30%]" />
        </div>
      )}
      <div className="">
        {checkEmpty && posts.length === 0 && (
          <div className="flex items-center justify-center pt-10 flex-col">
            <div className="text-[18px] font-sans">
              No Record of Events Yet!
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
            <BackgroundGradient
              key={index}
              className="rounded-[22px] max-w-sm p-2 sm:p-10  dark:bg-slate-400 flex flex-col rounded-[22px w-[400px] h-[400px] gap-5  items-center  relative"
            >
              <div className="flex w-full justify-end gap-x-3 items-center relative -top-5">
                <div className="relative top-[3px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image src={View} alt="View" className="h-6 w-6" />
                    </DialogTrigger>
                    <DialogContent className=" min-h-[600px] w-[750px] text-black font-bold">
                      <BackgroundGradient
                        key={index}
                        className="  p-2 sm:p-10  dark:bg-slate-400 flex flex-col   gap-10  items-center  h-full"
                      >
                        <div className="flex w-full justify-end gap-x-3 items-center relative -top-5">
                          <div className="relative top-[3px]"></div>
                          <div>
                            <Image src={Edit} alt="View" className="h-6 w-6" />
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
                                <div className="flex flex-col w-[450px] h-[200px] rounded-[10px] items-center justify-center gap-y-5">
                                  <div>
                                    Are you sure you want to delete this Event?
                                  </div>
                                  <div className="flex items-center justify-end w-full pr-10 gap-x-3">
                                    <button>Cancel</button>
                                    <button className="text-white bg-red-600 font-bold border border-slate-500 px-4 py-2 rounded-md">
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <BackgroundGradient className="rounded-[22px] w-[600px]  dark:bg-zinc-900">
                          <div
                            className=" px-3 py-1  w-full text-center text-black font-bold text-[18px]"
                            dangerouslySetInnerHTML={{
                              __html: post.name,
                            }}
                          />
                        </BackgroundGradient>
                        <BackgroundGradient className="rounded-[22px] w-[600px]  dark:bg-zinc-900">
                          <div
                            className=" px-3 py-1  w-full text-start text-black font-bold text-[18px]"
                            dangerouslySetInnerHTML={{
                              __html: post.details,
                            }}
                          />
                        </BackgroundGradient>
                        <BackgroundGradient className="rounded-[22px] w-[600px]  dark:bg-zinc-900">
                          <div
                            className=" px-3 py-1  w-full text-center text-black font-bold text-[18px]"
                            dangerouslySetInnerHTML={{
                              __html: post.location,
                            }}
                          />
                        </BackgroundGradient>
                        <BackgroundGradient className="rounded-[22px] w-[600px]  dark:bg-zinc-900">
                          <div className=" px-3 py-1  w-full text-center text-black font-bold text-[18px]">
                            <div className="flex items-center justify-center">
                              <span className="w-1/2 border-r pr-3">
                                {dayjs(post.date).format("MMM DD, YYYY")}
                              </span>
                              <span className="w-1/2">
                                {dayjs(post.date).format("h:mm A")}
                              </span>
                            </div>
                          </div>
                        </BackgroundGradient>

                        <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.days }}
                              ></span>
                            </span>
                            days
                          </div>
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.hours }}
                              ></span>
                            </span>
                            hours
                          </div>
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.minutes }}
                              ></span>
                            </span>
                            min
                          </div>
                          <div className="flex flex-col">
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": countdown.seconds }}
                              ></span>
                            </span>
                            sec
                          </div>
                        </div>
                      </BackgroundGradient>
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
                          Are you sure you want to delete this Event?
                        </div>
                        <div className="flex items-center justify-end w-full pr-10 gap-x-3">
                          <button>Cancel</button>
                          <button className="text-white bg-red-600 font-bold  px-4 py-2 rounded-md">
                            Delete
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <BackgroundGradient className="rounded-[22px] w-[300px]  dark:bg-zinc-900">
                <div
                  className=" px-3 py-1  w-full text-center text-white text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.name.length > 30
                        ? post.name.slice(0, 30) + "..."
                        : post.name,
                  }}
                />
              </BackgroundGradient>
              <BackgroundGradient className="rounded-[22px] w-[300px]  dark:bg-zinc-900">
                <div
                  className=" px-3 py-1  w-full text-center text-white text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.details.length > 30
                        ? post.details.slice(0, 30) + "..."
                        : post.details,
                  }}
                />
              </BackgroundGradient>
              <BackgroundGradient className="rounded-[22px] w-[300px]  dark:bg-zinc-900">
                <div
                  className=" px-3 py-1  w-full text-center text-white text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.location.length > 30
                        ? post.location.slice(0, 30) + "..."
                        : post.location,
                  }}
                />
              </BackgroundGradient>
              <BackgroundGradient className="rounded-[22px] w-[300px]  dark:bg-zinc-900">
                <div className=" px-3 py-1  w-full text-center text-white text-[16px]">
                  <div className="flex items-center justify-center">
                    <span className="w-1/2 border-r pr-3">
                      {dayjs(post.date).format("MMM DD, YYYY")}
                    </span>
                    <span className="w-1/2">
                      {dayjs(post.date).format("h:mm A")}
                    </span>
                  </div>
                </div>
              </BackgroundGradient>

              <div className="grid grid-flow-col gap-5 text-center auto-cols-max absolute bottom-3">
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.days }}></span>
                  </span>
                  days
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.hours }}></span>
                  </span>
                  hours
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.minutes }}></span>
                  </span>
                  min
                </div>
                <div className="flex flex-col">
                  <span className="countdown font-mono text-5xl">
                    <span style={{ "--value": countdown.seconds }}></span>
                  </span>
                  sec
                </div>
              </div>
            </BackgroundGradient>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
