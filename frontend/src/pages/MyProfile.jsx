import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", phone_no: "", address: "", gender: "", dob: "" });
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  useEffect(() => {
    axios.get(`http://localhost:5000/user/info/${user.id}`)
      .then((res) => {
        const data = res.data;
        setUserInfo(data);
        setUserData({
          name: data.username || "",
          email: data.email || "",
          phone_no: data.phone_no || "",
          address: data.address || "",
          gender: data.gender || "",
          dob: data.dob ? data.dob.slice(0, 10) : "",
        });
        setImage(data.image);
      })
      .catch((err) => console.error("Error fetching user data:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = image || assets.profile_pic;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      try {
        const res = await axios.post(cloudinaryUrl, formData);
        imageUrl = res.data.secure_url;
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed");
        return;
      }
    }

    const updatedData = { ...userData, image: imageUrl };

    try {
      const res = await fetch(`http://localhost:5000/user/edit/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        alert("Profile updated successfully!");
        setUserInfo(updatedData);
        setImage(imageUrl);
        setIsEdit(false);
      } else {
        console.error("Failed to update user");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!userInfo) return <div className="text-center text-gray-600 mt-10">Loading profile...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Left Side: Profile Picture */}
        <div className="lg:w-1/3 w-full bg-[#5f6FFF] text-white flex flex-col items-center justify-center p-6">
          <label htmlFor="profile-pic" className="cursor-pointer group">
            <img
              className="w-40 h-40 object-cover rounded-full border-4 border-white transition-all duration-300 group-hover:scale-105"
              src={file ? URL.createObjectURL(file) : image || assets.profile_pic}
              alt="Profile"
            />
            {isEdit && (
              <input id="profile-pic" type="file" hidden onChange={handleFileChange} />
            )}
          </label>

          {isEdit ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="mt-5 bg-white text-gray-700 px-3 py-2 rounded-lg w-3/4"
              placeholder="Your Name"
            />
          ) : (
            <h2 className="text-2xl font-semibold mt-5">{userInfo.username}</h2>
          )}
        </div>

        {/* Right Side: Profile Info */}
        <div className="lg:w-2/3 w-full p-6 space-y-6">
          
          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3 underline">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 font-medium">Email</label>
                <p className="text-gray-700 mt-1">{userInfo.email}</p>
              </div>
              <div>
                <label className="text-gray-600 font-medium">Phone</label>
                {isEdit ? (
                  <input
                    name="phone_no"
                    value={userData.phone_no}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    placeholder="Phone Number"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userInfo.phone_no || "N/A"}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-600 font-medium">Address</label>
                {isEdit ? (
                  <input
                    name="address"
                    value={userData.address}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    placeholder="Address"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userInfo.address || "N/A"}</p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-gray-800 mb-3 underline">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-600 font-medium">Gender</label>
                {isEdit ? (
                  <select
                    name="gender"
                    value={userData.gender}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-700 mt-1">{userInfo.gender || "N/A"}</p>
                )}
              </div>
              <div>
                <label className="text-gray-600 font-medium">Date of Birth</label>
                {isEdit ? (
                  <input
                    type="date"
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                  />
                ) : (
                  <p className="text-gray-700 mt-1">{userInfo.dob?.slice(0, 10) || "N/A"}</p>
                )}
              </div>
            </div>
          </section>

          <div className="pt-4">
            {isEdit ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-[#5f6FFF] text-white rounded-full hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 border border-[#5f6FFF] text-[#5f6FFF] rounded-full hover:bg-[#5f6FFF] hover:text-white transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
