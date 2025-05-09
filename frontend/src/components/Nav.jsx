import React, { useContext } from 'react'
import { assets1 } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

function Nav() {
const {doctor,logout,setShowLogin2}=useContext(StoreContext)
const {state,setState}=useContext(AppContext)
const navigate=useNavigate();

  return (
    <div className='flex justify-between items-center border-b border-gray-200   py-3  bg-white  h-[9vh]'>
      <div className=' flex items-center gap-2 text-xs'>
        <img onClick={()=>{navigate('/')}} className='w-36 sm:w-40 cursor-pointer' src={assets1.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Doctor</p>
      </div>
{
doctor?<button onClick={()=>{logout();setState('User'); navigate('/')}} className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button> :<button onClick={()=>{setShowLogin2(true)}} className='bg-[#5f6FFF] text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Login</button>

}
      
    </div>
 
  )
}

export default Nav
