import React from 'react'
import { useState } from 'react'

const Login = () => {

  const [state,setState]=useState('signup')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')

  const onSubmitHaldler=async(event)=>{
event.preventDefault();

  }
  

  return (
    <form className='min-h-[80vh] flex items-center '>
      
<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  rounded-xl text-zinc-600 text-sm shadow-xl'>
  <p className='text-2xl font-semibold'>{state==='signup'?'Create Account ':"Login"}</p>
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
  <p>Already have an account? <span onClick={()=>setState('Login')} className='text-[#5f6FFF] underline cursor-pointer'>Login here</span> </p>:
  <p>Create an new account? <span onClick={()=>setState('signup')} className='text-[#5f6FFF] underline cursor-pointer'>click here</span>
  </p>
}

</div>

    </form>
  )
}

export default Login
