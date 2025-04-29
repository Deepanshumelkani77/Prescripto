import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets1 } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='bg-white border-r border-gray-200 shadow-lg h-[91vh] w-[280px] transition-all duration-300 hover:shadow-xl'>
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
        >
          <div className='w-6 h-6 flex items-center justify-center'>
            <img src={assets1.home_icon} alt="Dashboard" className='w-5 h-5' />
          </div>
          <p className='font-medium hidden md:block'>Dashboard</p>
        </NavLink>

        <NavLink 
          className={({isActive}) => `
            flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-all duration-300
            ${isActive 
              ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]' 
              : 'hover:bg-gray-50 hover:text-[#5f6FFF]'
            }
          `} 
          to='/profile'
        >
          <div className='w-6 h-6 flex items-center justify-center'>
            <img src={assets1.people_icon} alt="Profile" className='w-5 h-5' />
          </div>
          <p className='font-medium hidden md:block'>Profile</p>
        </NavLink>
      </ul>

      {/* Sidebar Footer */}
      <div className='absolute bottom-0 w-full p-6 border-t border-gray-100'>
        <div className='flex items-center gap-3 p-3 bg-[#F2F3FF] rounded-lg'>
          <div className='w-10 h-10 rounded-full bg-[#5f6FFF] flex items-center justify-center'>
            <span className='text-white font-semibold'>DR</span>
          </div>
          <div className='hidden md:block'>
            <p className='font-medium text-gray-800'>Doctor Portal</p>
            <p className='text-sm text-gray-500'>Manage your practice</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
