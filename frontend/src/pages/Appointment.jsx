import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointment = () => {
  const { user } = useContext(AppContext);
  const { docId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // State for appointment
  const [appointment, setAppointment] = useState({
    user_id: '',
    day: '',
    date: '',
    time: '',
    doc_id: docId
  });

  // Doctor info state
  const [doctor, setDoctor] = useState(null);

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/doctor/${docId}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        toast.error('Failed to load doctor information');
      } finally {
        setIsLoading(false);
      }
    };

    if (docId) {
      fetchDoctor();
    }
  }, [docId]);

  // Generate dates for the next 7 days
  const generateDateSlots = () => {
    const dates = [];
    const today = new Date();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Format date as YYYY-MM-DD without timezone conversion
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      // Disable past dates and today's date if all slots are passed
      const isPastDate = i === 0 && currentHour >= 17; // After 5 PM
      
      dates.push({
        date: date,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        dateString: dateString, // Use the manually formatted date string
        disabled: isPastDate
      });
    }
    
    return dates;
  };

  const dateSlots = generateDateSlots();

  // Fetch available slots when date is selected
  const fetchAvailableSlots = async (dateString) => {
    try {
      setIsLoading(true);
      // Parse the date string directly (format: YYYY-MM-DD)
      const [year, month, day] = dateString.split('-');
      const localDate = new Date(year, month - 1, day);
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      // Store the display date without timezone conversion
      const displayDate = new Date(localDate);
      
      const response = await axios.get(
        `http://localhost:5000/appointment/available-slots/${docId}/${formattedDate}`
      );
      
      // Ensure we're working with time strings in consistent format (HH:MM)
      const normalizeTime = (timeStr) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      };
      
      // Process available slots
      const processedAvailableSlots = (response.data.availableSlots || []).map(normalizeTime);
      const processedBookedSlots = (response.data.bookedSlots || []).map(normalizeTime);
      
      // Log for debugging
      console.log('Fetched slots for date:', formattedDate, {
        availableSlots: processedAvailableSlots,
        bookedSlots: processedBookedSlots
      });
      
      setAvailableSlots(processedAvailableSlots);
      setBookedSlots(processedBookedSlots);
      setSelectedDate(formattedDate);
      setSelectedSlot(null);
      
      // Update appointment with selected date
      setAppointment(prev => ({
        ...prev,
        day: localDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        date: formattedDate,
        time: ''
      }));
      
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast.error('Failed to load available time slots');
      setAvailableSlots([]);
      setBookedSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle slot selection
  const handleSlotSelect = (time) => {
    setSelectedSlot(time);
    setAppointment(prev => ({
      ...prev,
      time: time
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to book an appointment');
      navigate('/login');
      return;
    }
    
    if (!appointment.date || !appointment.time) {
      toast.error('Please select a date and time slot');
      return;
    }
    
    try {
      setIsBooking(true);
      // Ensure we're using the correct date format for the backend
      const [year, month, day] = appointment.date.split('-');
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      const payload = {
        ...appointment,
        date: formattedDate, // Use the properly formatted date
        user_id: user.id,
        doc_id: docId,
        // Add timezone information
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
      console.log('Sending appointment data:', payload);
      const response = await axios.post('http://localhost:5000/appointment', payload);
      
      if (response.status === 201) {
        toast.success('Appointment booked successfully!');
        // Reset form
        setSelectedDate(null);
        setSelectedSlot(null);
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      if (error.response && error.response.status === 409) {
        toast.error('This time slot is no longer available. Please select another slot.');
        // Refresh available slots
        if (selectedDate) {
          fetchAvailableSlots(selectedDate);
        }
      } else {
        toast.error('Failed to book appointment. Please try again.');
      }
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading && !doctor) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className='w-16 h-16 border-4 border-[#5f6FFF] border-t-transparent rounded-full animate-spin'></div>
        <p className='mt-4 text-gray-600'>Loading doctor information...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <p className='text-red-500 text-lg'>Doctor not found</p>
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
              src={doctor.image || 'https://via.placeholder.com/300'} 
              alt={doctor.name} 
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300';
              }}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden rounded-2xl'></div>
          </div>

          <div className='lg:w-2/3 p-6 lg:p-8 space-y-4'>
            <div className='flex items-center gap-3'>
              <h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>{doctor.name}</h1>
              <img className='w-6 h-6' src={assets.verified_icon} alt="Verified" />
            </div>

            <div className='flex flex-wrap items-center gap-3'>
              <p className='text-gray-600'>{doctor.degree} - {doctor.speciality}</p>
              <span className='px-3 py-1 bg-[#5f6FFF]/10 text-[#5f6FFF] rounded-full text-sm'>
                {doctor.experience} Years Experience
              </span>
              {doctor.city && (
                <span className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center'>
                  <svg className='w-4 h-4 mr-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  {doctor.city}
                </span>
              )}
            </div>

            <div className='space-y-2'>
              <h2 className='text-xl font-semibold text-gray-900'>About</h2>
              <p className='text-gray-600 leading-relaxed'>{doctor.about || 'No description available.'}</p>
            </div>

            <div className='flex items-center gap-2 text-lg'>
              <span className='text-gray-600'>Appointment fee:</span>
              <span className='font-semibold text-[#5f6FFF]'>₹{doctor.fees || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Section */}
      <div className='bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 mb-6'>Book Your Appointment</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Date Selection */}
          <div className='mb-8'>
            <h3 className='text-lg font-semibold text-gray-700 mb-4'>Select Date</h3>
            <div className='flex gap-4 overflow-x-auto pb-4'>
              {dateSlots.map((slot, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => !slot.disabled && fetchAvailableSlots(slot.dateString)}
                  disabled={slot.disabled}
                  className={`flex flex-col items-center justify-center py-3 px-4 rounded-lg border ${
                    selectedDate === slot.dateString
                      ? 'border-[#5f6fff] bg-blue-50'
                      : slot.disabled
                      ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      : 'border-gray-200 hover:border-[#5f6fff] hover:bg-blue-50'
                  }`}
                >
                  <span className='text-sm font-medium'>{slot.day}</span>
                  <span className='text-xl font-bold mt-1'>{slot.date.getDate()}</span>
                  <span className='text-xs'>{slot.date.toLocaleString('default', { month: 'short' })}</span>
                  {slot.disabled && <span className="text-xs text-red-500 mt-1">Closed</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              {selectedDate ? (() => {
                // Get the selected date object from the dateSlots array
                const selectedSlot = dateSlots.find(slot => 
                  slot.dateString === selectedDate
                );
                
                if (selectedSlot) {
                  const date = selectedSlot.date;
                  return `Available Time Slots for ${date.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}`;
                }
                
                // Fallback in case selectedSlot is not found
                const [year, month, day] = selectedDate.split('-');
                const date = new Date(year, month - 1, day);
                return `Available Time Slots for ${date.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}`;
                
              })() : 'Select a date to see available slots'}
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5f6fff]"></div>
                </div>
              ) : availableSlots && availableSlots.length > 0 ? (
                availableSlots.map((slot, index) => {
                  const isBooked = bookedSlots && bookedSlots.includes(slot);
                  const isSelected = selectedSlot === slot;
                  
                  if (isBooked) {
                    return (
                      <div 
                        key={index}
                        className="py-3 px-4 rounded-lg text-center font-medium text-sm bg-red-100 text-red-600 cursor-not-allowed opacity-75"
                        title="This slot is already booked"
                      >
                        {slot}
                        <span className="block text-xs mt-1">Booked</span>
                      </div>
                    );
                  }
                  
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSlotSelect(slot)}
                      className={`py-3 px-4 rounded-lg text-center font-medium text-sm transition-all duration-200 ${
                        isSelected 
                          ? 'bg-[#5f6fff] text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })
              ) : selectedDate ? (
                <div className="col-span-full text-center py-4 text-gray-500">
                  No available time slots for this date. Please select another date.
                </div>
              ) : null}
            </div>
          </div>

          {/* Book Now Button */}
          <div className='mt-8'>
            <button
              type="submit"
              disabled={isBooking || !selectedSlot}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${
                isBooking || !selectedSlot
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#5f6FFF] hover:bg-[#4a5ae8] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isBooking ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;