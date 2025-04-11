import React, { useState } from "react";
import { assets } from "../assets/assets";
import {useNavigate} from 'react-router-dom'

const AddDoctor = () => {

  const navigate = useNavigate();
const [formData,setFormData]=useState({name:'',image:'',email:'',speciality:'',degree:'',experience:'',about:'',fees:'',address:{line1:'',line2:''} })

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
};





  return (
    <form className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium'>Edit Doctor</p>

      <div className='bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-lg'>
        <div className='flex flex-items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={assets.upload_area} alt="" />
          </label>
          <input name='image' type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input name='name' className='border border-gray-300 rounded px-3 py-2 ' type="text" placeholder="name" required />
            </div>

           
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input name='email' className='border border-gray-300 rounded px-3 py-2' type="email" placeholder="email" required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select name='experience' className='border border-gray-300 rounded px-3 py-2'  id="">
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
              <input name='fees' className='border border-gray-300 rounded px-3 py-2' type="number" placeholder="fees" required />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select name='speciality' className='border border-gray-300 rounded px-3 py-2'  id="">
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
              <input name='education' className='border border-gray-300 rounded px-3 py-2' type="text" placeholder="education" required />
            </div>
            <p>Address</p>
            <div className='flex-1 flex flex-col gap-7'>
              
              <input name='line1' className='border border-gray-300 rounded px-3 py-2' type="text" placeholder="address1" required />
              <input name='line2' className='border border-gray-300 rounded px-3 py-2' type="text" placeholder="address12" required />
            </div>
          </div>
        </div>

        <div>
          <p className='mt-4 mb-2'>About Doctor</p>
          <textarea name='about' className='w-full px-4 pt-2 border rounded border-gray-300'
            type="text"
            placeholder="write about doctor"
            rows={5}
            required
          />
        </div>

        <button className='bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full'>Save information</button>
      </div>
    </form>
  );
};

export default AddDoctor;
