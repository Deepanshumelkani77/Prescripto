import React from "react";
import { assets } from "../assets/assets";
import { useParams } from "react-router-dom";
import { useState,useEffect } from 'react'
import axios from 'axios'

const EditDoctor = () => {

const [formData,setFormData]=useState({name:'',email:'',speciality:'',degree:'',experience:'',about:'',fees:'',address:{line1:'',line2:''} })
const [file, setFile] = useState(null);

const {id}=useParams();
const [doctor,setDoctor]=useState({});
useEffect(() => {
  // Fetch data from backend
  axios.get(`http://localhost:5000/doctor/${id}`)
       // Backend API endpoint
    .then(response => {
     
      setDoctor(response.data); // Store the data in state
      setFormData({name:response.data.name ,email:response.data.email,speciality:response.data.speciality,degree:response.data.degree,experience:response.data.experience,about:response.data.about,fees:response.data.fees,address:{line1:response.data.address?.line1 || '',line2:response.data.address?.line2 || ''}})
    })
    .catch(error => {
      console.error("Error fetching doctor data:", error);
    });
   
}, []);


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
    setFormData(prev => ({ ...prev, [name]: value }));
  }
};

const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};


const cloudinaryUrl ="https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload"
const uploadPreset ="Prescripto"




const handleSubmit = async (e) => {
  e.preventDefault();

  // Start with the existing image URL; if no new file is selected, we keep it
  let imageUrl;

  // If a new file is selected, upload it to Cloudinary
  if (file) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', uploadPreset)

    try {
      const res = await axios.post( cloudinaryUrl,uploadData);
      imageUrl = res.data.secure_url; 
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error);
      alert("Image upload failed");
      return; // Stop if image upload fails
    }
  }

  // Combine the form data with the image URL
  const updatedData = { ...formData, image: imageUrl };

  try {
    const response = await fetch(`http://localhost:5000/doctor/edit/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      alert('Doctor updated successfully!');
      navigate('/');
    } else {
      console.error('Failed to update doctor');
    }
  } catch (error) {
    console.error('Error update doctor:', error);
  }
};





  return (
    <form className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Edit Doctor</p>

      <div className='bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-lg'>
        <div className='flex flex-items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt="" />
          </label>
          <input type="file" value={doctor.image} onChange={handleFileChange} id="doc-img" hidden />
          <p>
            Upload doctor <br />
            picture
          </p>
          <div>
            <img  className='w-16 bg-gray-100 rounded-full cursor-pointer' src={doctor.image} alt="" />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input className='border border-gray-300 rounded px-3 py-2 ' type="text" placeholder={doctor.name} value={formData.name} onChange={handleChange} name='name'  required />
            </div>

           
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input className='border border-gray-300 rounded px-3 py-2' type="email" placeholder={doctor.email} value={formData.email} onChange={handleChange} name='email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select className='border border-gray-300 rounded px-3 py-2' value={formData.experience} onChange={handleChange} name='experience' id="">
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input className='border border-gray-300 rounded px-3 py-2' type="number" placeholder={doctor.fees} value={formData.fees} onChange={handleChange} name='fees' required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='border border-gray-300 rounded px-3 py-2' placeholder={doctor.speciality} value={formData.speciality} onChange={handleChange} name='speciality'  id="">
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input className='border border-gray-300 rounded px-3 py-2' type="text" placeholder={doctor.degree} value={formData.degree} onChange={handleChange} name='degree' required />
            </div>
            <p>Address</p>
            <div className='flex-1 flex flex-col gap-7'>
              
              <input className='border border-gray-300 rounded px-3 py-2' type="text" placeholder={doctor.address?.line1 || ''} value={formData.address?.line1} onChange={handleChange} name='line1' required />
              <input className='border border-gray-300 rounded px-3 py-2' type="text" placeholder={doctor.address?.line2 || ''} value={formData.address?.line2} onChange={handleChange} name='line2' required />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea className='w-full px-4 pt-2 border rounded border-gray-300'
            type="text"
            placeholder={doctor.about}
            rows={5}
            value={formData.about}
            name='about'
            onChange={handleChange}
            required
          />
        </div>

        <button className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full'>Save information</button>
      </div>
    </form>
  );
};

export default EditDoctor;
