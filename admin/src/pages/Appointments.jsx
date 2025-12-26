import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiSearch, FiFilter, FiDownload, FiMoreVertical, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaUserMd, FaRegCalendarCheck, FaRegClock } from 'react-icons/fa';
import axios from 'axios';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  // Fetch appointments data
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointment');
        console.log('API Response:', response.data);
        setAppointments(response.data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter(appointment => {
      if (!appointment) return false;
      
      const searchTermLower = searchTerm?.toLowerCase() || '';
      const patientName = appointment.user_id?.name?.toLowerCase() || '';
      const doctorName = appointment.doc_id?.name?.toLowerCase() || '';
      
      const matchesSearch = 
        patientName.includes(searchTermLower) ||
        doctorName.includes(searchTermLower) ||
        appointment.service?.toLowerCase().includes(searchTermLower) ||
        appointment.status?.toLowerCase().includes(searchTermLower);

      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      const matchesDate = !dateFilter || new Date(appointment.date).toISOString().split('T')[0] === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    })
    .sort((a, b) => {
      // Sort by status: pending > confirmed > completed/cancelled
      const statusOrder = { 'pending': 1, 'confirmed': 2, 'completed': 3, 'cancelled': 3 };
      const statusA = statusOrder[a.status] || 4;
      const statusB = statusOrder[b.status] || 4;
      
      // If same status, sort by date and time
      if (statusA === statusB) {
        const dateA = new Date(`${a.date}T${a.time}`);
        const dateB = new Date(`${b.date}T${b.time}`);
        return dateA - dateB;
      }
      
      return statusA - statusB;
    });

  // Handle status update
  const updateAppointmentStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/appointment/${id}/status`, { status: newStatus });
      setAppointments(appointments.map(apt => 
        apt._id === id ? { ...apt, status: newStatus } : apt
      ));
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="w-full md:pl-[280px] pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all appointments</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-[#5f6FFF] hover:bg-[#4a5ae8] text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200">
              <FiCalendar className="mr-2" />
              New Appointment
            </button>
          </div>
        </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5f6FFF] focus:border-transparent"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Appointments list */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4">
            {filteredAppointments.map((appointment) => {
              const statusColors = {
                pending: { bg: 'bg-yellow-50', text: 'text-yellow-800', dot: 'bg-yellow-500' },
                confirmed: { bg: 'bg-blue-50', text: 'text-blue-800', dot: 'bg-blue-500' },
                completed: { bg: 'bg-green-50', text: 'text-green-800', dot: 'bg-green-500' },
                cancelled: { bg: 'bg-red-50', text: 'text-red-800', dot: 'bg-red-500' },
              };
              
              const status = appointment.status || 'pending';
              const colors = statusColors[status] || statusColors.pending;
              
              return (
                <div 
                  key={appointment._id} 
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 overflow-hidden"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg font-semibold">
                            {appointment.user_id?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:space-x-2">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                              {appointment.user_id?.name || 'Unknown User'}
                            </h3>
                            <span className="text-xs text-gray-500">
                              ID: {appointment.user_id?._id?.substring(0, 8) || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center mt-1 text-xs sm:text-sm text-gray-500 flex-wrap gap-x-2">
                            <span className="flex items-center">
                              <FiCalendar className="h-3.5 w-3.5 mr-1" />
                              {formatDate(appointment.date)}
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="flex items-center font-medium text-gray-700">
                              <FiClock className="h-3.5 w-3.5 mr-1" />
                              {appointment.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pl-0 sm:pl-4">
                        <div className="flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}>
                            <span className={`w-2 h-2 rounded-full ${colors.dot} mr-1.5`}></span>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(appointment._id, 'confirmed')}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(appointment._id, 'cancelled')}
                                className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {status === 'confirmed' && (
                            <button
                              onClick={() => updateAppointmentStatus(appointment._id, 'completed')}
                              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                            >
                              Complete
                            </button>
                          )}
                          <div className="relative">
                            <button 
                              className="p-1.5 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Toggle dropdown or show options
                              }}
                            >
                              <FiMoreVertical className="h-4 w-4" />
                            </button>
                            {/* Dropdown menu would go here */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-1">Doctor</p>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-xs font-medium mr-2">
                              {appointment.doc_id?.name?.charAt(0)?.toUpperCase() || 'D'}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                Dr. {appointment.doc_id?.name || 'N/A'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {appointment.doc_id?.speciality || 'General Practitioner'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-1">Service</p>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-2">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              {appointment.service || 'General Checkup'}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-xs font-medium text-gray-500 mb-1">Contact</p>
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-2">
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-sm text-gray-900">{appointment.user_id?.email || 'N/A'}</p>
                              <p className="text-xs text-gray-500">{appointment.user_id?.phone || 'No phone'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {filteredAppointments.length > 10 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">
                      {Math.min(10, filteredAppointments.length)}
                    </span> of{' '}
                    <span className="font-medium">{filteredAppointments.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      1
                    </button>
                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      2
                    </button>
                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
};

export default Appointments;
