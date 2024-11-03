const Navbar = () => {
  const link = [
    { label: "About us", href: "/about_us" },
    { label: "Contact Us", href: "/about_us" },
    { label: "About us", href: "/about_us" },
    { label: "About us", href: "/about_us" },
  ];
  return <nav></nav>;
};

export default Navbar;

<UploadDropzone
  endpoint="mediaPost"
  onClientUploadComplete={(res) => {
    // Do something with the response
    console.log("Files: ", res);
    alert("Upload Completed");
  }}
  onUploadError={(error: Error) => {
    // Do something with the error.
    alert(`ERROR! ${error.message}`);
  }}
  className=" px-16 bg-gray-800 rounded-[10px] border-none"
/>;
