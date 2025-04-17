import React from 'react'

const DoctorAppointment = () => {
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointment</p>

<div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
  <div>
    <p>#</p>
    <p>patient</p>
    <p>payment</p>
    <p>age</p>
    <p>date & time</p>
    <p>fees</p>
    <p>action</p>
  </div>
</div>

    </div>
  )
}

export default DoctorAppointment
