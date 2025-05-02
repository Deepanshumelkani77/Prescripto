import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const { user, logout, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center border-b border-gray-200 py-3 bg-white h-[9vh] px-4'>
      <div className='flex items-center gap-2 text-xs'>
        <img 
          onClick={() => navigate('/')} 
          className='w-36 sm:w-40 cursor-pointer' 
          src={assets.admin_logo} 
          alt="Admin Logo" 
        />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
      </div>

      {/* Desktop Login/Logout Button */}
      <div className="hidden md:block">
        {!user ? (
          <button 
            onClick={() => setShowLogin(true)} 
            className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full hover:bg-[#4a5ae8] transition-colors duration-300'
          >
            Login
          </button>
        ) : (
          <button 
            onClick={() => logout()} 
            className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full hover:bg-[#4a5ae8] transition-colors duration-300'
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={() => document.dispatchEvent(new CustomEvent('toggleSidebar'))}
        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  )
}

export default Navbar
