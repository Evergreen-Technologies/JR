"use client";

import React, { useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Connect: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_2tta8l2",
          "template_1hhzpif",
          form.current,
          "5rEY4InX6tnqGHy1b"
        )
        .then(
          () => {
            toast.success("تم إرسال الرسالة بنجاح!");
          },
          (error) => {
            toast.error(`Failed to send message. Please try again.${error}`);
          }
        );

      form.current.reset();
    }
  };

  return (
    <div
      className="lg:container lg:mx-auto w-full flex flex-col justify-center items-center pt-20 sm:min-h-[80dvh]  mt-10
      "
      id="contact"
    >
      <div className="sm:w-1/2 w-[90%] text-[14px] sm:text-[18px] rounded-[18px] shadow-2xl p-6">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="flex flex-col px-4 gap-y-3 sm:gap-y-6 pt-3 pb-5 "
        >
          <label htmlFor="">
            الاسم <span className="text-[#7F8386]">(مطلوب)</span>
          </label>
          <div className="w-full flex gap-x-3">
            <span className="w-1/2">
              <label htmlFor="firstname">الاسم الأول</label>
              <input
                type="text"
                id="firstname"
                name="user_firstname"
                className="border border-solid border-black h-10 w-full sm:h-12 pl-5 outline-none bg-white"
                required
              />
            </span>
            <span className="w-1/2">
              <label htmlFor="lastname">الاسم الأخير</label>
              <input
                type="text"
                id="lastname"
                name="user_lastname"
                className="border border-solid border-black h-10 w-full sm:h-12 pl-5 outline-none bg-white"
                required
              />
            </span>
          </div>
          <div>
            <div>
              <label htmlFor="email">البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                name="user_email"
                className="w-full border border-black border-solid h-10 sm:h-12 pl-5 outline-none bg-white"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject">الموضوع</label>
            <input
              type="text"
              id="subject"
              name="user_subject"
              className="w-full border border-black border-solid h-10 sm:h-12 pl-5 outline-none bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="message">الرسالة</label>
            <textarea
              name="message"
              id="message"
              className="w-full border border-black border-solid h-24 sm:h-32 pl-5 pt-3 outline-none bg-white"
              required
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="border px-4 py-2 text-[#F5F9FF] bg-[#951d1d] text-[14px] sm:text-[20px]"
            >
              إرسال
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Connect;
