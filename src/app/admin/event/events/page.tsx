"use client";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import EmptyList from "@/../public/better.gif";
import { BackgroundGradient } from "../../../../components/ui/background-gradient";

const page = () => {
  interface post {
    name: string;
    details: string;
    location: string;
    date: string;
  }
  const [posts, setPosts] = useState<post[]>([]);
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
      setCheckEmpty(data.length === 0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts.length > 0) {
        const newCountdowns = { ...countdowns };
        posts.forEach((post, index) => {
          newCountdowns[index] = calculateCountdown(post.date);
        });
        setCountdowns(newCountdowns);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [posts, countdowns]);

  return (
    <div className="w-[74%] min-h-[40vh] rounded-[30px] shadow-2xl flex items-center justify-center py-5">
      {!posts[0] && !checkEmpty && (
        <div className="flex items-center justify-center">
          <Progress value={13} className="w-[30%]" />
        </div>
      )}
      <div className="">
        {checkEmpty && posts.length === 0 && (
          <div className="flex items-center justify-center pt-10 flex-col">
            <div>No Posts Yet!</div>
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

      <ul className="p-5 flex flex-wrap gap-7 justify-center">
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
              className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-slate-400 flex flex-col rounded-[22px w-[400px] h-[400px] gap-10  items-center p-5 relative"
            >
              <BackgroundGradient className="rounded-[22px] w-[300px]  dark:bg-zinc-900">
                <div
                  className=" px-3 py-2  w-full text-center text-white text-[18px]"
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
                  className=" px-3 py-2  w-full text-center text-white text-[18px]"
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
                  className=" px-3 py-2  w-full text-center text-white text-[18px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.location.length > 30
                        ? post.location.slice(0, 30) + "..."
                        : post.location,
                  }}
                />
              </BackgroundGradient>
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max absolute bottom-5">
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
