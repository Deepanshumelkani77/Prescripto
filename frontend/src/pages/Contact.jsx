import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { showSuccess, showError } from '../utils/toast'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      showError('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showError('Please enter a valid email address');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      const result = await response.json();
      console.log('Feedback submitted successfully:', result);
      
      // Show success message to user
      showSuccess('Thank you for your feedback! We will get back to you soon.');
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showError(error.response?.data?.message || 'Failed to submit feedback. Please try again later.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in">
              Get in <span className="text-gray-800">Touch</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Form */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Location */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Our Office</h3>
                    <p className="text-gray-600 leading-relaxed">
                      54709 Willms Station<br />
                      Suite 350, Washington, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
                    <a href="tel:+7983458418" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-300">
                      +1 (798) 345-8418
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
                    <a href="mailto:deepumelkani123@gmail.com" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-300">
                      deepumelkani123@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Careers Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Careers at Prescripto</h3>
                  <p className="text-white/90 mb-4">Learn more about our teams and exciting job openings.</p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg">
                    Explore Jobs
                  </button>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Office Hours</h3>
                    <div className="space-y-1 text-gray-600">
                      <p><span className="font-semibold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
                      <p><span className="font-semibold">Saturday:</span> 10:00 AM - 4:00 PM</p>
                      <p><span className="font-semibold">Sunday:</span> Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map/Image Section */}
        <div className="mt-16">
          <div className="group relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="aspect-video w-full">
                <img 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                  src={assets.contact_image} 
                  alt="Prescripto Office Location" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Contact
