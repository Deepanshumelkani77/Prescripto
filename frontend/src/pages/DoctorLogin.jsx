import React, { useContext } from 'react'
import { useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const DoctorLogin = () => {


  const {setShowLogin2}=useContext(StoreContext)
const [state,setState]=useState('signup')


//signup
const {signup}=useContext(StoreContext)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.username, formData.email, formData.password);
  };

//login
const { login } = useContext(StoreContext);
const [formData2, setFormData2] = useState({ email: "", password: "" });
const navigate = useNavigate();
const handleChange2 = (e) => setFormData2({ ...formData2, [e.target.name]: e.target.value });
const handleSubmit2 = async (e) => {
  e.preventDefault();
  await login(formData2.email, formData2.password);
  setShowLogin2(false);
  navigate("/"); // Redirect after login
};





  return (
    <form className='min-h-[100vh] w-[100%] flex items-center fixed z-[999] bg-black/60 '>
      
<div className='bg-white flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96   rounded-xl text-zinc-600 text-sm shadow-xl'>
 <div className='flex justify-between w-[100%]'>
 <p className='text-2xl font-semibold'>{state==='signup'?'Create Account ':"Login"}</p>
 <p onClick={()=>{setShowLogin2(false)}} className='[font-size:20px] font-bold cursor-pointer'>X</p>
 </div>

  <p>Please {state==='sign-up'?'create Account ':"log in"} to book appointment</p>
 
 {
  state==='signup'?
  <>
<div className='w-full'>
    <p>Full Name</p>
    <input name='username' onChange={handleChange} placeholder='Your name' className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#5f6FFF]' type="text"   />
  </div>
 
  <div className='w-full'>
    <p>Email</p>
    <input name='email' onChange={handleChange} placeholder='Your email' className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#5f6FFF]' type="email"  />
  </div>

  <div className='w-full'>
    <p>Password</p>
    <input  name='password' onChange={handleChange} placeholder='password' className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#5f6FFF]' type="password"  />
  </div> </>
  
  :<> <div className='w-full'>
    <p>Email</p>
    <input name='email' onChange={handleChange2} placeholder='Your email' className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#5f6FFF]' type="email"  />
  </div>

  <div className='w-full'>
    <p>Password</p>
    <input name='password' onChange={handleChange2} placeholder='password' className='border border-zinc-300 rounded w-full p-2 mt-1 outline-[#5f6FFF]' type="password"  />
  </div> </>

 }

{
  state==='signup'?<button onClick={handleSubmit} className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer'>Create Account</button>:<button onClick={handleSubmit2} className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
}
  

{
  state==='signup'?
  <p>Already have an account? <span onClick={()=>{setState('login'); console.log("hello")}} className='text-[#5f6FFF] underline cursor-pointer'>Login here</span> </p>:
  <p>Create an new account? <span onClick={()=>setState('signup')} className='text-[#5f6FFF] underline cursor-pointer'>click here</span>
  </p>
}

</div>

    </form>
  )
}

export default DoctorLogin
