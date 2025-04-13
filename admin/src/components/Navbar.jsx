import React from 'react'
import { assets } from '../assets/assets'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar = () => {


  const {setShowLogin}=useContext(AppContext)

    const navigate=useNavigate()

  return (
    <div className='flex justify-between items-center border-b border-gray-200   py-3  bg-white  h-[9vh]'>
      <div className=' flex items-center gap-2 text-xs'>
        <img onClick={()=>{navigate('/')}} className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Admin</p>
      </div>
      <button onClick={()=>{setShowLogin(true)}} className='cursor-pointer bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full'>Login</button>
    </div>
  )
}

export default Navbar
