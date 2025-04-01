import React from 'react'
import { useState } from 'react'
import {assets} from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();
const [user,setUser]=useState(true)

  return (
    <div className='flex item-center justify-between text-sm py-4 mb-5 '>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
       {/* this ul hidden for small width but visible for medium and large */}
      <ul className='hidden md:flex items-start gap-8 font-medium mt-3 '>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF]  m-auto hidden ' />
        </NavLink >
        <NavLink to='/doctors'>
            <li className='py-1'>ALL  DOCTORS</li>
            <hr className=' border-none outline-none h-0.5 bg-[#5f6FFF]  m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] m-auto hidden'/>
        </NavLink >
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF]   m-auto hidden'/>
        </NavLink>
      </ul>

      <div className='flex item-center gap-4 cursor-pointer'>
        {/* this ul hidden for small width but visible for medium and large */}
        {user ?
        <div className='flex item-center gap-2 cursor-pointer group relative '>
            <img src={assets.profile_pic} className='w-8 rounded-full' ></img> 
            <img src={assets.dropdown_icon} className='w-2.5'></img>
            {/* when we hover group class when it display */}
           <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600  z-20 hidden group-hover:block'> 
            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
            <p onClick={()=>{navigate("/myprofile")}} className='hover:text-black cursor-pointer'>My Profile</p>
            <p onClick={()=>{navigate("/myappointment")}} className='hover:text-black cursor-pointer'>My Appointment</p>
            <p onClick={()=>{setUser(false)}} className='hover:text-black cursor-pointer'>Logout</p> 
            </div>
            
            </div>
            </div> 
             
             
  :    <button onClick={()=>{navigate('/login')}} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>}
     
      </div>


    </div>
  )
}

export default Navbar
