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

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  useEffect(() => {
    if (doctor?.id) {
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
        })
        .catch(err => console.error("Error fetching doctor info:", err));
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
            className="bg-gray-100 rounded-md h-10 px-3 outline-[#5f6FFF]"
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
            className="bg-gray-100 rounded-md h-10 px-3 outline-[#5f6FFF]"
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
          className="bg-gray-100 rounded-md h-10 px-3 outline-[#5f6FFF]"
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

  if (!doctorInfo) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 px-4">
      <div className="flex flex-col lg:flex-row gap-10 bg-white rounded-lg p-6 shadow-lg">

        {/* Left Section */}
        <div className="w-full lg:w-1/3 flex flex-col items-center gap-4">
          <label htmlFor="doc-img" className="cursor-pointer relative group">
            <img
              src={file ? URL.createObjectURL(file) : images || assets.profile_pic}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-2 border-blue-300 transition-transform duration-300 group-hover:scale-105"
            />
            {isEdit && (
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                Click to change
              </div>
            )}
            {isEdit && <input type="file" hidden id="doc-img" onChange={handleFileChange} />}
          </label>
          <div className="text-center w-full">
            {isEdit ? (
              <input
                name="name"
                className="text-xl font-bold text-center w-full outline-none bg-gray-100 py-2 rounded-md"
                value={doctorData.name}
                onChange={handleChange}
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{doctorInfo.name}</h2>
            )}
          </div>
        </div>

        {/* Right Section */}
        <form onSubmit={handleSubmit} className="w-full lg:w-2/3 flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-4">
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
                className="bg-gray-100 rounded-md p-3 outline-[#5f6FFF]"
                rows={4}
                value={doctorData.about}
                onChange={handleChange}
              />
            ) : (
              <p className="text-blue-500 bg-gray-50 rounded-md p-3">
                {doctorInfo.about || 'No description'}
              </p>
            )}
          </div>

          {/* Available */}
          <div className="flex items-center gap-3">
            <label className="font-medium">Available:</label>
            {isEdit ? (
              <input type="checkbox" name="available" checked={doctorData.available} onChange={handleChange} />
            ) : (
              <input type="checkbox" checked={doctorInfo.available} readOnly />
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            {isEdit ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setDoctorData(initialData);
                    setIsEdit(false);
                    setFile(null);
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
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
