import React, { useContext, useState, useEffect } from 'react';
import { assets1 } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const DoctorAppointment = () => {
  const { doctor } = useContext(StoreContext);
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

  const calculateAge = (dob) => {
    if (!dob) return '-';
  
    const birthDate = new Date(dob);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
  
    // Adjust age if birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
  
    return age;
  };
  const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '-';
    
    const date = new Date(dateTimeStr);
  
    // If parsing fails
    if (isNaN(date.getTime())) return dateTimeStr;
  
    return date.toLocaleString('en-US', {
      dateStyle: 'long', // e.g. April 18, 2025
      timeStyle: 'short', // e.g. 10:00 AM
    });
  };
  



  const [doctors,setDoctors]=useState([])
  const [myDoctor,setMyDoctor]=useState({})
  useEffect(() => {
    if (doctor?.email) {
      axios.get('http://localhost:5000/doctor')
        .then(response => {
          const doctorsData = response.data;
          setDoctors(doctorsData);
  
          const matchedDoctor = doctorsData.find(doc => doc.email === doctor.email);
          if (matchedDoctor) {
            setMyDoctor(matchedDoctor);
          }
        })
        .catch(error => {
          console.error("Error fetching doctor data:", error);
        });
    }
  }, [doctor]);
  
  

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300 font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointment
            .filter(item => item.doc_id?._id === myDoctor._id)
            .map((item, index) => (
              <div
                key={index}
                className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-300 hover:bg-gray-50'
              >
                <p className='max-sm:hidden'>{index + 1}</p>

                <div className='flex items-center gap-2'>
                  <img className='w-8 rounded-full' src={item.user_id?.image} alt="user" />
                  <p>{item.user_id?.username}</p>
                </div>

                <div>not yet</div>

                <p className='max-sm:hidden'>{calculateAge(item.user_id?.dob)}</p>

                <p>{formatDateTime(`${item.date} ${item.time}`)}</p>

                <p>$50</p>

                <div className='flex gap-2'>
                  <img className='w-6 cursor-pointer' src={assets1.cancel_icon} alt="cancel" />
                  <img className='w-6 cursor-pointer' src={assets1.tick_icon} alt="confirm" />
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default DoctorAppointment;
