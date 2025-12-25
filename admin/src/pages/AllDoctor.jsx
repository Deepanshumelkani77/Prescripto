import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiClock, FiDollarSign, FiAlertCircle, FiUser, FiCheckCircle, FiStar, FiMapPin } from 'react-icons/fi';

// Skeleton Loader Component
const DoctorCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="flex gap-2 pt-2">
        <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
        <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
      </div>
    </div>
  </div>
);

const AllDoctor = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/doctor');
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter and sort doctors
  const filteredDoctors = useMemo(() => {
    return doctor
      .filter(doctor => {
        const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.speciality.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'available' && doctor.available) ||
                           (statusFilter === 'unavailable' && !doctor.available);
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'experience') return b.experience - a.experience;
        if (sortBy === 'fees') return a.fees - b.fees;
        return 0;
      });
  }, [doctor, searchQuery, statusFilter, sortBy]);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${name}?`)) {
      try {
        await axios.delete(`http://localhost:5000/doctor/delete/${id}`);
        setDoctor(prev => prev.filter(doc => doc._id !== id));
        toast.success('Doctor deleted successfully');
      } catch (error) {
        console.error('Error deleting doctor:', error);
        toast.error('Failed to delete doctor');
      }
    }
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = 'https://img.freepik.com/free-vector/doctor-icon-avatar-white_136162-58.jpg';
  };

  return (
    <div className="p-6 max-h-[calc(100vh-80px)] overflow-y-auto w-full">
      <div className="w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Doctor Management</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all registered doctors</p>
          </div>
          <button
            onClick={() => navigate('/add-doctor')}
            className="inline-flex items-center px-4 py-2.5 bg-[#5f6FFF] hover:bg-[#4a5ae8] text-white rounded-lg font-medium transition-colors duration-200 shadow-sm"
          >
            <FiPlus className="mr-2" />
            Add New Doctor
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
            
            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Sort by Name</option>
                <option value="experience">Sort by Experience</option>
                <option value="fees">Sort by Fees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-900">{doctor.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-50">
                <FiUser className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Available</p>
                <p className="text-3xl font-bold text-gray-900">
                  {doctor.filter(doc => doc.available).length}
                </p>
              </div>
              <div className="p-3 rounded-full bg-green-50">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Specialties</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(doctor.map(doc => doc.speciality)).size}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-50">
                <FiAlertCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <DoctorCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map((item) => (
              <div 
                key={item._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative w-full pt-[75%] overflow-hidden">
                  <img 
                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={item.image} 
                    alt={item.name}
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      item.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#5f6FFF] transition-colors">
                        Dr. {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.speciality}</p>
                    </div>
                    <div className="flex items-center text-sm text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      <FiStar className="w-4 h-4 mr-1 fill-current" />
                      {item.rating || '4.8'}
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FiMapPin className="w-4 h-4 mr-1.5 text-gray-400" />
                    {item.hospital || 'City Hospital'}
                  </div>

                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center text-gray-600">
                      <FiClock className="w-4 h-4 mr-1.5 text-gray-400" />
                      {item.experience} years exp.
                    </div>
                    <div className="font-medium text-gray-900">
                      ₹{item.fees} <span className="text-gray-500 font-normal">/consultation</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => navigate(`/edit-doctor/${item._id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.name)}
                      className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-100">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No doctors found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `No doctors match "${searchQuery}"` 
                : 'There are no doctors available at the moment.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#5f6FFF] hover:bg-[#4a5ae8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5f6FFF]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctor;
