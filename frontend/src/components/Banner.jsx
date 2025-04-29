import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { StoreContext } from '../context/StoreContext'

const Banner = () => {
  const navigate = useNavigate()
  const { setShowLogin, state, setState } = useContext(AppContext)
  const { setShowLogin2 } = useContext(StoreContext)

  return (
    <div className='relative overflow-hidden bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] rounded-2xl px-4 sm:px-6 md:px-8 lg:px-12 my-10 md:my-20 mx-4 md:mx-10 shadow-xl'>
      <div className='flex flex-col md:flex-row items-center justify-between py-8 sm:py-10 md:py-16 lg:py-20'>
        {/* Left side - Content */}
        <div className='flex-1 text-center md:text-left mb-8 md:mb-0'>
          <div className='space-y-4'>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight'>
              Book Appointment
              <span className='block mt-2'>With 100+ Trusted Doctors</span>
            </h1>
            <p className='text-white/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto md:mx-0'>
              Find and book appointments with the best doctors in your area. Quick, easy, and reliable healthcare at your fingertips.
            </p>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8'>
            <button 
              onClick={() => { setShowLogin(true); scrollTo(0, 0) }} 
              className='bg-white text-[#5f6FFF] px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              Create Account
            </button>
            <button 
              onClick={() => { setState("Doctor"); setShowLogin2(true); scrollTo(0, 0) }} 
              className='bg-white border-2 border-white text-[#5f6FFF] px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#5f6FFF] transform hover:scale-105 transition-all duration-300'
            >
              Doctor Signup
            </button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
          <div className='relative w-full h-[300px] lg:h-[400px]'>
            <img 
              className='absolute bottom-0 right-0 w-full max-w-md object-contain transform hover:scale-105 transition-transform duration-500' 
              src={assets.appointment_img} 
              alt="Appointment" 
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16'></div>
      <div className='absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 translate-y-20'></div>
    </div>
  )
}

export default Banner
