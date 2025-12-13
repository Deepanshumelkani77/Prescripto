import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='relative py-10 overflow-hidden'>
     
{/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full translate-x-20 translate-y-20"></div>

      <div className='relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse lg:text-xl"></div>
            <span className="lg:text-xl">Healthcare Specialties</span>
          </div>
          
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6'>
            Find by <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Speciality</span>
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
          
          <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free with the right specialist for your needs.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8'>
          {specialityData.map((item, index) => (
            <Link 
              onClick={() => { scrollTo(0, 0) }} 
              className='group relative flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2' 
              key={index} 
              to={`doctor/${item.speciality}`}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl border border-blue-100/50 shadow-lg group-hover:shadow-2xl transition-all duration-500"></div>
              
              {/* Hover Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Icon Container */}
                <div className="relative mb-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 border border-blue-200/50">
                    <img 
                      className='w-12 h-12 sm:w-16 sm:h-16 object-contain group-hover:scale-110 transition-all duration-500' 
                      src={item.image} 
                      alt={item.speciality} 
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Speciality Name */}
                <p className="text-sm lg:text-xl sm:text-base font-semibold text-gray-800 text-center group-hover:text-blue-600 transition-colors duration-300">
                  {item.speciality}
                </p>
                
                {/* Hover Arrow */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      
      </div>

      
    </div>
  )
}

export default SpecialityMenu
