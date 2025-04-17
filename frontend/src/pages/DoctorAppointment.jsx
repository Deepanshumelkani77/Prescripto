import React, { useState } from 'react'
import { assets } from '../assets/assets'

const DoctorAppointment = () => {

  const [appointment,setAppointment]=useState([])
   useEffect(() => {
      axios.get('http://localhost:5000/appointment')
        .then(response => {
          setAppointment(response.data);
        })
        .catch(error => {
          console.error("Error fetching appointment data:", error);
        });
    }, []);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>

<div className='bg-white border rounded border-gray-200 text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
  <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-200'>
    <p>#</p>
    <p>patient</p>
    <p>payment</p>
    <p>age</p>
    <p>date & time</p>
    <p>fees</p>
    <p>action</p>
  </div>

  {

appointment.map((item,index)=>{

<div key={index}>

<p>{index+1}</p>
<div>
  <img src="" alt="" /><p></p>
</div>

<div>not yet</div>

<p>{calculateAge(item.user_id.dob)}</p>
<p>{item.date}{item.time}</p>
<p>50$</p>
<div>
  <img src={assets.chats_icon}></img>
</div>
</div>
})
}


</div>

    </div>
  )
}

export default DoctorAppointment
