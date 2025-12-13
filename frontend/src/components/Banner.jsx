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
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl px-4 sm:px-6 md:px-8 lg:px-12 my-10 md:my-20 mx-4 md:mx-10 shadow-2xl border border-blue-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative flex flex-col md:flex-row items-center justify-between py-8 sm:py-10 md:py-16 lg:py-20">
        {/* Left side - Content */}
        <div className="flex-1 text-center md:text-left mb-8 md:mb-0">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Trusted by 10,000+ Patients
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Book Appointment
              <span className="block mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                With 100+ Trusted Doctors
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto md:mx-0 leading-relaxed">
              Find and book appointments with the best doctors in your area. Quick, easy, and reliable healthcare at your fingertips.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">100+</div>
                <div className="text-gray-600 text-sm">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">4.9★</div>
                <div className="text-gray-600 text-sm">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 mb-1">24/7</div>
                <div className="text-gray-600 text-sm">Available Support</div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-8">
            <button 
              onClick={() => { setShowLogin(true); scrollTo(0, 0) }} 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Create Account
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button 
              onClick={() => { setState("Doctor"); setShowLogin2(true); scrollTo(0, 0) }} 
              className="group border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              Doctor Signup
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                    <span className="text-white text-xs font-semibold">✓</span>
                  </div>
                ))}
              </div>
              <span className="text-gray-700 text-sm font-medium">Verified Doctors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-gray-700 text-sm font-medium">Secure Booking</span>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 lg:w-[400px] relative">
          <div className="group relative">
            {/* Background Glow - Blue to Purple */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-1000"></div>
            
            {/* Image Container - Light with gradient border */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-blue-200 shadow-xl overflow-hidden">
              {/* Creative Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
                <div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/20 rounded-full blur-sm"></div>
                <div className="absolute bottom-4 left-4 w-12 h-12 bg-purple-500/20 rounded-full blur-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-500/15 rounded-full blur-md"></div>
              </div>
              
              <div className="relative w-full h-[350px] lg:h-[450px]">
                <img 
                  className="absolute bottom-0 right-0 w-full max-w-md object-contain transform group-hover:scale-110 transition-transform duration-700" 
                  src={assets.appointment_img} 
                  alt="Appointment" 
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-800 font-semibold">Quick Booking</p>
                      <p className="text-gray-600 text-sm">Available 24/7</p>
                    </div>
                  </div>
                </div>

                {/* Success Rate Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    99% Success Rate
                  </div>
                </div>

                {/* Creative Floating Elements */}
                <div className="absolute top-8 left-8 w-8 h-8 bg-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-16 right-12 w-6 h-6 bg-purple-500/20 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-20 left-12 w-4 h-4 bg-pink-500/20 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full translate-x-20 translate-y-20"></div>
    </div>
  )
}

export default Banner
