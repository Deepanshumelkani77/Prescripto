import React from 'react'
import {assets} from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();

  return (
    <div className='flex item-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
      <img className='w-44 cursor-pointer' src={assets.logo} alt="" />
       {/* this ul hidden for small width but visible for medium and large */}
      <ul className='hidden md:flex items-start gap-6 font-medium mt-3 '>
        <NavLink to='/'>
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden ' />
        </NavLink >
        <NavLink to='/doctors'>
            <li className='py-1'>ALL DOCTORS</li>
            <hr className=' border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
        </NavLink >
        <NavLink to='/contact'>
            <li className='py-1'>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5  m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex item-center gap-4 cursor-pointer'>
        {/* this ul hidden for small width but visible for medium and large */}
        <button onClick={()=>{navigate('/login')}} className='bg-[#5f6FFF] text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
      </div>
    </div>
  )
}

export default Navbar
