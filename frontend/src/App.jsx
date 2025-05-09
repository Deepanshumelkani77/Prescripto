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
import { StoreContext} from './context/StoreContext.jsx'
import Nav from './components/Nav.jsx'
import Sidebar from './components/Sidebar.jsx'
import DoctorAppointment from './pages/DoctorAppointment.jsx'
import DoctorProfile from './pages/DoctorProfile.jsx'
import DoctorLogin from './pages/DoctorLogin.jsx'

const App = () => {

  const {state,showLogin}=useContext(AppContext)
  const {showLogin2}=useContext(StoreContext)

  

  return (

   
state === 'User' ?
    //mx for margin in x axis ,sm stand for small size
    <div>
 {
      showLogin?<Login/>:<></>
    }

<div className='mx-8  '>  
   
   <Navbar/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/doctor' element={<Doctor/>}/>
<Route path='/doctor/:speciality' element={<Doctor/>}/>
<Route path='about' element={<About/>}/>
<Route path='/myprofile' element={<MyProfile/>}/>
<Route path='/myappointment' element={<MyAppointment/>}/>
<Route path='/appointment/:docId' element={<Appointment/>}/>
<Route path='contact' element={<Contact/>}/>
</Routes>
<Footer/>
   </div> 


    </div>
    :
    <div>
    {
      showLogin2?<DoctorLogin/>:<></>
    }
    <div className='bg-[#F2F3FF] mx-0 sm:mx-8 h-[100vh] ' >

<Nav/>
<div className='flex items-start'>
<Sidebar/>
<Routes>
<Route path='/' element={<DoctorAppointment/>}></Route>

<Route path='/profile' element={<DoctorProfile/>}></Route>

</Routes>
</div>



</div>



    </div>
    



  )
}

export default App
