import React, { useEffect } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 pointer-events-none"></div>
      
      {/* Floating Background Elements */}
      <div className="fixed top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed top-40 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed bottom-20 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      <div className="fixed bottom-40 right-1/3 w-28 h-28 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-3000"></div>

      {/* Main Content */}
      <div className="relative z-10">

        {/* Header Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
          <div className="relative">
            <Header />
          </div>
        </section>

        {/* Speciality Menu Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
          <div className="relative">
            <SpecialityMenu />
          </div>
        </section>

        {/* Top Doctors Section */}
        <section className="relative py-8">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
          <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <TopDoctors />
          </div>
        </section>

        {/* Banner Section */}
        <section className="relative py-4">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent"></div>
          <div className="relative">
            <Banner />
          </div>
        </section>

        {/* Additional Features Section */}
        <section className="relative py-20">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                Why Choose <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Prescripto</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full"></div>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Experience healthcare reimagined with our comprehensive platform designed for your convenience and well-being.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Quick Booking</h3>
                  <p className="text-gray-600 leading-relaxed lg:text-lg">
                    Book appointments in seconds with our streamlined booking system. No more waiting on hold or complicated scheduling processes.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Secure & Private</h3>
                  <p className="text-gray-600 lg:text-lg leading-relaxed">
                    Your health information is protected with bank-level security. We prioritize your privacy and data protection.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">Personalized Care</h3>
                  <p className="text-gray-600 lg:text-lg leading-relaxed">
                    Get personalized recommendations and care plans tailored to your specific health needs and preferences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-16">
          <div className="bg-blue-800 rounded-3xl mx-4 md:mx-8 lg:mx-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Trusted by Thousands
                </h2>
                <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                  Join our growing community of satisfied patients who trust Prescripto for their healthcare needs.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="text-white">
                  <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
                  <div className="text-blue-100">Happy Patients</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                  <div className="text-blue-100">Expert Doctors</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
                  <div className="text-blue-100">Cities Covered</div>
                </div>
                <div className="text-white">
                  <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                  <div className="text-blue-100">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of patients who trust Prescripto for their healthcare needs. 
                Book your first appointment today and experience the difference.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Book Appointment Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home