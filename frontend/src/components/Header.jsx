import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className=' relative flex flex-col md:flex-row flex-wrap bg-[#021189] rounded-3xl px-6 md:px-10 lg:px-20 mx-4 md:mx-10 overflow-hidden'>
        
      {/* Decorative background elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full floating-slow'></div>
        <div className='absolute bottom-20 left-10 w-24 h-24 bg-white/5 rounded-full floating-reverse'></div>
        <div className='absolute top-1/2 right-1/4 w-16 h-16 bg-white/3 rounded-full floating-fast'></div>
        {/* Subtle gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-br from-blue-700/20 to-transparent'></div>
      </div>
      
      {/*----------left side ----------*/}
      <div className='relative md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-10vw] md:mb-[-30px] z-10'>
        <p className='heading-fade-in text-3xl md:text-4xl lg:text-6xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        
        <div className='content-slide-in flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img 
            className='w-28 hover:scale-110 transition-all duration-500 ease-out group-hover:rotate-2' 
            src={assets.group_profiles} 
            alt="" 
          />
          <p className='text-fade-in lg:text-lg'>
            Simply browse through our extensive list of trusted doctors,<br className='hidden sm:block' /> 
            schedule your appointment hassle-free
          </p>
        </div>
        
        <a className='button-enhanced flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 group' 
           href="#speciality">
          <span className='group-hover:translate-x-1 transition-transform duration-300 lg:text-lg'>Book appointment</span>
          <img className='w-3 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300' 
               src={assets.arrow_icon} 
               alt="" />
        </a>
      </div>
        
      {/*---------right side ----------*/}
      <div className='md:w-1/2 relative z-10'>
        <img className='image-float w-full md:absolute bottom-0 h-auto rounded-lg hover:scale-[1.02] transition-all duration-700 ease-out' 
             src={assets.header_img} 
             alt="" />
        
        {/* Decorative pulse elements around the image */}
        <div className='absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full pulse-animation'></div>
        <div className='absolute top-1/4 -left-2 w-6 h-6 bg-white/15 rounded-full pulse-animation-delay'></div>
      </div>

      {/* Enhanced animations and effects */}
      <style>{`
        @keyframes headerFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes textFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes floatingSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatingReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }
        
        @keyframes floatingFast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        
        .heading-fade-in {
          opacity: 0;
          animation: headerFadeIn 1000ms ease-out 200ms forwards;
        }
        
        .content-slide-in {
          opacity: 0;
          animation: slideInLeft 800ms ease-out 600ms forwards;
        }
        
        .text-fade-in {
          opacity: 0;
          animation: textFadeIn 700ms ease-out 900ms forwards;
        }
        
        .button-enhanced {
          opacity: 0;
          animation: slideInLeft 600ms ease-out 1100ms forwards;
        }
        
        .image-float {
          animation: imageFloat 6s ease-in-out infinite;
          opacity: 0;
          animation: slideInRight 1000ms ease-out 400ms forwards, imageFloat 6s ease-in-out 1400ms infinite;
        }
        
        .floating-slow {
          animation: floatingSlow 8s ease-in-out infinite;
        }
        
        .floating-reverse {
          animation: floatingReverse 6s ease-in-out infinite;
        }
        
        .floating-fast {
          animation: floatingFast 4s ease-in-out infinite;
        }
        
        .pulse-animation {
          animation: pulseGlow 3s ease-in-out infinite;
        }
        
        .pulse-animation-delay {
          animation: pulseGlow 3s ease-in-out infinite 1.5s;
        }
        
        /* Enhanced hover effects */
        .button-enhanced:hover {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          box-shadow: 0 20px 40px rgba(255, 255, 255, 0.15);
        }
        
        /* Responsive animation adjustments */
        @media (max-width: 768px) {
          .image-float {
            animation: slideInRight 1000ms ease-out 400ms forwards;
          }
          
          .floating-slow, .floating-reverse, .floating-fast {
            animation: none;
          }
        }
      `}</style>
    </div>
  )
}

export default Header