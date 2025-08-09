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
    <nav className='bg-gradient-to-r from-white via-blue-50/30 to-indigo-50/50 backdrop-blur-md rounded-2xl px-6 sm:px-8 lg:px-12 py-5 mb-6'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <img 
          onClick={() => { navigate('/') }} 
          className='w-36 sm:w-44 cursor-pointer hover:scale-105 transition-all duration-300 drop-shadow-sm' 
          src={assets.logo} 
          alt="Prescripto Logo" 
        />

        {/* Desktop Navigation */}
        <ul className='hidden md:flex items-center gap-10 font-semibold'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `relative py-3 px-2 group ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'} transition-all duration-300 font-medium tracking-wide text-lg`
            }
          >
            {({ isActive }) => (
              <>
                <li className='relative'>
                  HOME
                  <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transform transition-all duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}></div>
                </li>
              </>
            )}
          </NavLink>
          <NavLink 
            to='/doctor' 
            className={({ isActive }) => 
              `relative py-3 px-2 group ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'} transition-all duration-300 font-medium tracking-wide text-lg`
            }
          >
            {({ isActive }) => (
              <>
                <li className='relative'>
                  ALL DOCTORS
                  <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transform transition-all duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}></div>
                </li>
              </>
            )}
          </NavLink>
          <NavLink 
            to='/about' 
            className={({ isActive }) => 
              `relative py-3 px-2 group ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'} transition-all duration-300 font-medium tracking-wide text-lg`
            }
          >
            {({ isActive }) => (
              <>
                <li className='relative'>
                  ABOUT
                  <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transform transition-all duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}></div>
                </li>
              </>
            )}
        </NavLink>
          <NavLink 
            to='/contact' 
            className={({ isActive }) => 
              `relative py-3 px-2 group ${isActive ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'} transition-all duration-300 font-medium tracking-wide text-lg`
            }
          >
            {({ isActive }) => (
              <>
                <li className='relative'>
                  CONTACT
                  <div className={`absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transform transition-all duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'}`}></div>
                </li>
              </>
            )}
        </NavLink>
      </ul>

        {/* User Actions */}
        <div className='flex items-center gap-4'>
          {user ? (
            <div className='flex items-center gap-3 cursor-pointer group relative'>
              <div className='relative'>
                <img 
                  src={assets.profile_pic} 
                  className='w-12 h-12 rounded-full ring-3 ring-indigo-200 object-cover group-hover:ring-indigo-300 transition-all duration-300 group-hover:scale-105' 
                  alt="Profile" 
                />
                <img 
                  src={assets.dropdown_icon} 
                  className='w-4 absolute -bottom-1 -right-1 bg-white rounded-full p-1 group-hover:rotate-180 transition-transform duration-300' 
                  alt="Dropdown" 
                />
              </div>
              <div className='absolute top-full right-0 pt-4 text-base font-medium text-gray-600 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
                <div className='min-w-52 bg-white/95 backdrop-blur-lg rounded-2xl flex flex-col gap-1 p-5'>
                  <button 
                    onClick={() => { navigate("/myprofile") }} 
                    className='hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 text-left py-2 px-3 rounded-xl font-medium'
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { navigate("/myappointment") }} 
                    className='hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 text-left py-2 px-3 rounded-xl font-medium'
                  >
                    My Appointment
                  </button>
                  <button 
                    onClick={() => logout()} 
                    className='hover:text-red-600 hover:bg-red-50 transition-all duration-300 text-left py-2 px-3 rounded-xl font-medium'
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => { setShowLogin(true) }} 
              className='hidden md:block bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 tracking-wide'
            >
              Create Account
            </button>
          )}

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setShowMenu(true)} 
            className='md:hidden p-3 hover:bg-indigo-100 rounded-xl transition-all duration-300 group'
          >
            <img className='w-6 group-hover:scale-110 transition-transform duration-300' src={assets.menu_icon} alt="Menu" />
          </button>
            </div>
            </div> 
             
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-all duration-300 ${
          showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMenu(false)}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-br from-white to-indigo-50/50 backdrop-blur-xl transform transition-all duration-300 ${
            showMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Menu Header */}
          <div className='flex items-center justify-between p-6'>
            <img 
              className='w-36 hover:opacity-80 transition-opacity' 
              src={assets.logo} 
              alt="Prescripto Logo" 
            />
            <button 
              onClick={() => setShowMenu(false)} 
              className='p-2 hover:bg-indigo-100 rounded-full transition-all duration-300'
            >
              <img className='w-6' src={assets.cross_icon} alt="Close" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className='p-6'>
            <ul className='flex flex-col gap-2'>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold tracking-wide ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                  } transition-all duration-300`
                }
              >
                <span className='text-xl'>HOME</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/doctor' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold tracking-wide ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                  } transition-all duration-300`
                }
              >
                <span className='text-xl'>ALL DOCTORS</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/about' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold tracking-wide ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                  } transition-all duration-300`
                }
              >
                <span className='text-xl'>ABOUT</span>
              </NavLink>
              <NavLink 
                onClick={() => setShowMenu(false)} 
                to='/contact' 
                className={({ isActive }) => 
                  `flex items-center gap-3 px-5 py-4 rounded-2xl font-semibold tracking-wide ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white' 
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                  } transition-all duration-300`
                }
              >
                <span className='text-xl'>CONTACT</span>
              </NavLink>
            </ul>

            {/* Mobile Menu Footer */}
            {!user && (
              <div className='mt-8'>
                <button 
                  onClick={() => { setShowLogin(true); setShowMenu(false) }} 
                  className='w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-4 rounded-2xl font-semibold transform hover:scale-105 transition-all duration-300 tracking-wide'
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
