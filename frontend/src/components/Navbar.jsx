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
    <nav className='bg-white  rounded-lg px-4 sm:px-6 lg:px-8 py-4 mb-5'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <img 
          onClick={() => { navigate('/') }} 
          className='w-32 sm:w-40 cursor-pointer hover:opacity-80 transition-opacity' 
          src={assets.logo} 
          alt="Prescripto Logo" 
        />

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-8 font-medium'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `relative py-2 ${isActive ? 'text-[#5f6FFF]' : 'text-gray-600 hover:text-[#5f6FFF]'} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <>
                <li>HOME</li>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5f6FFF] transform scale-x-0 transition-transform duration-300 ${isActive ? 'scale-x-100' : ''}`}></div>
              </>
            )}
          </NavLink>
          <NavLink 
            to='/doctor' 
            className={({ isActive }) => 
              `relative py-2 ${isActive ? 'text-[#5f6FFF]' : 'text-gray-600 hover:text-[#5f6FFF]'} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <>
                <li>ALL DOCTORS</li>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5f6FFF] transform scale-x-0 transition-transform duration-300 ${isActive ? 'scale-x-100' : ''}`}></div>
              </>
            )}
          </NavLink>
          <NavLink 
            to='/about' 
            className={({ isActive }) => 
              `relative py-2 ${isActive ? 'text-[#5f6FFF]' : 'text-gray-600 hover:text-[#5f6FFF]'} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <>
                <li>ABOUT</li>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5f6FFF] transform scale-x-0 transition-transform duration-300 ${isActive ? 'scale-x-100' : ''}`}></div>
              </>
            )}
          </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => 
              `relative py-2 ${isActive ? 'text-[#5f6FFF]' : 'text-gray-600 hover:text-[#5f6FFF]'} transition-colors duration-300`
            }
          >
            {({ isActive }) => (
              <>
                <li>CONTACT</li>
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#5f6FFF] transform scale-x-0 transition-transform duration-300 ${isActive ? 'scale-x-100' : ''}`}></div>
              </>
            )}
          </NavLink>
        </ul>

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          {user ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <div className='relative'>
                <img 
                  src={assets.profile_pic} 
                  className='w-10 h-10 rounded-full border-2 border-[#5f6FFF] object-cover hover:border-[#4a5ae8] transition-colors duration-300' 
                  alt="Profile" 
                />
                <img 
                  src={assets.dropdown_icon} 
                  className='w-3 absolute -bottom-1 -right-1 bg-white rounded-full p-0.5' 
                  alt="Dropdown" 
                />
              </div>
              <div className='absolute top-full right-0 pt-4 text-base font-medium text-gray-600 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <div className='min-w-48 bg-white rounded-lg shadow-lg flex flex-col gap-2 p-4 border border-gray-100'>
                  <button 
                    onClick={() => { navigate("/myprofile") }} 
                    className='hover:text-[#5f6FFF] transition-colors duration-300 text-left'
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { navigate("/myappointment") }} 
                    className='hover:text-[#5f6FFF] transition-colors duration-300 text-left'
                  >
                    My Appointment
                  </button>
                  <button 
                    onClick={() => logout()} 
                    className='hover:text-[#5f6FFF] transition-colors duration-300 text-left'
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => { setShowLogin(true) }} 
              className='hidden md:block bg-[#5f6FFF] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#4a5ae8] transform hover:scale-105 transition-all duration-300 shadow-md'
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMenu(true)} 
            className='md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300'
          >
            <img className='w-6' src={assets.menu_icon} alt="Menu" />
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
          className={`absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl transform transition-all duration-300 ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className='flex items-center justify-between p-6 border-b border-gray-100'>
            <img 
              className='w-32 hover:opacity-80 transition-opacity' 
              src={assets.logo} 
              alt="Prescripto Logo" 
            />
            <button 
              onClick={() => setShowMenu(false)} 
              className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-300'
            >
              <img className='w-6' src={assets.cross_icon} alt="Close" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className='p-6'>
            <ul className='flex flex-col gap-3'>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive 
                      ? 'bg-[#5f6FFF] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  } transition-all duration-300`
                }
              >
                <span className='text-lg font-medium'>HOME</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/doctor' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive 
                      ? 'bg-[#5f6FFF] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  } transition-all duration-300`
                }
              >
                <span className='text-lg font-medium'>ALL DOCTORS</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/about' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive 
                      ? 'bg-[#5f6FFF] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  } transition-all duration-300`
                }
              >
                <span className='text-lg font-medium'>ABOUT</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/contact' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3 rounded-xl ${
                    isActive 
                      ? 'bg-[#5f6FFF] text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-50'
                  } transition-all duration-300`
                }
              >
                <span className='text-lg font-medium'>CONTACT</span>
              </NavLink>
            </ul>

            {/* Mobile Menu Footer */}
            {!user && (
              <div className='mt-8'>
                <button 
                  onClick={() => { setShowLogin(true); setShowMenu(false) }} 
                  className='w-full bg-[#5f6FFF] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#4a5ae8] transform hover:scale-105 transition-all duration-300 shadow-md'
                >
                  Create Account
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
