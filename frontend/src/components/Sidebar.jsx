import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets1, assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const { doctor, logout, setShowLogin2 } = useContext(StoreContext)
  const { state, setState } = useContext(AppContext)
  const navigate = useNavigate();

  const closeSidebar = () => {
    if (window.innerWidth < 768) { // Only close on mobile
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setState('User');
    navigate('/');
    closeSidebar();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className='p-6 border-b border-gray-100'>
        <h2 className='text-xl font-semibold text-gray-800'>Doctor Portal</h2>
        <p className='text-sm text-gray-500 mt-1'>Manage your appointments</p>
      </div>

      {/* Navigation Links */}
      <ul className='text-[#515151] mt-5 space-y-2 flex-1 overflow-y-auto'>
        <li>
          <NavLink 
            to='/' 
            className={({isActive}) => `
              flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-all duration-300
              ${isActive 
                ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF] text-[#5f6FFF]' 
                : 'hover:bg-gray-50 hover:text-[#5f6FFF]'
              }
            `}
            onClick={closeSidebar}
          >
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={assets1.home_icon} alt="Dashboard" className='w-5 h-5' />
            </div>
            <p className='font-medium'>Dashboard</p>
          </NavLink>
        </li>

        <li>
          <NavLink 
            to='/profile' 
            className={({isActive}) => `
              flex items-center gap-3 py-3.5 px-6 cursor-pointer transition-all duration-300
              ${isActive 
                ? 'bg-[#F2F3FF] border-r-4 border-[#5f6fff] text-[#5f6fff]' 
                : 'hover:bg-gray-50 hover:text-[#5f6fff]'
              }
            `}
            onClick={closeSidebar}
          >
            <div className='w-6 h-6 flex items-center justify-center'>
              <img src={assets1.people_icon} alt="Profile" className='w-5 h-5' />
            </div>
            <p className='font-medium'>Profile</p>
          </NavLink>
        </li>

        {/* Mobile Login/Logout Button - Only show on mobile */}
        <li className='md:hidden mt-auto px-6 py-3 border-t border-gray-100'>
          {doctor ? (
            <button 
              onClick={handleLogout}
              className='w-full bg-[#5f6fff] text-white text-sm px-6 py-2.5 rounded-full cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300'
            >
              Logout
            </button>
          ) : (
            <button 
              onClick={() => {
                setShowLogin2(true);
                closeSidebar();
              }}
              className='w-full bg-[#5f6fff] text-white text-sm px-6 py-2.5 rounded-full cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300'
            >
              Login
            </button>
          )}
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
