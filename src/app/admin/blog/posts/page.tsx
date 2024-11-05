"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const page = () => {
  const [posts, setposts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/Blog");
      const data = response.data;
      setposts(data);
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };
  return (
    <div className="w-[74%] ring-1 ring-black rounded-[30px] flex justify-center items-start pt-10">
      page
    </div>
  );
};

export default page;
