import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const MyAppointment = () => {
  const { doctors, user } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/appointment')
      .then(response => {
        setAppointment(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointment data:", error);
      });
  }, []);




  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel appointment?');
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:5000/appointment/delete/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setDoctor(prev => prev.filter(doc => doc._id !== id)); // remove from UI
        alert('appointment cancel successfully!');
      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('An error occurred while canceling the appointment.');
    }
  };

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-400'>My Appointment</p>
      <div>
        {
          appointment
            .filter(item => item.user_id === user.id)
            .map((item, index) => (
              <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-400' key={index}>
                <div>
                  <img className='w-32 bg-indigo-50' src={item.doc_id?.image} alt="" />
                </div>

                <div className='flex-1 text-sm text-zinc-600'>
                  <p className='text-neutral-800 font-semibold'>{item.doc_id?.name}</p>
                  <p>{item.doc_id?.speciality}</p>
                  <p className='text-zinc-700 font-medium mt-1'>Address</p>
                  <p className='text-xs'>{item.doc_id?.address?.line1}</p>
                  <p className='text-xs'>{item.doc_id?.address?.line2}</p>
                  <p className='text-xs mt-1'>
                    <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {item.date} | {item.time}
                  </p>
                </div>

                <div className='flex flex-col gap-4'>
                  <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-[#5f6FFF] hover:text-white transition-all duration-300'>Pay Online</button>
                  <button onClick={()=>handleDelete(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default MyAppointment;
