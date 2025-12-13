import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-500/10"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img className="w-40 mb-6" src={assets.logo} alt="Prescripto Logo" />
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6"></div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              Your trusted partner in managing healthcare needs conveniently and efficiently. 
              At Prescripto, we understand the challenges individuals face when it comes to 
              scheduling doctor appointments and managing their health records.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="#" className="group w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-pink-500/25">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="group w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-blue-500/25">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">Q</span>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center group/item">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-purple-600 transition-colors duration-300 flex items-center group/item">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/doctor" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 flex items-center group/item">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                  Find Doctors
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors duration-300 flex items-center group/item">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3 group-hover/item:scale-150 transition-transform duration-300"></span>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="group">
            <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">C</span>
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group/item">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Phone</p>
                  <a href="tel:+7983458418" className="text-gray-800 hover:text-blue-600 transition-colors duration-300 font-medium">
                    +1 (798) 345-8418
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group/item">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <a href="mailto:deepumelkani123@gmail.com" className="text-gray-800 hover:text-purple-600 transition-colors duration-300 font-medium">
                    deepumelkani123@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 group/item">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Address</p>
                  <p className="text-gray-800 font-medium">
                    54709 Willms Station<br />
                    Suite 350, Washington, USA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-blue-200/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Stay Updated</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest healthcare tips and updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-blue-600 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-purple-600 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-pink-600 transition-colors duration-300">Cookie Policy</a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm">
                © 2024 Prescripto. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Made with ❤️ for better healthcare
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
