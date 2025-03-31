import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Doctor from './pages/Doctor.jsx'
import About from './pages/About.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppointment from './pages/MyAppointment.jsx'
import Login from './pages/Login.jsx'
import Appointment from './pages/Appointment.jsx'

const App = () => {
  return (
    //mx for margin in x axis ,sm stand for small size
    <div className='mx-4 sm:mx[10%]'>  
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/doctor' element={<Doctor/>}/>
<Route path='about' element={<About/>}/>
<Route path='/myprofile' element={<MyProfile/>}/>
<Route path='/myappointment' element={<MyAppointment/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/appointment/:docId' element={<Appointment/>}/>
</Routes>
    </div>
  )
}

export default App
