import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets1 } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='  bg-white  border-r border-gray-200 shadow-lg h-[91vh]'>
  <ul className='text-[#515151] mt-5'>
    <NavLink  className={({isActive})=> `flex itms-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]':''} `} to='/'>
      <img src={assets1.people_icon} alt="" />
      <p>Profile</p>
    </NavLink >
    <NavLink className={({isActive})=> `flex itms-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor pointer ${isActive? 'bg-[#F2F3FF] border-r-4 border-[#5f6FFF]':''} `} to='/doctor-appointment'>
      <img src={assets1.appointment_icon} alt="" />
      <p>Appointments</p>
    </NavLink>
  
  </ul>
    </div>
  )
}

export default Sidebar
