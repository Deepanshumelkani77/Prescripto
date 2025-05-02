import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const AllDoctor = () => {
  const { user, setShowLogin } = useContext(AppContext)
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:5000/doctor')
      .then(response => {
        setDoctor(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/doctor/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDoctor(prev => prev.filter(doc => doc._id !== id));
        alert('Doctor deleted successfully!');
      } else {
        alert('Failed to delete the Doctor.');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      alert('An error occurred while deleting the doctor.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6FFF]"></div>
      </div>
    );
  }

  return (
    <div className='p-6 max-h-[85vh] overflow-y-auto w-[100%]'>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className='text-2xl font-semibold text-gray-800'>All Doctors</h1>
          <p className='text-gray-600 mt-1'>Manage your registered doctors</p>
        </div>
        
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-8 auto-rows-fr'>
        {doctor.map((item, index) => (
          <div 
            key={index} 
            className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group w-full'
          >
            <div className='relative h-48 overflow-hidden'>
              <img 
                className='w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500' 
                src={item.image} 
                alt={item.name} 
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              
              {/* Availability Badge */}
              <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-md'>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                <p className={`text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </p>
              </div>
            </div>

            <div className='p-4 space-y-3'>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 group-hover:text-[#5f6FFF] transition-colors duration-300'>
                  {item.name}
                </h3>
                <p className='text-gray-600 text-sm mt-1'>{item.speciality}</p>
              </div>

              <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                <div className='flex items-center gap-2 text-sm text-gray-500'>
                  <svg className='w-4 h-4 text-[#5f6FFF]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <span>{item.experience} Experience</span>
                </div>
                <div className='text-[#5f6FFF] font-semibold'>
                  ₹{item.fees}
                </div>
              </div>

              <div className='flex gap-3 pt-2'>
                <button 
                  onClick={user ? () => navigate(`/edit-doctor/${item._id}`) : () => setShowLogin(true)} 
                  className='flex-1 bg-[#5f6FFF] text-white py-2 rounded-lg hover:bg-[#4a5ae8] transition-colors duration-300 flex items-center justify-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button 
                  onClick={user ? () => handleDelete(item._id) : () => setShowLogin(true)} 
                  className='flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2'
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllDoctor
