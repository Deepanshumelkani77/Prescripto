import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FiSearch, FiPlus, FiFilter, FiEdit2, FiTrash2, FiUser, FiClock, FiDollarSign, FiPhone, FiMail, FiStar } from 'react-icons/fi';

const AllDoctor = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, id: null });
  const [filters, setFilters] = useState({
    speciality: '',
    availability: 'all',
    sortBy: 'name',
  });

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/doctor');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter and search doctors
  useEffect(() => {
    let result = [...doctors];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        doctor =>
          doctor.name.toLowerCase().includes(term) ||
          doctor.speciality.toLowerCase().includes(term) ||
          doctor.email?.toLowerCase().includes(term)
      );
    }

    // Apply filters
    if (filters.speciality) {
      result = result.filter(doctor => 
        doctor.speciality === filters.speciality
      );
    }

    if (filters.availability !== 'all') {
      result = result.filter(doctor => 
        filters.availability === 'available' ? doctor.available : !doctor.available
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return b.experience - a.experience;
        case 'fees':
          return a.fees - b.fees;
        default:
          return 0;
      }
    });

    setFilteredDoctors(result);
  }, [searchTerm, filters, doctors]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/doctor/delete/${id}`);
      setDoctors(prev => prev.filter(doc => doc._id !== id));
      setShowDeleteModal({ show: false, id: null });
      // Show success message
    } catch (error) {
      console.error('Error deleting doctor:', error);
      // Show error message
    }
  };

  const getSpecialities = () => {
    const specialities = new Set(doctors.map(doctor => doctor.speciality));
    return Array.from(specialities);
  };

  const getStats = () => {
    return {
      total: doctors.length,
      available: doctors.filter(doc => doc.available).length,
      specialities: getSpecialities().length,
    };
  };

  const stats = getStats();

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Doctor Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all registered doctors</p>
          </div>
          <button
            onClick={() => navigate('/add-doctor')}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2.5 bg-[#5f6FFF] text-white font-medium rounded-lg hover:bg-[#4a5ae8] transition-colors duration-300"
          >
            <FiPlus className="mr-2" />
            Add New Doctor
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50 text-blue-600 mr-4">
                <FiUser size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50 text-green-600 mr-4">
                <FiClock size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-gray-800">{stats.available}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600 mr-4">
                <FiStar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialties</p>
                <p className="text-2xl font-bold text-gray-800">{stats.specialities}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search doctors by name, specialty or email..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent"
                  value={filters.speciality}
                  onChange={(e) => setFilters({...filters, speciality: e.target.value})}
                >
                  <option value="">All Specialties</option>
                  {getSpecialities().map((spec, index) => (
                    <option key={index} value={spec}>{spec}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent"
                  value={filters.availability}
                  onChange={(e) => setFilters({...filters, availability: e.target.value})}
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2.5 text-sm focus:ring-2 focus:ring-[#5f6fff] focus:border-transparent"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                >
                  <option value="name">Sort by Name</option>
                  <option value="experience">Sort by Experience</option>
                  <option value="fees">Sort by Fees</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={doctor.image || 'https://via.placeholder.com/300x200?text=Doctor'} 
                  alt={doctor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Doctor';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm">{doctor.experience} years experience</p>
                  </div>
                </div>
                <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${
                  doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-500">Fees</p>
                    <p className="text-lg font-bold text-[#5f6FFF]">₹{doctor.fees}</p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="font-medium text-gray-700">{doctor.rating || '4.5'}</span>
                  <span className="mx-1">•</span>
                  <span>{doctor.experience} yrs exp</span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {doctor.email && (
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      <span className="truncate">{doctor.email}</span>
                    </div>
                  )}
                  {doctor.phone && (
                    <div className="flex items-center">
                      <FiPhone className="mr-2 text-gray-400" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f6fff]"
                  >
                    <FiEdit2 className="mr-1.5 h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => setShowDeleteModal({ show: true, id: doctor._id })}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-sm font-medium text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <FiTrash2 className="mr-1.5 h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiUser className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({
                speciality: '',
                availability: 'all',
                sortBy: 'name',
              });
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5f6FFF] hover:bg-[#4a5ae8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f6fff]"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
              <FiTrash2 className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">Delete Doctor</h3>
            <p className="text-gray-500 text-center mb-6">
              Are you sure you want to delete this doctor? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f6fff]"
                onClick={() => setShowDeleteModal({ show: false, id: null })}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => handleDelete(showDeleteModal.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllDoctor;
