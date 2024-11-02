"use client";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import "../../app/globals.css";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form
        action=""
        className="flex flex-col font-plus border border-gray-600 w-[600px] p-10 rounded-[10px] gap-y-2"
      >
        <div className="flex flex-col">
          <label htmlFor="" className="font-plus pb-2">
            Title
          </label>
          <input
            type="text"
            className="border border-solid border-black bg-gray-900 h-12 rounded-[8px] outline-none pl-5"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className="font-plus pb-2">
            Upload Video | Thumbnail
            <span className="text-red-500"> (Optinal)</span>
          </label>
          <UploadDropzone
            endpoint="messageAttachment"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);

              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
            className="px-16 bg-gray-900 rounded-[8px] border-none p-5"
          />
        </div>
      </form>
    </main>
  );
}
