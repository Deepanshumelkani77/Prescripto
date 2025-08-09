import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#5f6FFF] rounded-2xl px-6 md:px-10 lg:px-20 overflow-hidden relative'>
        
        {/* Subtle background pattern */}
        <div className='absolute inset-0 opacity-10'>
          <div className='absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2'></div>
          <div className='absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3'></div>
        </div>

 {/*----------left side ----------*/}
 <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[10vw] md:mb-[-30px] relative z-10'>
    
    {/* Main heading with enhanced styling */}
    <div className='space-y-2'>
      <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight'>
        <span className='block'>Book Appointment</span>
        <span className='block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent'>
          With Trusted Doctors
        </span>
      </h1>
      <div className='w-24 h-1 bg-gradient-to-r from-white to-transparent rounded-full mt-4'></div>
    </div>
    
    {/* Enhanced description section */}
    <div className='flex flex-col md:flex-row items-start md:items-center gap-4 text-white/90'>
      <div className='relative group'>
        <img 
          className='w-32 md:w-28 hover:scale-105 transition-transform duration-300 drop-shadow-lg' 
          src={assets.group_profiles} 
          alt="Trusted doctors" 
        />
        <div className='absolute -inset-1 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>
      </div>
      <div className='space-y-2'>
        <p className='text-lg md:text-base font-medium leading-relaxed'>
          Simply browse through our extensive list of trusted doctors,
        </p>
        <p className='text-base md:text-sm text-white/80 leading-relaxed'>
          schedule your appointment hassle-free and get the care you deserve.
        </p>
      </div>
    </div>
    
    {/* Enhanced CTA button */}
    <a  
      className='group flex items-center gap-3 bg-white hover:bg-gray-50 px-8 py-4 rounded-full text-gray-700 font-semibold text-base m-auto md:m-0 hover:scale-105 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-white/20' 
      href="#speciality"
    >
      <span>Book Appointment</span>
      <div className='flex items-center justify-center w-8 h-8 bg-[#5f6FFF] rounded-full group-hover:rotate-45 transition-transform duration-300'>
        <img className='w-4 filter brightness-0 invert' src={assets.arrow_icon} alt="" />
      </div>
    </a>
    
    {/* Trust indicators */}
    <div className='flex items-center gap-6 text-white/80 text-sm mt-4'>
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
        <span>500+ Doctors Available</span>
      </div>
      <div className='hidden md:flex items-center gap-2'>
        <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
        <span>24/7 Support</span>
      </div>
    </div>
 </div>
      
 {/*---------right side ----------*/}
 <div className='md:w-1/2 relative flex items-end justify-center md:justify-end'>
  
  {/* Background decoration for image */}
  <div className='absolute inset-0 flex items-end justify-center md:justify-end'>
    <div className='w-80 h-80 bg-gradient-to-tr from-white/10 to-transparent rounded-full blur-3xl'></div>
  </div>
  
  {/* Main header image with enhancements */}
  <div className='relative group'>
    <div className='absolute inset-0 bg-gradient-to-t from-[#5f6FFF] via-transparent to-transparent opacity-60 rounded-2xl'></div>
    <img 
      className='w-full md:absolute bottom-0 h-auto rounded-2xl transform group-hover:scale-105 transition-all duration-700 shadow-2xl' 
      src={assets.header_img} 
      alt="Professional doctors" 
    />
    
    {/* Floating elements */}
    <div className='absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg animate-bounce hidden md:block'>
      <div className='w-6 h-6 bg-green-500 rounded-full flex items-center justify-center'>
        <span className='text-white text-xs font-bold'>✓</span>
      </div>
    </div>
    
    <div className='absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg hidden md:block'>
      <div className='flex items-center gap-2'>
        <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
        <span className='text-gray-700 text-sm font-medium'>Verified</span>
      </div>
    </div>
  </div>
 </div>

    </div>
  )
}

export default Header
