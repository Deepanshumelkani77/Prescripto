import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Doctor from './pages/Doctor.jsx'
import About from './pages/About.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointment from './pages/MyAppointment.jsx'
import Login from './pages/Login.jsx'
import Appointment from './pages/Appointment.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Contact from './pages/Contact.jsx'
import { useContext } from 'react'
import { AppContext } from './context/AppContext.jsx'
import { StoreContext } from './context/StoreContext.jsx'
import Nav from './components/Nav.jsx'
import Sidebar from './components/Sidebar.jsx'
import DoctorAppointment from './pages/DoctorAppointment.jsx'
import DoctorProfile from './pages/DoctorProfile.jsx'
import DoctorLogin from './pages/DoctorLogin.jsx'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  const { state, showLogin } = useContext(AppContext)
  const { showLogin2 } = useContext(StoreContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    state === 'User' ? (
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        {showLogin && <Login />}
        
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="pt-[12vh] flex-1">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/doctor' element={<Doctor />} />
              <Route path='/doctor/:speciality' element={<Doctor />} />
              <Route path='about' element={<About />} />
              <Route path='/myprofile' element={<MyProfile />} />
              <Route path='/myappointment' element={<MyAppointment />} />
              <Route path='/appointment/:docId' element={<Appointment />} />
              <Route path='contact' element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-[#F2F3FF] flex flex-col">
        {showLogin2 && <DoctorLogin />}
        
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Sidebar - Fixed on desktop, collapsible on mobile */}
          <div 
            className={`fixed inset-y-0 left-0 transform ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 bg-white shadow-lg`}
          >
            <div className="h-full overflow-y-auto">
              <Sidebar isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
            </div>
          </div>
          
          {/* Overlay for mobile menu */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
          
          {/* Main content area */}
          <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
            <Nav onMenuClick={toggleMobileMenu} />
            <main className="flex-1 overflow-y-auto pt-4 px-4 md:px-6">
              <Routes>
                <Route path='/' element={<DoctorAppointment />} />
                <Route path='/profile' element={<DoctorProfile />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    )
  )
}

export default App
