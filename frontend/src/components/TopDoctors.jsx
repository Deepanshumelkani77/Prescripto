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
      <div className='flex flex-col items-center gap-6 py-16'>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '0.2s' }}></div>
        </div>
        <p className='text-gray-600 font-medium'>Loading our expert doctors...</p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8'>
        {doctor.slice(0, 12).map((item, index) => (
          <div
            key={index}
            onClick={() => { navigate(`./appointment/${item._id}`); scrollTo(0, 0) }}
            className='group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer w-full max-w-[320px] mx-auto border border-gray-100'
          >
            {/* Image Section */}
            <div className='relative h-56 overflow-hidden'>
              <img 
                className='w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform  duration-700' 
                src={item.image} 
                alt={item.name} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover: transition-opacity duration-500'></div>
            </div>
            
            {/* Content Section */}
            <div className='p-6 space-y-4'>
              {/* Doctor Info */}
              <div className='space-y-2'>
                <h3 className='text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300'>
                  Dr. {item.name}
                </h3>
                <p className='text-gray-600 text-sm font-medium'>{item.speciality}</p>
              </div>

              {/* Stats Row */}
              <div className='flex items-center justify-between py-3 border-t border-gray-100'>
                <div className='flex items-center gap-2 text-sm text-gray-600'>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center">
                    <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <span className="font-medium">{item.experience} Years</span>
                </div>
                
                <div className='text-right'>
                  <div className='text-2xl font-bold text-blue-600'>₹{item.fees}</div>
                  <div className='text-xs text-gray-500'>Consultation</div>
                </div>
              </div>

              {/* Rating */}
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
                <span className='text-sm text-gray-600 font-medium'>4.9 (120 reviews)</span>
              </div>

              {/* Badges Row */}
              <div className='flex items-center justify-between pt-2'>
                {/* Speciality Badge */}
                <div className='bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-2 rounded-full text-xs font-semibold shadow-md'>
                  {item.speciality}
                </div>
                
                {/* Availability Badge */}
                <div className='bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-2 shadow-md border border-green-200'>
                  <span className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></span>
                  <p className='text-sm text-green-600 font-semibold'>Available</p>
                </div>
              </div>

              {/* CTA Button */}
              <button className='w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:shadow-xl'>
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Appointment
                </span>
              </button>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500/30 rounded-full animate-pulse delay-500"></div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => { navigate('/doctor'); scrollTo(0, 0) }}
          className='group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 shadow-lg'
        >
          <span className="flex items-center justify-center gap-2">
            View All Doctors
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  )
}

export default TopDoctors
