import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets1, assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {doctor, logout, setShowLogin2} = useContext(StoreContext)
  const {state, setState} = useContext(AppContext)
  const navigate = useNavigate();

  return (
    <>
     
      {/* Overlay - Only visible on phone screens */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 sm:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        sidebar bg-white border-r border-gray-200 shadow-lg transition-all duration-300
        sm:static sm:translate-x-0 sm:h-[91vh] sm:w-[280px] sm:hover:shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed top-0 left-0 h-full w-[280px] z-50
      `}>
        {/* Sidebar Header */}
        <div className='p-6 border-b border-gray-100'>
          <h2 className='text-xl font-semibold text-gray-800'>Doctor Portal</h2>
          <p className='text-sm text-gray-500 mt-1'>Manage your appointments</p>
        </div>

        {/* Navigation Links */}
        <ul className='text-[#515151] mt-5 space-y-2'>
          <NavLink 
            className={({isActive}) => `
              flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-all duration-300
              ${isActive 
                ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]' 
                : 'hover:bg-gray-50 hover:text-[#5f6FFF]'
              }
            `} 
            to='/'
            onClick={() => setIsOpen(false)}
          >
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={assets1.home_icon} alt="Dashboard" className='w-5 h-5' />
            </div>
            <p className='font-medium'>Dashboard</p>
          </NavLink>

          <NavLink 
            className={({isActive}) => `
              flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-all duration-300
              ${isActive 
                ? 'bg-[#F2F3FF] text-[#5f6FFF]' 
                : 'hover:bg-gray-50 hover:text-[#5f6FFF]'
              }
            `} 
            to='/profile'
            onClick={() => setIsOpen(false)}
          >
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={assets1.people_icon} alt="Profile" className='w-5 h-5' />
            </div>
            <p className='font-medium'>Profile</p>
          </NavLink>

          {/* Mobile Login/Logout Button */}
          <div className='sm:hidden px-6 py-3'>
            {doctor ? (
              <button 
                onClick={() => {
                  logout();
                  setState('User');
                  navigate('/');
                  setIsOpen(false);
                }} 
                className='w-full bg-[#5f6FFF] text-white text-sm px-6 py-2.5 rounded-full cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300'
              >
                Logout
              </button>
            ) : (
              <button 
                onClick={() => {
                  setShowLogin2(true);
                  setIsOpen(false);
                }} 
                className='w-full bg-[#5f6FFF] text-white text-sm px-6 py-2.5 rounded-full cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300'
              >
                Login
              </button>
            )}
          </div>
        </ul>

        {/* Sidebar Footer */}
        <div className='absolute bottom-0 w-full p-6 border-t border-gray-100'>
          <div className='flex items-center gap-3 p-3 bg-[#F2F3FF] rounded-lg'>
            <div className='w-10 h-10 rounded-full bg-[#5f6FFF] flex items-center justify-center'>
              <span className='text-white font-semibold'>DR</span>
            </div>
            <div>
              <p className='font-medium text-gray-800'>Doctor Portal</p>
              <p className='text-sm text-gray-500'>Manage your practice</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
