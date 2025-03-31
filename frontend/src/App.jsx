import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'


const App = () => {
  return (
    //mx for margin in x axis ,sm stand for small size
    <div className='mx-4 sm:mx[10%]'>  
<Routes>
<Route path='/' element={<Home/>}/>

</Routes>
    </div>
  )
}

export default App
