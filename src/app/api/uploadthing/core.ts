import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Image and video Uploader!
  messageAttachment: f(["image", "video"])
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
  // Takes exactly ONE image up to 2MB and 1 video upto 256mb!
  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 3 },
    video: { maxFileSize: "256MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
  // Takes up to 4 2mb images, and the client will not resolve
  // the upload until the `onUploadComplete` resolved.
  withAwaitedServerData: f(
    { image: { maxFileSize: "2MB", maxFileCount: 4 } },
    { awaitServerData: true }
  )
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => {
      return { foo: "bar" as const };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
