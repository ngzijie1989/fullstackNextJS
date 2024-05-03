import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
 
import { ourFileRouter } from "@/app/lib/uploadThing/core";
 
export const UploadButton = generateUploadButton(ourFileRouter);
export const UploadDropzone = generateUploadDropzone(ourFileRouter);