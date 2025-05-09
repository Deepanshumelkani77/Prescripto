import React, { useEffect,useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Doctor = () => {

  const navigate=useNavigate()
  const {speciality}=useParams()

const [filterDoc,setFilterDoc]=useState([])
const [showFilter,setShowFilter]=useState(false)



const [doctor,setDoctor]=useState([]);

useEffect(() => {
  // Fetch data from backend
  axios.get('http://localhost:5000/doctor')
       // Backend API endpoint
    .then(response => {
     
      setDoctor(response.data); // Store the data in state
    })
    .catch(error => {
      console.error("Error fetching doctor data:", error);
    });
   
}, []);


useEffect(() => {
  if (doctor.length > 0) {
    if (speciality) {
      setFilterDoc(doctor.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctor);
    }
  }
}, [doctor, speciality]);

  return (
    <div className=''>
      
<p className='text-gray-600 '>Browse through the doctors specialist.</p>
<div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
  <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? 'bg-[#5f6FFF] text-white':'' }`} onClick={()=>setShowFilter(prev=>! prev)}>Filter</button>
  <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter?'flex':'hidden sm:flex'} `}>
    <p onClick={()=>speciality==='General physician'? navigate('/doctor'): navigate('/doctor/General physician') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality== 'General physician'? 'bg-indigo-100 text-black':''}`}>General Physician</p>
    <p onClick={()=>speciality==='Gynecologist'? navigate('/doctor'): navigate('/doctor/Gynecologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality== 'Gynecologist'? 'bg-indigo-100 text-black':''}`}>Gynecologist</p>
    <p onClick={()=>speciality==='Dermatologist'? navigate('/doctor'): navigate('/doctor/Dermatologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality== 'Dermatologist'? 'bg-indigo-100 text-black':''}`}>Dermatologist</p>
    <p onClick={()=>speciality==='Pediatricians'? navigate('/doctor'): navigate('/doctor/Pediatricians') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality== 'Pediatricians'? 'bg-indigo-100 text-black':''}`}>Pediatricians</p>
    <p onClick={()=>speciality==='Neurologist'? navigate('/doctor'): navigate('/doctor/Neurologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality== 'Neurologist'? 'bg-indigo-100 text-black':''}`}>Neurologist</p>
    <p onClick={()=>speciality==='Gastroenterologist'? navigate('/doctor'): navigate('/doctor/Gastroenterologist') } className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality== 'Gastroenterologist'? 'bg-indigo-100 text-black':''}`}>Gastroenterologist</p>
  </div>


<div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
  {
filterDoc.map((item,index)=>(
  <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
  <img className='bg-blue-50 h-[240px] w-[100%]' src={item.image} alt="" />
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

    </div>
  )
}

export default Doctor
