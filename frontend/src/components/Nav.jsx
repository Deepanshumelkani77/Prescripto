import React, { useContext } from 'react'
import { assets1, assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Nav({ onMenuClick }) {
  const { doctor, logout, setShowLogin2 } = useContext(StoreContext)
  const { state, setState } = useContext(AppContext)
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center border-b border-gray-200 py-3 bg-white h-[9vh] px-4'>
      <div className='flex items-center gap-2 text-xs'>
        <img 
          onClick={() => { navigate('/') }} 
          className='w-36 sm:w-40 cursor-pointer' 
          src={assets1.admin_logo} 
          alt="" 
        />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Doctor</p>
      </div>

      {/* Desktop Login/Logout Button */}
      <div className='hidden sm:block'>
        {doctor ? (
          <button 
            onClick={() => { logout(); setState('User'); navigate('/') }} 
            className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300'
          >
            Logout
          </button>
        ) : (
          <button 
            onClick={() => { setShowLogin2(true) }} 
            className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300'
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button 
        onClick={onMenuClick}
        className='sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300'
        aria-label="Toggle menu"
      >
        <img src={assets.menu_icon} alt="Menu" className='w-6 h-6' />
      </button>
    </div>
  )
}

export default Nav
