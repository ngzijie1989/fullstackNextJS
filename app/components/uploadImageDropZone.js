import { UploadDropzone } from "@/app/utilis/uploadthing";

function UploadImageDropZone() {
  return (
    <div>
      <UploadDropzone
      className="bg-slate-100 h-28 w-[80%] cursor-pointer m-auto ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
    endpoint="withoutMdwr"
    onClientUploadComplete={(res) => {
      // Do something with the response
      console.log("Files: ", res);
      alert("Upload Completed");
    }}
    onUploadError={(error) => {
      alert(`ERROR! ${error.message}`);
    }}
    onUploadBegin={(name) => {
      // Do something once upload begins
      console.log("Uploading: ", name);
    }}
  />
    </div>
  )
}

export default UploadImageDropZone
