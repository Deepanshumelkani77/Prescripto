import React, { useContext } from 'react'
import { useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import { useNavigate } from 'react-router-dom'
import { showSuccess, showError } from '../utils/toast'

const DoctorLogin = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;
  const { doctor, setShowLogin2 } = useContext(StoreContext)
  const [state, setState] = useState('signup')
  const { signup } = useContext(StoreContext)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const { login } = useContext(StoreContext)
  const [formData2, setFormData2] = useState({ email: "", password: "" })
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleChange2 = (e) => setFormData2({ ...formData2, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.name || !formData.email || !formData.password) {
        showError('Please fill in all fields')
        return
      }
      await signup(formData.name, formData.email, formData.password)
      showSuccess('Account created successfully! Please login.')
      setState('login')
      setFormData({ name: "", email: "", password: "" })
    } catch (error) {
      showError(error.message || 'Failed to create account')
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault()
    try {
      if (!formData2.email || !formData2.password) {
        showError('Please enter both email and password')
        return
      }
      await login(formData2.email, formData2.password)
      showSuccess('Login successful! Welcome back.')
      setShowLogin2(false)
      navigate("/")
    } catch (error) {
      showError(error.message || 'Login failed. Please check your credentials.')
    }
  }

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm'>
      <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden'>
        {/* Header */}
        <div className='bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] p-6 text-white'>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>{state === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
            <button 
              onClick={() => {
                if (doctor) {
                  setShowLogin2(false)
                } else {
                  showError("Please login first")
                }
              }} 
              className='text-white hover:text-gray-200 transition-colors'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>
          <p className='mt-2 text-white/80'>
            {state === 'signup' ? 'Join our medical community' : 'Sign in to your account'}
          </p>
        </div>

        {/* Form */}
        <div className='p-6'>
          {state === 'signup' ? (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Full Name</label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all'
                  placeholder='Enter your full name'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all'
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all'
                  placeholder='Create a password'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full py-3 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                Create Account
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit2} className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData2.email}
                  onChange={handleChange2}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all'
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={formData2.password}
                  onChange={handleChange2}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent transition-all'
                  placeholder='Enter your password'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full py-3 bg-gradient-to-r from-[#5f6FFF] to-[#4a5ae8] text-white rounded-lg font-medium hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                Login
              </button>
            </form>
          )}

          {/* Toggle Form */}
          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              {state === 'signup' ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => setState(state === 'signup' ? 'login' : 'signup')}
                className='ml-2 text-[#5f6FFF] font-medium hover:underline'
              >
                {state === 'signup' ? 'Login' : 'Create Account'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorLogin
