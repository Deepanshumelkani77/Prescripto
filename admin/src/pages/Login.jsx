import React, { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'

const Login = () => {

  const {setShowLogin}=useContext(AppContext)
const [state,setState]=useState('login')


//signup
const {signup}=useContext(AppContext)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.password);
  };

//login
const { login } = useContext(AppContext);
const [formData2, setFormData2] = useState({ email: "", password: "" });
const navigate = useNavigate();
const handleChange2 = (e) => setFormData2({ ...formData2, [e.target.name]: e.target.value });
const handleSubmit2 = async (e) => {
  e.preventDefault();
  await login(formData2.email, formData2.password);
  setShowLogin(false);
  navigate("/"); // Redirect after login
};





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
    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text"   />
  </div>:<></>
 }
 
  

  <div className='w-full'>
    <p>Email</p>
    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email"  />
  </div>

  <div className='w-full'>
    <p>Password</p>
    <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password"  />
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
