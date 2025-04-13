import React, { useContext, useState } from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AddDcotor from './pages/AddDoctor'
import AllDoctor from './pages/AllDoctor'
import { Route, Routes } from 'react-router-dom'
import EditDoctor from './pages/EditDoctor'
import {AppContext} from './context/AppContext'


const App = () => {

const {showLogin}=useContext(AppContext);


  return (

    <div className='[h-100vh]'>

{
  showLogin===true?
  <Login/>:<></>
}


<div className='bg-[#F2F3FF] mx-8 sm:mx[10%] h-[100vh] relative'  >


<Navbar/>
<div className='flex items-start'>
  <Sidebar/>
  <Routes>
  <Route path='/' element={<AllDoctor/>}></Route>

    <Route path='/add-doctor' element={<AddDcotor/>}></Route>
    <Route path='/edit-doctor/:id' element={<EditDoctor/>}></Route>
   
  </Routes>
</div>



    </div>


    </div>

   
  )
}

export default App
