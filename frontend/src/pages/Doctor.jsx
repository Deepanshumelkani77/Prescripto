import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Doctor = () => {

  const navigte=useNavigate()
  const {speciality}=useParams()

const {doctors}=useContext(AppContext)
const [filterDoc,setFilterDoc]=useState([])

useEffect(() => {
  if (doctors.length > 0) {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }
}, [doctors, speciality]);

  return (
    <div>
      
<p>Browse through the doctors specialist.</p>
<div>
  <div>
    <p>General Physician</p>
    <p>Gynecologist</p>
    <p>Dermatologist</p>
    <p>Pediatricians</p>
    <p>Neurologist</p>
    <p>Gastroenterologist</p>
  </div>
</div>

<div>
  {
filterDoc.map((item,index)=>(
  <div onClick={()=>{navigate(`./appointment/${item._id}`)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
  <img className='bg-blue-50 ' src={item.image} alt="" />
  <div className='p-4'>
      <div className='flex items-center gap-2 text-sm text-center text-green-500'>
          <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
      </div>
      <p className='text-gray-800 text-lg font-medium'>{item.name}</p>
      <p className='text-gray-600 text-sm'>{item.speciality}</p>
  </div>
  </div>
  
          ))
  }
</div>

    </div>
  )
}

export default Doctor
