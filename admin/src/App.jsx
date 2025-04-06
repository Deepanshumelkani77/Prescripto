import React, { useState } from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'


const App = () => {
const [showLogin,setShowLogin]=useState(false)



  return (
    <div className='bg-[#F8F9FD] mx-8 sm:mx[10%]' >
{
  showLogin===true?
  <Login/>:<></>
}

<Navbar/>
<div className='flex items-start'>
  <Sidebar/>
</div>



    </div>
  )
}

export default App
