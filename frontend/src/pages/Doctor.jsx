import React from 'react'
import { useParams } from 'react-router-dom'
import SpecialityMenu from '../components/SpecialityMenu'

const Doctor = () => {

  const {speciality}=useParams()
console.log(speciality)

  return (
    <div>
      
    </div>
  )
}

export default Doctor
