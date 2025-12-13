import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Doctor = () => {

  const navigate = useNavigate()
  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/doctor')
      .then(response => {
        setDoctor(response.data)
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error)
      })
  }, [])

  useEffect(() => {
    if (doctor.length > 0) {
      if (speciality) {
        setFilterDoc(doctor.filter(doc => doc.speciality === speciality))
      } else {
        setFilterDoc(doctor)
      }
    }
  }, [doctor, speciality])

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Page Header */}
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-800'>
              Find <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent'>Doctors</span>
            </h1>
            <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3'></div>
            <p className='text-gray-600 mt-3'>Browse through the doctors specialist.</p>
          </div>
          <button
            onClick={() => setShowFilter(prev => !prev)}
            className={`sm:hidden px-4 py-2 rounded-full text-sm font-medium transition-all ${showFilter ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className='flex flex-col sm:flex-row items-start gap-6'>
          {/* Filters */}
          <div className={`${showFilter ? 'flex' : 'hidden sm:flex'} flex-col gap-3 text-sm`}> 
            {[
              'General physician',
              'Gynecologist',
              'Dermatologist',
              'Pediatricians',
              'Neurologist',
              'Gastroenterologist'
            ].map((spec) => (
              <p
                key={spec}
                onClick={() => speciality === spec ? navigate('/doctor') : navigate(`/doctor/${spec}`)}
                className={`w-[94vw] sm:w-auto pl-3 py-2 pr-16 rounded-full cursor-pointer transition-all border ${
                  speciality === spec
                    ? 'bg-blue-100 text-blue-800 border-blue-200'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {spec.charAt(0).toUpperCase() + spec.slice(1)}
              </p>
            ))}
          </div>

          {/* Doctors Grid */}
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
                className='group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 border border-blue-100'
              >
                {/* Image */}
                <div className='relative h-56 overflow-hidden'>
                  <img className='w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700' src={item.image} alt={item.name} />
                  {/* badges */}
                  <div className='absolute top-3 left-3 bg-white/90 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold'>
                    {item.speciality}
                  </div>
                  <div className='absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold text-green-600'>
                    <span className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></span>
                    Available
                  </div>
                </div>

                {/* Content */}
                <div className='p-4 space-y-2'>
                  <h3 className='text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors'>{item.name}</h3>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>

                  <div className='flex items-center justify-between pt-3 border-t border-gray-100'>
                    <div className='flex items-center gap-2 text-sm text-gray-600'>
                      <svg className='w-4 h-4 text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      <span>{item.experience} Experience</span>
                    </div>
                    <div className='text-blue-600 font-bold'>₹{item.fees}</div>
                  </div>

                  {/* CTA hint */}
                  <div className='opacity-0 group-hover:opacity-100 transition-opacity text-center'>
                    <span className='inline-flex items-center gap-2 text-sm text-blue-600 font-medium'>
                      Book Appointment
                      <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M17 8l4 4m0 0l-4 4m4-4H3' />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctor
