import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase.js";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
console.log(filePerc)
console.log(file);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress))
    });
    ()=>{
      setFileUploadError(true);
    }
  };
  const handleChange = () => {};
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7 ">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files[0])}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
          type="button"
        >
          update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Signup</span>
      </div>
    </div>
  );
};

export default Profile;
