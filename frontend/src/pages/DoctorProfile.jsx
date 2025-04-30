import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const { doctor } = useContext(StoreContext);
  const navigate = useNavigate();

  const [doctorData, setDoctorData] = useState({
    name: '', email: '', speciality: '', degree: '', experience: '',
    about: '', fees: '', available: false,
    address: { line1: '', line2: '' }
  });

  const [initialData, setInitialData] = useState({});
  const [doctorInfo, setDoctorInfo] = useState({});
  const [images, setImages] = useState('');
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  useEffect(() => {
    if (doctor?.id) {
      setIsLoading(true);
      axios.get(`http://localhost:5000/doctor/info/${doctor.id}`)
        .then(({ data }) => {
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
          setInitialData(formatted);
          setImages(data.image);
          setIsLoading(false);
        })
        .catch(err => {
          console.error("Error fetching doctor info:", err);
          setIsLoading(false);
        });
    }
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

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = images || assets.profile_pic;

    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', uploadPreset);
      try {
        const res = await axios.post(cloudinaryUrl, uploadData);
        imageUrl = res.data.secure_url;
      } catch (error) {
        alert("Image upload failed");
        return;
      }
    }

    const updatedData = { ...doctorData, image: imageUrl };

    if (deepEqual(initialData, doctorData) && imageUrl === images) {
      alert("No changes detected.");
      setIsEdit(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/doctor/edit/${doctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        setDoctorInfo(updatedData);
        setInitialData(updatedData);
        setImages(imageUrl);
        setIsEdit(false);
        setFile(null);
      } else {
        alert("Failed to update");
      }
    } catch (err) {
      console.error("Error updating doctor:", err);
    }
  };

  const renderInput = (label, name, type = 'text', options = null) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-gray-700">{label}</label>
      {isEdit ? (
        options ? (
          <select
            name={name}
            className="bg-gray-100 rounded-md h-10 px-3 outline-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 transition-all duration-300"
            value={doctorData[name]}
            onChange={handleChange}
          >
            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            name={name}
            type={type}
            className="bg-gray-100 rounded-md h-10 px-3 outline-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 transition-all duration-300"
            value={doctorData[name]}
            onChange={handleChange}
          />
        )
      ) : (
        <p className="text-blue-500 bg-gray-50 rounded-md h-10 flex items-center px-3">
          {doctorInfo[name] || 'N/A'}
        </p>
      )}
    </div>
  );

  const renderAddressInput = (label, name) => (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-gray-700">{label}</label>
      {isEdit ? (
        <input
          name={name}
          type="text"
          className="bg-gray-100 rounded-md h-10 px-3 outline-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 transition-all duration-300"
          value={doctorData.address[name]}
          onChange={handleChange}
        />
      ) : (
        <p className="text-blue-500 bg-gray-50 rounded-md h-10 flex items-center px-3">
          {doctorInfo.address?.[name] || 'N/A'}
        </p>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6FFF]"></div>
      </div>
    );
  }

  if (!doctorInfo) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto mt-5 px-4 sm:h-[calc(85vh)] sm:overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-2xl p-6 shadow-lg sm:h-full">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
          <label htmlFor="doc-img" className="cursor-pointer relative group">
            <div className="relative">
              <img
                src={file ? URL.createObjectURL(file) : images || assets.profile_pic}
                alt="Profile"
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-[#5f6FFF]/20 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-[#5f6FFF]/40"
              />
              {isEdit && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  Click to change
                </div>
              )}
            </div>
            {isEdit && <input type="file" hidden id="doc-img" onChange={handleFileChange} accept="image/*" />}
          </label>
          <div className="text-center w-full">
            {isEdit ? (
              <input
                name="name"
                className="text-lg lg:text-xl font-bold text-center w-full outline-none bg-gray-100 py-2 rounded-md focus:ring-2 focus:ring-[#5f6FFF]/20 transition-all duration-300"
                value={doctorData.name}
                onChange={handleChange}
              />
            ) : (
              <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{doctorInfo.name}</h2>
            )}
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#5f6FFF]/10 rounded-full">
            <span className="w-2 h-2 bg-[#5f6FFF] rounded-full animate-pulse"></span>
            <p className="text-[#5f6FFF] font-medium text-sm lg:text-base">Available for Consultation</p>
          </div>
        </div>

        {/* Right Section */}
        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 flex flex-col gap-4 lg:gap-6 sm:overflow-y-auto sm:pr-2">
          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            {renderInput("Email", "email", "email")}
            {renderInput("Speciality", "speciality", "text", [
              "General Physician", "Gynecologist", "Dermatologist", "Pediatricians",
              "Neurologist", "Gastroenterologist"
            ])}
            {renderInput("Education", "degree")}
            {renderInput("Experience", "experience", "text", [
              "1 year", "2 year", "3 year", "4 year", "5 year",
              "6 year", "7 year", "8 year", "9 year", "10 year"
            ])}
            {renderInput("Fees", "fees", "number")}
            {renderAddressInput("Address Line 1", "line1")}
            {renderAddressInput("Address Line 2", "line2")}
          </div>

          {/* About */}
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">About</label>
            {isEdit ? (
              <textarea
                name="about"
                className="bg-gray-100 rounded-md p-3 outline-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 transition-all duration-300 min-h-[100px] lg:min-h-[120px]"
                value={doctorData.about}
                onChange={handleChange}
              />
            ) : (
              <p className="text-blue-500 bg-gray-50 rounded-md p-3 min-h-[100px] lg:min-h-[120px]">
                {doctorInfo.about || 'No description'}
              </p>
            )}
          </div>

          {/* Available */}
          <div className="flex items-center gap-3">
            <label className="font-medium">Available:</label>
            {isEdit ? (
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="available" 
                  checked={doctorData.available} 
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5f6FFF]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5f6FFF]"></div>
              </label>
            ) : (
              <label className="relative inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={doctorInfo.available} 
                  readOnly
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5f6FFF]"></div>
              </label>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 sm:sticky sm:bottom-0 bg-white py-2">
            {isEdit ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setDoctorData(initialData);
                    setIsEdit(false);
                    setFile(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-4 lg:px-6 py-2 rounded-full hover:bg-gray-300 transition-all duration-300 hover:shadow-md text-sm lg:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#5f6FFF] text-white px-4 lg:px-6 py-2 rounded-full hover:bg-[#4a5ae8] transition-all duration-300 hover:shadow-md text-sm lg:text-base"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="border-2 border-[#5f6FFF] text-[#5f6FFF] px-4 lg:px-6 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all duration-300 hover:shadow-md text-sm lg:text-base"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorProfile;
