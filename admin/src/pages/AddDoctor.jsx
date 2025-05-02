import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    address: { line1: '', line2: '' }
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'line1' || name === 'line2') {
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let imageUrl;
    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', uploadPreset);

      try {
        const res = await axios.post(cloudinaryUrl, uploadData);
        imageUrl = res.data.secure_url;
      } catch (error) {
        console.error("Image upload error:", error.response?.data || error);
        alert("Image upload failed");
        setIsSubmitting(false);
        return;
      }
    }

    const updatedData = { ...formData, image: imageUrl };

    try {
      const response = await fetch(`http://localhost:5000/doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Doctor added successfully!');
        navigate('/');
      } else {
        alert('Failed to add doctor. Please try again.');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('An error occurred while adding the doctor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='h-[85vh]  bg-[#F2F3FF]  w-[100%]'>
      <div className='max-w-4xl   mx-auto py-8 px-4 sm:px-6 lg:px-8'>
        <div className='bg-white h-[82vh] overflow-y-auto rounded-2xl shadow-xl overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] px-8 py-6 sticky top-0 z-10'>
            <h1 className='text-2xl font-bold text-white'>Add New Doctor</h1>
            <p className='text-white/80 mt-1'>Fill in the details to add a new doctor to the system</p>
          </div>

          <form onSubmit={handleSubmit} className='p-8'>
            {/* Image Upload Section */}
            <div className='mb-8'>
              <div className='flex items-center gap-6 p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#5f6FFF] transition-colors duration-300'>
                <label htmlFor="doc-img" className='cursor-pointer'>
                  <div className='relative group'>
                    <img 
                      className='w-24 h-24 rounded-full object-cover bg-white shadow-md group-hover:shadow-lg transition-all duration-300' 
                      src={file ? URL.createObjectURL(file) : assets.upload_area} 
                      alt="Doctor" 
                    />
                    <div className='absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </div>
                </label>
                <input 
                  name='image' 
                  type="file" 
                  id="doc-img" 
                  onChange={handleFileChange} 
                  accept="image/*"
                  className='hidden' 
                />
                <div>
                  <p className='text-gray-700 font-medium'>Upload Doctor's Photo</p>
                  <p className='text-gray-500 text-sm mt-1'>Click to upload or drag and drop</p>
                </div>
              </div>
            </div>

            {/* Form Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              {/* Left Column */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Doctor Name</label>
                  <input 
                    name='name' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300' 
                    type="text" 
                    placeholder="Enter doctor's name" 
                    required 
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Email Address</label>
                  <input 
                    name='email' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300' 
                    type="email" 
                    placeholder="Enter email address" 
                    required 
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Experience</label>
                  <select 
                    name='experience' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300'
                    required
                  >
                    <option value="">Select experience</option>
                    {[...Array(11)].map((_, i) => (
                      <option key={i} value={`${i} Year${i !== 1 ? 's' : ''}`}>
                        {i} Year{i !== 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Consultation Fees</label>
                  <div className='relative'>
                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-500'>₹</span>
                    <input 
                      name='fees' 
                      onChange={handleChange} 
                      className='w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300' 
                      type="number" 
                      placeholder="Enter consultation fees" 
                      required 
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Speciality</label>
                  <select 
                    name='speciality' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300'
                    required
                  >
                    <option value="">Select speciality</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatricians">Pediatricians</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Education</label>
                  <input 
                    name='degree' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300' 
                    type="text" 
                    placeholder="Enter education details" 
                    required 
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Address</label>
                  <input 
                    name='line1' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300' 
                    type="text" 
                    placeholder="Address line 1" 
                    required 
                  />
                  <input 
                    name='line2' 
                    onChange={handleChange} 
                    className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300' 
                    type="text" 
                    placeholder="Address line 2" 
                    required 
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className='mt-8 space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>About Doctor</label>
              <textarea 
                name='about' 
                onChange={handleChange} 
                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF]/20 focus:border-[#5f6FFF] transition-all duration-300 resize-none' 
                placeholder="Write about the doctor's experience and expertise..."
                rows={4}
                required 
              />
            </div>

            {/* Submit Button */}
            <div className='mt-8 flex justify-end'>
              <button 
                type='submit'
                disabled={isSubmitting}
                className='bg-[#5f6FFF] text-white px-8 py-3 rounded-lg hover:bg-[#4a5ae8] transition-colors duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Adding Doctor...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Doctor</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
