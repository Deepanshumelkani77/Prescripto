import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiEdit2, FiSave, FiUser, FiPhone, FiMail, FiMapPin, FiBriefcase, FiAward, FiDollarSign, FiInfo, FiCheckCircle } from "react-icons/fi";

const DoctorProfile = () => {
  const { doctor } = useContext(StoreContext);
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: '', 
    email: '', 
    speciality: '', 
    degree: '', 
    experience: '',
    about: '', 
    fees: '', 
    available: false,
    address: { line1: '', line2: '' }
  });

  const [doctorInfo, setDoctorInfo] = useState({});
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  const specialities = [
    'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics', 
    'Ophthalmology', 'Gynecology', 'ENT', 'Dentistry', 'General Physician'
  ];

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (doctor?.id) {
        try {
          const { data } = await axios.get(`http://localhost:5000/doctor/info/${doctor.id}`);
          setDoctorInfo(data);
          const formatted = {
            name: data.name,
            email: data.email,
            speciality: data.speciality,
            degree: data.degree,
            experience: data.experience,
            about: data.about,
            fees: data.fees,
            available: data.available,
            address: {
              line1: data.address?.line1 || '',
              line2: data.address?.line2 || ''
            }
          };
          setDoctorData(formatted);
          setImage(data.image);
        } catch (err) {
          console.error("Error fetching doctor info:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchDoctorData();
  }, [doctor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'line1' || name === 'line2') {
      setDoctorData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
      }));
    } else {
      setDoctorData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
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

    const updatedData = { ...doctorData, image: imageUrl };

    try {
      const response = await axios.put(
        `http://localhost:5000/doctor/edit/${doctor.id}`,
        updatedData
      );
      
      if (response.status === 200) {
        setDoctorInfo(updatedData);
        setImage(imageUrl);
        setIsEdit(false);
        setFile(null);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const InfoCard = ({ icon: Icon, label, value, isEdit, name, type = "text", onChange, options, className = "" }) => (
    <div className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}>
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
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : isEdit && type === 'checkbox' ? (
        <div className="flex items-center">
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="ml-2 text-gray-700">{value ? 'Available' : 'Not Available'}</span>
        </div>
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

  if (isLoading) {
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

  if (!doctorInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>No doctor information found. Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Doctor <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Profile</span>
          </h1>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Manage your professional information, update your availability, and connect with patients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-16 sm:h-20 md:h-24"></div>
              <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 -mt-10 sm:-mt-12 relative">
                <div className="flex justify-center">
                  <div className="relative group">
                    <img
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-4 border-white object-cover shadow-lg"
                      src={file ? URL.createObjectURL(file) : image || assets.profile_pic}
                      alt={doctorInfo.name}
                    />
                    {isEdit && (
                      <label className="absolute bottom-0 right-0 bg-white p-1 sm:p-1.5 rounded-full shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                        <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
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
                
                <div className="text-center mt-2 sm:mt-3">
                  {isEdit ? (
                    <input
                      type="text"
                      name="name"
                      value={doctorData.name}
                      onChange={handleChange}
                      className="text-base sm:text-lg md:text-xl font-semibold text-center bg-gray-50 border border-gray-200 rounded-lg px-2 sm:px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">{doctorInfo.name}</h2>
                  )}
                  <p className="text-blue-600 text-xs sm:text-sm mt-0.5">
                    {doctorInfo.speciality || 'Medical Professional'}
                  </p>
                  
                  <div className="mt-1.5 sm:mt-2 flex items-center justify-center">
                    <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium ${
                      doctorInfo.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctorInfo.available ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                  {isEdit ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setDoctorData({
                            ...doctorData,
                            name: doctorInfo.name,
                            email: doctorInfo.email,
                            speciality: doctorInfo.speciality,
                            degree: doctorInfo.degree,
                            experience: doctorInfo.experience,
                            about: doctorInfo.about,
                            fees: doctorInfo.fees,
                            available: doctorInfo.available,
                            address: {
                              line1: doctorInfo.address?.line1 || '',
                              line2: doctorInfo.address?.line2 || ''
                            }
                          });
                          setFile(null);
                          setIsEdit(false);
                        }}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        form="doctor-profile-form"
                        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEdit(true)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                    >
                      <FiEdit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600 mr-2 sm:mr-3">
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-gray-700">Availability Status</h3>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Currently {doctorInfo.available ? 'Available' : 'Not Available'}</span>
                {isEdit && (
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="available"
                      checked={doctorData.available}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <form id="doctor-profile-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Personal Information */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600 mr-2 sm:mr-3">
                    <FiUser className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Personal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <InfoCard
                    icon={FiUser}
                    label="Full Name"
                    name="name"
                    value={doctorData.name}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                  
                  <InfoCard
                    icon={FiMail}
                    label="Email Address"
                    name="email"
                    type="email"
                    value={doctorData.email}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                  
                  <InfoCard
                    icon={FiBriefcase}
                    label="Speciality"
                    name="speciality"
                    value={doctorData.speciality}
                    isEdit={isEdit}
                    type="select"
                    options={specialities}
                    onChange={handleChange}
                  />
                  
                  <InfoCard
                    icon={FiAward}
                    label="Degree"
                    name="degree"
                    value={doctorData.degree}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                  
                  <InfoCard
                    icon={FiBriefcase}
                    label="Experience (years)"
                    name="experience"
                    type="number"
                    value={doctorData.experience}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                  
                  <InfoCard
                    icon={FiDollarSign}
                    label="Consultation Fee (₹)"
                    name="fees"
                    type="number"
                    value={doctorData.fees}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600 mr-2 sm:mr-3">
                    <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Address</h3>
                </div>
                
                <div className="space-y-4">
                  <InfoCard
                    icon={FiMapPin}
                    label="Address Line 1"
                    name="line1"
                    value={doctorData.address.line1}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                  
                  <InfoCard
                    icon={FiMapPin}
                    label="Address Line 2"
                    name="line2"
                    value={doctorData.address.line2}
                    isEdit={isEdit}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* About */}
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg text-blue-600 mr-2 sm:mr-3">
                    <FiInfo className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">About</h3>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-2">
                    <div className="p-1.5 bg-blue-50 rounded-lg text-blue-600 mr-2 sm:mr-3">
                      <FiInfo className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-500">About Me</span>
                  </div>
                  {isEdit ? (
                    <textarea
                      name="about"
                      value={doctorData.about}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Tell patients about your experience, expertise, and approach..."
                    ></textarea>
                  ) : (
                    <p className="text-gray-800 text-sm sm:text-base pl-10 sm:pl-11">
                      {doctorData.about || "No information provided."}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
