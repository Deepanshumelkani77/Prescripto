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
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl px-4 sm:px-8 lg:px-12 py-12 md:py-16 lg:py-24 mx-4 md:mx-8 my-10 md:my-16 shadow-xl border border-blue-50">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-30 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full filter blur-3xl opacity-30 -ml-40 -mb-40"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm lg:text-lg font-medium mb-6 border border-blue-100 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              Trusted by 10,000+ Patients
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              <span className="block">Your Health,</span>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Our Priority
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Connect with top healthcare professionals from the comfort of your home. 
              Experience seamless appointment booking and quality care at your fingertips.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md mx-auto lg:mx-0">
              {[
                { value: '100+', label: 'Expert Doctors', color: 'blue' },
                { value: '4.9★', label: 'Avg. Rating', color: 'purple' },
                { value: '24/7', label: 'Support', color: 'pink' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className={`text-3xl font-bold text-${stat.color}-600 mb-1`}>{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => { navigate('/doctor') }} 
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Book Appointment</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button 
                onClick={() => { setState("Doctor"); setShowLogin2(true); window.scrollTo(0, 0) }} 
                className="group relative overflow-hidden border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <span className="relative z-10">Doctor Signup</span>
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">✓</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm lg:text-xl font-medium text-gray-700">Verified Doctors</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-xl">
              <img 
                src={assets.appointment_img} 
                alt="Doctor with patient" 
                className="w-full h-auto rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Floating Card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-48">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm lg:text-xl font-medium text-gray-900">24/7</div>
                    <div className="text-xs lg:text-lg text-gray-500">Available</div>
                  </div>
                </div>
              </div>
              
              {/* Floating Card 2 */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-56">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm lg:text-xl font-medium text-gray-900">Instant</div>
                      <div className="text-xs lg:text-lg text-gray-500">Appointment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner
