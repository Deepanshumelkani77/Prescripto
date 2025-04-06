import React, { useState } from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddDcotor from './pages/AddDoctor'
import AllDoctor from './pages/AllDoctor'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'


const App = () => {
const [showLogin,setShowLogin]=useState(false)



  return (
    <div className='bg-[#F2F3FF] mx-8 sm:mx[10%]' >
{
  showLogin===true?
  <Login/>:<></>
}

<Navbar/>
<div className='flex items-start'>
  <Sidebar/>
  <Routes>
  <Route path='/' element={<Dashboard/>}></Route>
    <Route path='/all-doctors' element={<AllDoctor/>}></Route>
    <Route path='/add-doctor' element={<AddDcotor/>}></Route>
   
  </Routes>
</div>



    </div>
  )
}

export default App
