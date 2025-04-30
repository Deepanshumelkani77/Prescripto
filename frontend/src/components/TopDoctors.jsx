import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const TopDoctors = () => {
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    axios.get('http://localhost:5000/doctor')
      .then(response => {
        setDoctor(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <div className='w-16 h-16 border-4 border-[#5f6FFF] border-t-transparent rounded-full animate-spin'></div>
        <p className='text-gray-600'>Loading doctors...</p>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center gap-6 my-16 text-gray-900 w-full'>
      <div className='text-center space-y-3'>
        <h1 className='text-3xl font-bold bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] bg-clip-text text-transparent'>
          Top Doctors to Book
        </h1>
        <p className='sm:w-1/2 mx-auto text-gray-600'>
          Simply browse through our extensive list of trusted doctors and book your appointment with ease.
        </p>
      </div>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-4'>
        {doctor.slice(0, 12).map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`./appointment/${item._id}`); scrollTo(0, 0) }}
            className='group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer w-full max-w-[290px] mx-auto'
          >
            <div className='relative h-48 overflow-hidden'>
              <img 
                className='bg-blue-50 w-full h-full object-contain object-center transform group-hover:scale-110 transition-transform duration-500' 
                src={item.image} 
                alt={item.name} 
              />
              <div className=' absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300'></div>
              
              {/* Availability Badge */}
              <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-md'>
                <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                <p className='text-sm text-green-600 font-medium'>Available</p>
              </div>
            </div>
            
            <div className='p-4 space-y-2'>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 group-hover:text-[#5f6FFF] transition-colors duration-300'>
                  {item.name}
                </h3>
                <p className='text-gray-600 text-sm mt-1'>{item.speciality}</p>
              </div>

              <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <svg className='w-4 h-4 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <span>{item.experience} Experience</span>
                </div>
                <div className='text-[#5f6FFF] font-semibold'>
                  ₹{item.fees}
                </div>
              </div>

              <button className='w-full py-2 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300'>
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => { navigate('/doctor'); scrollTo(0, 0) }}
        className='mt-8 px-8 py-3 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-full font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
      >
        View All Doctors
      </button>
    </div>
  )
}

export default TopDoctors
