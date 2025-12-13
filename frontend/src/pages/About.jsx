import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              About <span className="text-gray-800">Us</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner in managing healthcare needs conveniently and efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Section */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <img 
                className="w-full h-[400px] md:h-[500px] object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition duration-700" 
                src={assets.about_image} 
                alt="Healthcare professionals" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                Welcome to <span className="text-blue-600">Prescripto</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Your trusted partner in managing your healthcare needs conveniently and efficiently. 
                At Prescripto, we understand the challenges individuals face when it comes to scheduling 
                doctor appointments and managing their health records.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Prescripto is committed to excellence in healthcare technology. We continuously strive 
                to enhance our platform, integrating the latest advancements to improve user experience 
                and deliver superior service.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">V</span>
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our vision at Prescripto is to create a seamless healthcare experience for every user. 
                We aim to bridge the gap between patients and healthcare providers, making it easier 
                for you to access the care you need, when you need it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-blue-600">Us</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Efficiency Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Efficiency</h3>
                <p className="text-gray-600 leading-relaxed">
                  Streamlined appointment scheduling that fits into your busy lifestyle. 
                  Book appointments in seconds, not minutes.
                </p>
              </div>
            </div>

            {/* Convenience Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Convenience</h3>
                <p className="text-gray-600 leading-relaxed">
                  Access to a network of trusted healthcare professionals in your area. 
                  Find the right doctor, right now.
                </p>
              </div>
            </div>

            {/* Personalization Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Personalization</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tailored recommendations and reminders to help you stay on top of your health. 
                  Your health journey, personalized.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-800  py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Patients</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Doctors</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Cities</div>
            </div>
            <div className="text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust Prescripto for their healthcare needs. 
            Book your first appointment today and experience the difference.
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Book Appointment Now
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default About
