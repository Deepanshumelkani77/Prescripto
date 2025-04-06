import React from 'react'
import {Routes,Route} from 'react-router-dom'
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
import Nav from './components/Nav.jsx'


const App = () => {

  const {state}=useContext(AppContext)

  

  return (

   
state === 'User' ?
    //mx for margin in x axis ,sm stand for small size
    <div className='mx-8  '>  
    <Navbar/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/doctor' element={<Doctor/>}/>
<Route path='/doctor/:speciality' element={<Doctor/>}/>
<Route path='about' element={<About/>}/>
<Route path='/myprofile' element={<MyProfile/>}/>
<Route path='/myappointment' element={<MyAppointment/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/appointment/:docId' element={<Appointment/>}/>
<Route path='contact' element={<Contact/>}/>
</Routes>
<Footer/>
    </div>  :
    <div className='mx-8' >
     <Nav/>
    </div>




  )
}

export default App
