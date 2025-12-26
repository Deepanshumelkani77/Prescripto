import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { 
  FiSearch, FiFilter, FiStar, FiClock, FiMapPin, 
  FiAward, FiCalendar, FiCheckCircle, FiArrowRight,
  FiChevronDown, FiChevronUp,FiUser
} from 'react-icons/fi';

const Doctor = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [cities, setCities] = useState([]);

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/doctor');
        setDoctor(response.data);
        const uniqueCities = [...new Set(response.data.map(doc => doc.city).filter(Boolean))];
        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on speciality, search, experience, and city
  useEffect(() => {
    let filtered = [...doctor];
    
    // Filter by speciality with null check
    if (speciality) {
      filtered = filtered.filter(doc => 
        doc.speciality && doc.speciality.toLowerCase() === speciality.toLowerCase()
      );
    }
    
    // Filter by search query with null checks
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        (doc.name && doc.name.toLowerCase().includes(query)) || 
        (doc.speciality && doc.speciality.toLowerCase().includes(query)) ||
        (doc.hospital && doc.hospital.toLowerCase().includes(query)) ||
        (doc.city && doc.city.toLowerCase().includes(query))
      );
    }
    
    // Filter by experience with null check
    if (experienceFilter !== 'all') {
      const minExp = parseInt(experienceFilter);
      filtered = filtered.filter(doc => doc.experience && doc.experience >= minExp);
    }

    // Filter by city
    if (cityFilter !== 'all') {
      filtered = filtered.filter(doc => doc.city && doc.city.toLowerCase() === cityFilter.toLowerCase());
    }
    
    // Sort doctors with null checks
    filtered.sort((a, b) => {
      // Handle cases where properties might be undefined
      const aRating = a.rating || 0;
      const bRating = b.rating || 0;
      const aExperience = a.experience || 0;
      const bExperience = b.experience || 0;
      const aFees = a.fees || 0;
      const bFees = b.fees || 0;
      
      switch(sortBy) {
        case 'experience':
          return bExperience - aExperience;
        case 'fees_low':
          return aFees - bFees;
        case 'fees_high':
          return bFees - aFees;
        case 'rating':
          return bRating - aRating;
        default:
          return bRating - aRating; // Default to rating
      }
    });
    
    setFilterDoc(filtered);
  }, [doctor, speciality, searchQuery, experienceFilter, cityFilter, sortBy]);

  const handleSpecialityClick = (spec) => {
    if (spec === 'All' || (speciality && speciality.toLowerCase() === spec.toLowerCase())) {
      navigate('/doctor');
    } else {
      navigate(`/doctor/${spec.toLowerCase()}`);
    }
  };

  const specialities = [
    'Cardiologist', 'Dermatologist', 'Pediatrician', 'Neurologist',
    'Orthopedic', 'Gynecologist', 'Dentist', 'General Physician',
    'ENT Specialist', 'Ophthalmologist', 'Psychiatrist', 'Urologist'
  ];

  const renderDoctorCard = (doctor) => (
    <div 
      key={doctor._id}
      onClick={() => {
        navigate(`/appointment/${doctor._id}`);
        window.scrollTo(0, 0);
      }}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col transform hover:-translate-y-1"
    >
      {/* Doctor Image with Overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={doctor.image || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
          alt={doctor.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
          }}
        />
        
        {/* Speciality Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
            {doctor.speciality || 'Specialist'}
          </span>
        </div>
        
        {/* Availability Badge */}
        {doctor.isAvailable ? (
          <div className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center shadow-md z-20">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
            Available Today
          </div>
        ) : (
          <div className="absolute top-3 right-3 bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center shadow-md z-20">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
            Booked Out
          </div>
        )}
        
        {/* Hover Overlay Content */}
        <div className="absolute inset-0 flex items-end p-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/appointment/${doctor._id}`);
              }}
              className="w-full bg-white text-blue-600 hover:bg-blue-50 font-medium py-2.5 px-4 rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center"
            >
              <span>Book Appointment</span>
              <FiArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Doctor Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                Dr. {doctor.name}
              </h3>
              <p className="text-blue-600 font-medium text-sm mt-1">
                {doctor.speciality || 'Medical Specialist'}
              </p>
            </div>
            <div className="flex items-center bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded">
              <FiStar className="w-3.5 h-3.5 mr-1 fill-current" />
              {doctor.rating ? `${doctor.rating.toFixed(1)}` : '4.5'}
            </div>
          </div>
          
          {/* Hospital/Location */}
          {doctor.hospital && (
            <div className="mt-3 flex items-start">
              <FiMapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-gray-600 text-sm line-clamp-2">
                {doctor.hospital}
              </p>
            </div>
          )}
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="bg-gray-50 p-2.5 rounded-lg">
              <div className="text-gray-500 text-xs mb-1">Experience</div>
              <div className="font-medium text-gray-900 flex items-center">
                <FiAward className="w-4 h-4 text-blue-500 mr-2" />
                {doctor.experience || '5'}+ Years
              </div>
            </div>
            <div className="bg-gray-50 p-2.5 rounded-lg">
              <div className="text-gray-500 text-xs mb-1">Patients</div>
              <div className="font-medium text-gray-900 flex items-center">
                <FiUser className="w-4 h-4 text-purple-500 mr-2" />
                {doctor.patients || '1.2k'}+ Patients
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Consultation Fee</p>
            <p className="text-lg font-bold text-gray-900">₹{doctor.fees || '500'}</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/appointment/${doctor._id}`);
            }}
            className="hidden sm:inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <span>Book Now</span>
            <FiArrowRight className="ml-2 w-4 h-4" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/appointment/${doctor._id}`);
            }}
            className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            <FiCalendar className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:mb-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 mb-3">
            Find the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Right Doctor</span>
          </h1>
          <p className="text-gray-600 lg:text-lg max-w-2xl mx-auto">
            Connect with experienced doctors for in-person or virtual consultations. Book appointments instantly.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-4 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search doctors, specializations, hospitals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiFilter className="mr-2 h-5 w-5" />
                {showMobileFilters ? 'Hide Filters' : 'Filters'}
              </button>
              <div className="hidden md:flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="experience">Experience: High to Low</option>
                  <option value="fees_low">Price: Low to High</option>
                  <option value="fees_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Mobile Filters */}
          {(showMobileFilters || window.innerWidth >= 768) && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Experience</option>
                    <option value="5">5+ Years</option>
                    <option value="10">10+ Years</option>
                    <option value="15">15+ Years</option>
                    <option value="20">20+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Cities</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-6">
              <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                <FiFilter className="mr-2 text-blue-600" />
                Filter by Speciality
              </h3>
              <div className="space-y-2 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {specialities.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => handleSpecialityClick(spec)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-colors ${
                      (spec === 'All' && !speciality) || 
                      (spec !== 'All' && speciality === spec.toLowerCase())
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Experience</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Experience' },
                    { value: '5', label: '5+ Years' },
                    { value: '10', label: '10+ Years' },
                    { value: '15', label: '15+ Years' },
                    { value: '20', label: '20+ Years' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={experienceFilter === option.value}
                        onChange={() => setExperienceFilter(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">City</h4>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Cities' },
                    ...cities.map((city) => ({ value: city, label: city })),
                  ].map((option) => (
                    <label key={option.value} className="flex items-center">
                      <input
                        type="radio"
                        name="city"
                        value={option.value}
                        checked={cityFilter === option.value}
                        onChange={() => setCityFilter(option.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setExperienceFilter('all');
                  setCityFilter('all');
                  setSearchQuery('');
                  navigate('/doctor');
                }}
                className="mt-6 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Speciality Tabs - Mobile */}
            <div className="lg:hidden mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900">Specialities</h3>
                <button 
                  onClick={() => setShowFilter(!showFilter)}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                  {showFilter ? 'Hide' : 'Show'}
                  {showFilter ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
                </button>
              </div>
              {showFilter && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {['All', ...specialities].map((spec) => (
                    <button
                      key={spec}
                      onClick={() => spec === 'All' ? navigate('/doctor') : handleSpecialityClick(spec)}
                      className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                        (spec === 'All' && !speciality) || 
                        (spec !== 'All' && speciality === spec.toLowerCase())
                          ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">
                {speciality ? `${speciality} Specialists` : 'All Doctors'}
                <span className="text-gray-500 ml-2">({filterDoc.length})</span>
              </h2>
              <div className="hidden md:block">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="experience">Experience: High to Low</option>
                  <option value="fees_low">Price: Low to High</option>
                  <option value="fees_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-5 space-y-3">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        <div className="h-10 bg-gray-200 rounded mt-4"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filterDoc.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filterDoc.map(renderDoctorCard)}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-50 mb-4">
                  <FiUser className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-6">
                  We couldn't find any doctors matching your criteria. Try adjusting your filters.
                </p>
                <button
                  onClick={() => {
                    setExperienceFilter('all');
                    setCityFilter('all');
                    setSearchQuery('');
                    setSpeciality(null);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
