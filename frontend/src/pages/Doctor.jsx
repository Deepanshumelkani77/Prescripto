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


<div className='w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 gap-y-8'>
  {
filterDoc.map((item,index)=>(
  <div 
    onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} 
    key={index} 
    className='group bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-500 ease-out'
  >
    {/* Image Container with Gradient Overlay */}
    <div className='relative overflow-hidden'>
      <img 
        className='bg-gradient-to-br from-blue-50 to-indigo-100 h-[260px] w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out' 
        src={item.image} 
        alt={item.name} 
      />
      <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      
      {/* Specialty Badge */}
      <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg'>
        <p className='text-xs font-semibold text-indigo-600'>{item.speciality}</p>
      </div>
    </div>
    
    {/* Card Content */}
    <div className='p-6 space-y-3'>
      {/* Availability Status */}
      <div className='flex items-center gap-2'>
        <div className='flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-200'>
          <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
          <p className='text-green-700 text-xs font-medium'>Available Now</p>
        </div>
      </div>
      
      {/* Doctor Name */}
      <div>
        <h3 className='text-gray-900 text-xl font-bold group-hover:text-indigo-600 transition-colors duration-300 leading-tight'>
          Dr. {item.name}
        </h3>
        <p className='text-gray-500 text-sm font-medium mt-1'>{item.speciality}</p>
      </div>
      
      {/* Rating & Experience (placeholder for future implementation) */}
      <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
        <div className='flex items-center gap-1'>
          <div className='flex text-yellow-400'>
            <span className='text-sm'>⭐⭐⭐⭐⭐</span>
          </div>
          <span className='text-gray-600 text-xs'>(4.8)</span>
        </div>
        <div className='text-right'>
          <p className='text-gray-500 text-xs'>Experience</p>
          <p className='text-gray-800 text-sm font-semibold'>5+ years</p>
        </div>
      </div>
      
      {/* Book Appointment Button */}
      <div className='pt-3'>
        <div className='w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white py-2 px-4 rounded-xl font-medium text-center text-sm group-hover:from-indigo-600 group-hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg'>
          Book Appointment
        </div>
      </div>
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
