import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiSave, FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiUserCheck } from "react-icons/fi";

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", phone_no: "", address: "", gender: "", dob: "" });
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/user/info/${user.id}`);
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
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
        setIsLoading(false);
        return;
      }
    }

    const updatedData = { ...userData, image: imageUrl };

    try {
      const res = await axios.put(`http://localhost:5000/user/edit/${user.id}`, updatedData);
      if (res.status === 200) {
        setUserInfo(updatedData);
        setImage(imageUrl);
        setIsEdit(false);
        // Show success notification
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-200"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  const InfoCard = ({ icon: Icon, label, value, isEdit, name, type = "text", onChange, options }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-2">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600 mr-3">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-sm font-medium text-gray-500">{label}</span>
      </div>
      {isEdit && type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : isEdit ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      ) : (
        <p className="text-gray-800 font-medium pl-11">{value || "Not provided"}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profile</span>
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Manage your personal information, view your activity, and update your profile settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-24"></div>
              <div className="px-6 pb-6 -mt-12 relative">
                <div className="flex justify-center">
                  <div className="relative group">
                    <img
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                      src={file ? URL.createObjectURL(file) : image || assets.profile_pic}
                      alt={userInfo.username}
                    />
                    {isEdit && (
                      <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                        <FiEdit2 className="w-5 h-5 text-blue-600" />
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*"
                        />
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  {isEdit ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="text-xl font-semibold text-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <h2 className="text-xl font-semibold text-gray-900">{userInfo.username}</h2>
                  )}
                  <p className="text-blue-600 text-sm mt-1">
                    Member since {new Date(userInfo.createdAt || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </p>
                </div>

                <div className="mt-6 flex justify-center">
                  {isEdit ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity w-full"
                    >
                      {isLoading ? (
                        'Saving...'
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          Save Changes
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEdit(true)}
                      className="flex items-center justify-center px-6 py-2.5 bg-white text-blue-600 border border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors w-full"
                    >
                      <FiEdit2 className="mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center">
                <FiUserCheck className="mr-2 text-blue-600" />
                Account Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email Verified</span>
                  <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    Verified
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Account Status</span>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Member Since</span>
                  <span className="text-sm font-medium text-gray-700">
                    {new Date(userInfo.createdAt || Date.now()).toLocaleDateString('short')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                {!isEdit && (
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></div>
                    All set!
                  </span>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoCard
                  icon={FiMail}
                  label="Email Address"
                  value={userData.email}
                  isEdit={isEdit}
                  name="email"
                  type="email"
                  onChange={handleChange}
                />
                
                <InfoCard
                  icon={FiPhone}
                  label="Phone Number"
                  value={userData.phone_no}
                  isEdit={isEdit}
                  name="phone_no"
                  type="tel"
                  onChange={handleChange}
                />
                
                <InfoCard
                  icon={FiMapPin}
                  label="Address"
                  value={userData.address}
                  isEdit={isEdit}
                  name="address"
                  type="text"
                  onChange={handleChange}
                />
                
                <InfoCard
                  icon={FiUser}
                  label="Gender"
                  value={userData.gender}
                  isEdit={isEdit}
                  name="gender"
                  type="select"
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Select Gender' },
                    { value: 'Male', label: 'Male' },
                    { value: 'Female', label: 'Female' },
                    { value: 'Other', label: 'Other' },
                    { value: 'Prefer not to say', label: 'Prefer not to say' }
                  ]}
                />
                
                <InfoCard
                  icon={FiCalendar}
                  label="Date of Birth"
                  value={userData.dob}
                  isEdit={isEdit}
                  name="dob"
                  type="date"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your account password</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Change
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Notification Preferences</h3>
                    <p className="text-sm text-gray-500">Manage email and push notifications</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Manage
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Privacy Settings</h3>
                    <p className="text-sm text-gray-500">Control your privacy and data</p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
