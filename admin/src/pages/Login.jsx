import React, { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { setShowLogin,login } = useContext(AppContext)
  const [state, setState] = useState('login')
  const { signup } = useContext(AppContext)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [formData2, setFormData2] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange2 = (e) => setFormData2({ ...formData2, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData.username, formData.email, formData.password);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    await login(formData2.email, formData2.password);
    setShowLogin(false);
    navigate("/");
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center fixed z-[999] bg-black/60 backdrop-blur-sm'>
      <div className='bg-white flex flex-col gap-4 m-4 p-6 sm:p-8 w-full max-w-md rounded-2xl text-gray-700 shadow-2xl transform transition-all duration-300 hover:shadow-[#5f6FFF]/20'>
        <div className='flex justify-between items-center w-full'>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] bg-clip-text text-transparent'>
            {state === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <button 
            onClick={() => setShowLogin(false)} 
            className='text-gray-500 hover:text-gray-700 transition-colors duration-300 text-xl font-semibold'
          >
            ×
          </button>
        </div>

        <p className='text-gray-500 text-sm'>
          {state === 'signup' ? 'Create an account to get started' : 'Please login to continue'}
        </p>

        {state === 'signup' ? (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Full Name</label>
              <input
                value={formData.username}
                name='username'
                onChange={handleChange}
                placeholder='Enter your name'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 outline-none transition-all duration-300'
                type="text"
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <input
                value={formData.email}
                name='email'
                onChange={handleChange}
                placeholder='Enter your email'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 outline-none transition-all duration-300'
                type="email"
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Password</label>
              <input
                value={formData.password}
                name='password'
                onChange={handleChange}
                placeholder='Create a password'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 outline-none transition-all duration-300'
                type="password"
              />
            </div>

            <button
              type="submit"
              className='w-full py-3 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg'
            >
              Create Account
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit2} className='space-y-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Email</label>
              <input
                value={formData2.email}
                name='email'
                onChange={handleChange2}
                placeholder='Enter your email'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 outline-none transition-all duration-300'
                type="email"
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700'>Password</label>
              <input
                value={formData2.password}
                name='password'
                onChange={handleChange2}
                placeholder='Enter your password'
                className='w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#5f6FFF] focus:ring-2 focus:ring-[#5f6FFF]/20 outline-none transition-all duration-300'
                type="password"
              />
            </div>

            <button
              type="submit"
              className='w-full py-3 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-[1.02] transition-all duration-300 shadow-lg'
            >
              Login
            </button>
          </form>
        )}

        <div className='text-center text-sm text-gray-500'>
          {state === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setState('login')}
                className='text-[#5f6FFF] font-medium hover:underline transition-all duration-300'
              >
                Login here
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setState('login')}
                className='text-[#5f6FFF] font-medium hover:underline transition-all duration-300'
              >
                Sign up here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
