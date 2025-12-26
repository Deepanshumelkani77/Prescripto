import React, { useContext } from 'react'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { showSuccess, showError } from '../utils/toast'

const Login = () => {
  const { setShowLogin } = useContext(AppContext)
  const [state, setState] = useState('signup')
  const { signup } = useContext(AppContext)
  const [formData, setFormData] = useState({ username: "", email: "", password: "" })
  const { login } = useContext(AppContext)
  const [formData2, setFormData2] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleChange2 = (e) => setFormData2({ ...formData2, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(formData.username, formData.email, formData.password)
      showSuccess('Account created successfully! Please log in.')
      setState('login')
    } catch (error) {
      showError(error.message || 'Failed to create account. Please try again.')
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault()
    try {
      await login(formData2.email, formData2.password)
      showSuccess('Logged in successfully!')
      setShowLogin(false)
      navigate("/")
    } catch (error) {
      showError(error.message || 'Invalid email or password. Please try again.')
    }
  }

  return (
    <div className='fixed inset-0 z-1000 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='relative w-full max-w-md mx-4'>
        <div className='bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl'>
          {/* Header */}
          <div className='relative p-6 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white'>
            <button 
              onClick={() => setShowLogin(false)} 
              className='absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors duration-300'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
            <h2 className='text-2xl font-bold'>{state === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
            <p className='mt-2 text-white/80'>{state === 'signup' ? 'Join us to book appointments' : 'Sign in to continue'}</p>
          </div>

          {/* Form */}
          <div className='p-6 space-y-4'>
            {state === 'signup' ? (
              <>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Full Name</label>
                  <input
                    value={formData.username}
                    name='username'
                    onChange={handleChange}
                    placeholder='Enter your name'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all duration-300'
                    type='text'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                    value={formData.email}
                    name='email'
                    onChange={handleChange}
                    placeholder='Enter your email'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all duration-300'
                    type='email'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Password</label>
                  <input
                    value={formData.password}
                    name='password'
                    onChange={handleChange}
                    placeholder='Create a password'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all duration-300'
                    type='password'
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className='w-full py-3 mt-6 text-white bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] rounded-lg font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                    value={formData2.email}
                    name='email'
                    onChange={handleChange2}
                    placeholder='Enter your email'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all duration-300'
                    type='email'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='block text-sm font-medium text-gray-700'>Password</label>
                  <input
                    value={formData2.password}
                    name='password'
                    onChange={handleChange2}
                    placeholder='Enter your password'
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all duration-300'
                    type='password'
                  />
                </div>
                <button
                  onClick={handleSubmit2}
                  className='w-full py-3 mt-6 text-white bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] rounded-lg font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
                >
                  Login
                </button>
              </>
            )}

            {/* Toggle */}
            <div className='mt-6 text-center'>
              <p className='text-gray-600'>
                {state === 'signup' ? 'Already have an account?' : "Don't have an account?"}
                <button
                  onClick={() => {
                    setState(state === 'signup' ? 'login' : 'signup')
                    setFormData2({ email: "", password: "" })
                  }}
                  className='ml-2 text-[#5f6FFF] font-medium hover:underline transition-colors duration-300'
                >
                  {state === 'signup' ? 'Login' : 'Create Account'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
