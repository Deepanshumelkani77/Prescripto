import React, { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'

const Login = () => {

  const {setShowLogin}=useContext(AppContext)

  const [state,setState]=useState('login')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  return (
    <form className='min-h-[100vh] w-[100%] flex items-center fixed z-[999] bg-black/40 '>
      
<div className='bg-white flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96   rounded-xl text-zinc-600 text-sm shadow-xl'>
 <div className='flex justify-between w-[100%]'>
 <p className='text-2xl font-semibold'>{state==='signup'?'Create Account ':"Login"}</p>
 <p onClick={()=>{setShowLogin(false)}} className='[font-size:20px] font-bold cursor-pointer'>X</p>
 </div>

  <p>Please {state==='sign-up'?'create Account ':"log in"} to book appointment</p>
 
 {
  state==='signup'?
<div className='w-full'>
    <p>Full Name</p>
    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.name)} value={name} />
  </div>:<></>
 }
 
  

  <div className='w-full'>
    <p>Email</p>
    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.name)} value={email} />
  </div>

  <div className='w-full'>
    <p>Password</p>
    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setName(e.target.name)} value={password} />
  </div>

  <button className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>{state==='signup'?'Create Account ':"Login"}</button>

{
  state==='signup'?
  <p>Already have an account? <span onClick={()=>setState('login')} className='text-[#5f6FFF] underline cursor-pointer'>Login here</span> </p>:
  <p>Create an new account? <span onClick={()=>setState('signup')} className='text-[#5f6FFF] underline cursor-pointer'>click here</span>
  </p>
}

</div>

    </form>
  )
}

export default Login
