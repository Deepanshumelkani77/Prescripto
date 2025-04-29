import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import axios from 'axios'

const Appointment = () => {
  const { user } = useContext(AppContext)
  const { docId } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  //state variable for appointment 
  const [appointment, setAppointment] = useState({
    user_id: '',
    day: '',
    date: '',
    time: '',
    doc_id: ''
  });

  useEffect(() => {
    if (user) {
      setAppointment(prev => ({
        ...prev,
        user_id: user.id
      }));
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!appointment.user_id || !appointment.day || !appointment.date || !appointment.time) {
      alert("Please select a date and time slot.");
      return;
    }

    const payload = {
      ...appointment,
      doc_id: docId
    };

    try {
      const res = await axios.post("http://localhost:5000/appointment", payload);
      if (res.status === 200 || res.status === 201) {
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Something went wrong while booking.");
    }
  };

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:5000/doctor')
      .then(response => {
        setDoctors(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
        setIsLoading(false);
      });
  }, []);

  const [docInfo, setDocInfo] = useState({});
  useEffect(() => {
    const found = doctors.find((doc) => doc._id === docId);
    setDocInfo(found || {});
  }, [doctors, docId]);

  //state variable for days
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [slotTime, setSlotTime] = useState('')
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date();
    for (let i = 0; i < 7; ++i) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date()
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  useEffect(() => {
    if (docInfo && Object.keys(docInfo).length > 0) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (isLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='w-16 h-16 border-4 border-[#5f6FFF] border-t-transparent rounded-full animate-spin'></div>
        <p className='mt-4 text-gray-600'>Loading doctor information...</p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      {/* Doctor Profile Section */}
      <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-8'>
        <div className='flex flex-col lg:flex-row'>
          <div className='lg:w-1/3 relative group'>
            <div className='absolute inset-0 bg-gradient-to-br from-[#5f6FFF]/20 to-[#4a5ae8]/20 rounded-2xl transform transition-transform duration-500 group-hover:scale-105'></div>
            <img 
              className='w-full h-64 lg:h-full object-cover rounded-2xl transform transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl' 
              src={docInfo.image} 
              alt={docInfo.name} 
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden rounded-2xl'></div>
            <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-500'>
              <p className='text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
               Book your appointment with {docInfo.name} now!
              </p>
            </div>
          </div>

          <div className='lg:w-2/3 p-6 lg:p-8 space-y-4'>
            <div className='flex items-center gap-3'>
              <h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>{docInfo.name}</h1>
              <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <p className='text-gray-600'>{docInfo.degree} - {docInfo.speciality}</p>
              <span className='px-3 py-1 bg-[#5f6FFF]/10 text-[#5f6FFF] rounded-full text-sm'>
                {docInfo.experience} Experience
              </span>
            </div>

            <div className='space-y-2'>
              <h2 className='text-xl font-semibold text-gray-900 flex items-center gap-2'>
                About <img src={assets.info_icon} alt="Info" className='w-5 h-5' />
              </h2>
              <p className='text-gray-600 leading-relaxed'>{docInfo.about}</p>
            </div>

            <div className='flex items-center gap-2 text-lg'>
              <span className='text-gray-600'>Appointment fee:</span>
              <span className='font-semibold text-[#5f6FFF]'>₹{docInfo.fees}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className='bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Book Your Appointment</h2>

        {/* Date Selection */}
        <div className='mb-8'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>Select Date</h3>
          <div className='flex gap-4 overflow-x-auto pb-4'>
            {docSlots.length && docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setAppointment(prev => ({
                    ...prev,
                    day: item[0] && daysOfWeek[item[0].datetime.getDay()],
                    date: item[0] && item[0].datetime.toDateString(),
                  }));
                }}
                className={`flex flex-col items-center justify-center min-w-[80px] h-[80px] rounded-xl cursor-pointer transition-all duration-300 ${
                  slotIndex === index 
                    ? 'bg-[#5f6FFF] text-white shadow-lg scale-105' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <p className='text-sm font-medium'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p className='text-2xl font-bold'>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        {slotIndex !== null && (
          <div className='mb-8'>
            <h3 className='text-lg font-semibold text-gray-700 mb-4'>Select Time</h3>
            <div className='flex flex-wrap gap-3'>
              {docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlotTime(item.time);
                    setAppointment({ ...appointment, time: item.time.toLowerCase() });
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    item.time === slotTime
                      ? 'bg-[#5f6FFF] text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Book Button */}
        <button
          onClick={handleSubmit}
          className='w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctor docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;


/**  */