"use client";
import Link from "next/link";
import { title } from "process";
import { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [isNewPost, setIsNewPost] = useState(true);
  const [posts, setposts] = useState([]);
  const [active, setActive] = useState("new");
  interface post {
    title: string;
    post: string;
    date: Date;
  }

  const [post, setPost] = useState<post>({
    title: "this is title",
    post: "this is the content of the post!",
    date: new Date(),
  });

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/Blog");
      const data = response.data;
      setposts(data);
    } catch (err) {
      console.log("Error Fetching content:", err);
    }
  };

  const handleSubmit = async () => {
    console.log(post);
    try {
      const response = await axios.post("/api/Blog", post);
      console.log("submitted SuccesFully:", response.data);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex lg:container lg:mx-auto pt-10 justify-between">
      <div className="w-[17%] ring-1 ring-black rounded-[30px] h-[40vh] flex flex-col items-center justify-start pt-20 gap-y-10">
        <button
          onClick={() => {
            setActive((prevactive) => "new");
            setIsNewPost(!isNewPost);
          }}
          className={`${
            active == "new" ? "border-b-[2px] border-b-black" : ""
          }`}
        >
          New Post
        </button>
        <button
          onClick={() => {
            setActive((prevactive) => "post");
            setIsNewPost(!isNewPost);
          }}
          className={`${
            active == "postx" ? "border-b-[2px] border-b-black" : ""
          }`}
        >
          Blog Posts
        </button>
      </div>
      <div className="w-[77%] ring-1 ring-black rounded-[30px] flex justify-center items-start pt-10">
        {active == "new" && (
          <form
            action=""
            // className="w-full flex justify-center"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col items-center justify-center gap-y-3 w-[80%]"
          >
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="">Title</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                className="border border-black h-12 rounded-md pl-3"
              />
            </div>
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="">Post</label>
              <textarea
                value={post.post}
                onChange={(e) => setPost({ ...post, post: e.target.value })}
                className="border border-black h-32 rounded-md pl-3 pt-3"
              />
            </div>
            <div className="flex justify-end w-full">
              <button
                className="bg-[#085008] font-bold text-white px-6 py-2"
                onClick={handleSubmit}
              >
                Post
              </button>
            </div>
          </form>
        )}

        {active == "post" && (
          <div className="w-full">
            {!posts ? (
              <div>Loading...</div>
            ) : (
              <ul className="w-full space-x-2">
                {posts.map((post: post, index) => (
                  <li key={index} className="ring-1 w-[70%]">
                    <div className="text-black border-b-[1px] border-b-gray-300 w-full">
                      <p>{post.title}</p>
                      <p>{post.post}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
