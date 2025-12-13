import React, { useContext } from 'react'
import { useState } from 'react'
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowLogin, user, logout } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className='bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-2xl px-4 sm:px-6 lg:px-8 py-4 mb-5'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { navigate('/') }}>
          <img 
            className='w-32 sm:w-40 transition-all duration-300 group-hover:scale-105' 
            src={assets.logo} 
            alt="Prescripto Logo" 
          />
          <div className="hidden sm:flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-600 font-medium">Healthcare</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <ul className='hidden lg:flex items-center gap-1'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Home
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </>
            )}
          </NavLink>
          <NavLink 
            to='/doctor' 
            className={({ isActive }) => 
              `relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  All-Doctors
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </>
            )}
          </NavLink>
          <NavLink 
            to='/about' 
            className={({ isActive }) => 
              `relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </>
            )}
          </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => 
              `relative px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </>
            )}
          </NavLink>
        </ul>

        {/* User Actions */}
        <div className='flex items-center gap-3'>
          {user ? (
            <div className='flex items-center gap-3 cursor-pointer group relative'>
              <div className='relative'>
                <img 
                  src={assets.profile_pic} 
                  className='w-10 h-10 rounded-full object-cover hover:ring-2 hover:ring-blue-500 transition-all duration-300' 
                  alt="Profile" 
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className='hidden sm:flex items-center gap-2'>
                <span className="text-sm font-medium text-gray-700">Welcome back!</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {/* Dropdown Menu */}
              <div className='absolute top-full right-0 pt-4 text-base font-medium text-gray-600 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <div className='min-w-56 bg-white rounded-2xl flex flex-col gap-1 p-2'>
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <p className="text-sm font-semibold text-gray-800">User Account</p>
                    <p className="text-xs text-gray-500">Manage your profile</p>
                  </div>
                  <button 
                    onClick={() => { navigate("/myprofile") }} 
                    className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-left'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    My Profile
                  </button>
                  <button 
                    onClick={() => { navigate("/myappointment") }} 
                    className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 text-left'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    My Appointment
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={() => logout()} 
                    className='flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-left'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => { setShowLogin(true) }} 
              className='hidden md:flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Create Account
            </button>
          )}
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMenu(true)} 
            className='lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-300'
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center gap-1">
              <div className="w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
              <div className="w-5 h-0.5 bg-gray-600 rounded-full transition-all duration-300"></div>
            </div>
          </button>
        </div>
      </div> 
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-all duration-300 ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMenu(false)}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-80 bg-white transform transition-all duration-300 ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className='flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50'>
            <div className="flex items-center gap-2">
              <img 
                className='w-28 hover:opacity-80 transition-opacity' 
                src={assets.logo} 
                alt="Prescripto Logo" 
              />
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-600 font-medium">Healthcare</span>
              </div>
            </div>
            <button 
              onClick={() => setShowMenu(false)} 
              className='p-2 hover:bg-white rounded-full transition-all duration-300'
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Mobile Menu Content */}
          <div className='p-6'>
            <ul className='flex flex-col gap-2'>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/' 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className='text-lg'>HOME</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/doctor' 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className='text-lg'>ALL DOCTORS</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/about' 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className='text-lg'>ABOUT</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/contact' 
                className={({ isActive }) => 
                  `flex items-center gap-4 px-4 py-4 rounded-xl font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className='text-lg'>CONTACT</span>
              </NavLink>
            </ul>
            {/* Mobile Menu Footer */}
            {!user && (
              <div className='mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl'>
                <p className="text-sm text-gray-600 mb-4 text-center">Join thousands of patients who trust us</p>
                <button 
                  onClick={() => { setShowLogin(true); setShowMenu(false) }} 
                  className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300'
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Account
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
