import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Sidebar = () => {

const {user,setShowLogin}=useContext(AppContext)
const navigate=useNavigate()

  return (
    <div className='  bg-white  border-r border-gray-200 shadow-lg h-[91vh]'>
  <ul className='text-[#515151] mt-5'>
    <NavLink  className={({isActive})=> `flex itms-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]':''} `} to='/'>
      <img src={assets.home_icon} alt="" />
      <p>Dashboard</p>
    </NavLink >
    {
  user ? (
    <NavLink
      to='add-doctor'
      className={({ isActive }) =>
        `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]' : ''}`
      }
    >
      <img src={assets.add_icon} alt="" />
      <p>Add Doctor</p>
    </NavLink>
  ) : (
    <div
      onClick={() =>{ setShowLogin(true);}}
      className="flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer"
    >
      <img src={assets.add_icon} alt="" />
      <p>Add Doctor</p>
    </div>
  )
}
  
  </ul>
    </div>
  )
}

export default Sidebar
