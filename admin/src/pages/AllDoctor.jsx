import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllDoctor = () => {

  const navigate=useNavigate()
const [doctor,setDoctor]=useState([]);

useEffect(() => {
  // Fetch data from backend
  axios.get('http://localhost:5000/doctor')
       // Backend API endpoint
    .then(response => {
     
      setDoctor(response.data); // Store the data in state
    })
    .catch(error => {
      console.error("Error fetching doctor data:", error);
    });
   
}, []);



const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:5000/doctor/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setDoctor(prev => prev.filter(doc => doc._id !== id)); // remove from UI
      alert('Doctor deleted successfully!');
    } else {
      alert('Failed to delete the Doctor.');
    }
  } catch (error) {
    console.error('Error deleting doctor:', error);
    alert('An error occurred while deleting the doctor.');
  }
};




  return (
    <div className='m-5 max-h-[91vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium '>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-10 pt-5 gap-y-6 mb-20'>
        {
          doctor.map((item,index)=>(

            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group ' key={index}>
<img className='bg-indigo-50 group-hover:bg-[#5f6FFF] transition-all duration-500' src={item.image} alt="" />
<div className='p-4'>
  <p className='text-neutral-800 text-lg font-medium '>{item.name}</p>
  <p className='text-zinc-600 text-sm'>{item.speciality}</p>
  <div className='mt-2 flex items-center gap-1 text-sm'>
    <input type='checkbox' checked={item.available}/>
    <p>Available</p>
  </div>
</div>
<div className="buttons flex justify-between pl-4 pr-4 pb-2">
  <button onClick={()=>{navigate(`/edit-doctor/${item._id}`)}} className='bg-[#5f6FFF] pl-4 pr-4 rounded rounded-full text-white cursor-pointer '>Edit</button>
  <button onClick={()=>{handleDelete(item._id)}} className='bg-[#5f6FFF] pl-4 pr-4 rounded rounded-full text-white cursor-pointer'>Delete</button>
</div>
            </div>

          ))
        }
      </div>
    </div>
  )
}

export default AllDoctor
