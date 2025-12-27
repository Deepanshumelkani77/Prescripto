import React, { useContext, useState, useEffect } from 'react';
import { assets1 } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { showSuccess, showError } from '../utils/toast';

const DoctorAppointment = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;
  const { doctor } = useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [myDoctor, setMyDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

  const checkAndUpdateStatuses = async () => {
    try {
      await axios.patch(`${API_BASE_URL}/appointment/update-statuses`);
      // Refresh appointments after updating statuses
      if (doctor?.id) {
        const appointmentsRes = await axios.get(`${API_BASE_URL}/appointment/doctor/${doctor.id}`);
        setAppointments(appointmentsRes.data);
      }
    } catch (error) {
      console.error('Error updating appointment statuses:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, check and update appointment statuses
        await checkAndUpdateStatuses();
        
        // Then fetch the doctor's data using their ID from the context
        const doctorRes = await axios.get(`${API_BASE_URL}/doctor/${doctor?.id}`);
        setMyDoctor(doctorRes.data || {});
        
        // Then fetch appointments
        const appointmentsRes = await axios.get(`${API_BASE_URL}/appointment/doctor/${doctor?.id}`);
        setAppointments(appointmentsRes.data);
        
        // Fetch all doctors if needed for other purposes
        const doctorsRes = await axios.get(`${API_BASE_URL}/doctor`);
        setDoctors(doctorsRes.data);
        
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (doctor?.id) {
      fetchData();
      // Set up interval to check statuses every 5 minutes
      const intervalId = setInterval(checkAndUpdateStatuses, 5 * 60 * 1000);
      return () => clearInterval(intervalId);
    } else {
      setIsLoading(false);
    }
  }, [doctor?.id]);

  const calculateAge = (dob) => {
    if (!dob) return '-';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    if (isNaN(date.getTime())) return dateTimeStr;
    return date.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
  };

  const updateAppointmentStatus = async (id, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/appointment/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update appointment status');
      }

      // Update the appointments list
      setAppointments(prevAppointments => 
        prevAppointments.map(apt => 
          apt._id === id ? { ...apt, status } : apt
        )
      );

      // Update doctor data if appointment was completed
      if (status === 'completed') {
        try {
          const doctorRes = await axios.get(`${API_BASE_URL}/doctor/${doctor?.id}`);
          setMyDoctor(prev => ({
            ...prev,
            earning: doctorRes.data.earning,
            completed_appointment: doctorRes.data.completed_appointment
          }));
        } catch (err) {
          console.error('Error fetching updated doctor data:', err);
        }
      }

      // Show success message
      const statusMessages = {
        'confirmed': 'Appointment confirmed successfully!',
        'completed': 'Appointment marked as completed!',
        'cancelled': 'Appointment has been cancelled.',
        'pending': 'Appointment status updated to pending.'
      };
      
      showSuccess(statusMessages[status] || 'Appointment updated successfully!');
      return data;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      showError(error.message || 'Failed to update appointment. Please try again.');
      throw error;
    }
  };

  const handleConfirm = async (id) => {
    if (window.confirm('Are you sure you want to confirm this appointment?')) {
      try {
        await updateAppointmentStatus(id, 'confirmed');
      } catch (error) {
        // Error is already handled in updateAppointmentStatus
      }
    }
  };

  const handleComplete = async (id) => {
    if (window.confirm('Mark this appointment as completed?')) {
      try {
        await updateAppointmentStatus(id, 'completed');
      } catch (error) {
        // Error is already handled in updateAppointmentStatus
      }
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await updateAppointmentStatus(id, 'cancelled');
      } catch (error) {
        // Error is already handled in updateAppointmentStatus
      }
    }
  };

  const [earning, setEarning] = useState({ earnings: 0, completed_appointment: 0 });

  useEffect(() => {
    const updateEarnings = async () => {
      if (!earning.earnings || !myDoctor?._id) return;
      try {
        const res = await axios.post(`${API_BASE_URL}/doctor/edit_earning/${myDoctor._id}`, earning);
        if (res.status === 200) {
          console.log("Earning updated!");
        }
      } catch (err) {
        console.error("Failed to update earnings:", err);
      }
    };

    updateEarnings();
  }, [earning, myDoctor]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 flex items-center gap-3">
          <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
            <img src={assets1.earning_icon} alt="earning" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm text-gray-500">Total Earnings</h4>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-green-600">₹{myDoctor?.earning?.toLocaleString() || 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 md:p-6 flex items-center gap-3">
          <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
            <img src={assets1.appointment_icon} alt="appointments" className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm text-gray-500">Appointments Done</h4>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-600">{myDoctor?.completed_appointment || 0}</p>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-3 sm:px-6 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">My Appointments</h2>
          <div className="text-xs text-gray-500 sm:hidden">
            {appointments.filter(a => a.doc_id?._id === myDoctor?._id).length} total
          </div>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden">
          {appointments
            .filter(a => {
              const docId = typeof a.doc_id === 'string' ? a.doc_id : a.doc_id?._id;
              return docId === doctor?.id;
            })
            .sort((a, b) => {
              const priority = {
                'pending': 1,
                'confirmed': 2,
                'completed': 3,
                'cancelled': 4
              };
              return priority[a.status] - priority[b.status];
            })
            .map((item, idx) => (
              <div key={item._id} className="border-b border-gray-100 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.user_id?.image} 
                      className="w-10 h-10 rounded-full object-cover" 
                      alt="patient" 
                    />
                    <div>
                      <p className="font-medium text-gray-900">{item.user_id?.username || 'Unknown'}</p>
                      <p className="text-xs text-gray-500">{formatDateTime(`${item.date} ${item.time}`)}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : item.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {item.status === 'completed' 
                      ? 'Completed' 
                      : item.status === 'cancelled'
                      ? 'Cancelled'
                      : item.status === 'confirmed'
                      ? 'Confirmed'
                      : 'Pending'}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>Age: {calculateAge(item.user_id?.dob)}</span>
                    <span className="text-gray-300">•</span>
                    <span className={`${item.paid ? 'text-green-600' : 'text-yellow-600'}`}>
                      {item.paid ? 'Paid' : 'Cash'}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {item.status === 'pending' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfirm(item._id);
                          }}
                          className="p-1.5 hover:bg-blue-50 rounded-full transition-colors text-blue-600"
                          title="Confirm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancel(item._id);
                          }}
                          className="p-1.5 hover:bg-red-50 rounded-full transition-colors text-red-600"
                          title="Cancel"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    )}
                    
                    {item.status === 'confirmed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleComplete(item._id);
                        }}
                        className="p-1.5 hover:bg-green-50 rounded-full transition-colors text-green-600"
                        title="Complete"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {appointments.filter(a => a.doc_id?._id === myDoctor?._id).length === 0 && (
            <div className="p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500">No appointments found</p>
              </div>
            </div>
          )}
        </div>

        {/* Desktop View - Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Age</th>
                <th className="px-4 py-3 font-medium">Date & Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments
                .filter(a => {
                  const docId = typeof a.doc_id === 'string' ? a.doc_id : a.doc_id?._id;
                  return docId === doctor?.id;
                })
                .sort((a, b) => {
                  const priority = {
                    'pending': 1,
                    'confirmed': 2,
                    'completed': 3,
                    'cancelled': 4
                  };
                  return priority[a.status] - priority[b.status];
                })
                .map((item, idx) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.user_id?.image} 
                        className="w-9 h-9 rounded-full object-cover" 
                        alt="patient" 
                      />
                      <span className="font-medium text-gray-900">{item.user_id?.username || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.paid ? 'Paid' : 'Cash'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{calculateAge(item.user_id?.dob)}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">
                      {new Date(`${item.date} ${item.time}`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(`${item.date} ${item.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'cancelled'
                        ? 'bg-red-100 text-red-800'
                        : item.status === 'confirmed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'completed' 
                        ? 'Completed' 
                        : item.status === 'cancelled'
                        ? 'Cancelled'
                        : item.status === 'confirmed'
                        ? 'Confirmed'
                        : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1">
                      {item.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleConfirm(item._id)}
                            className="p-1.5 hover:bg-blue-50 rounded-full transition-colors text-blue-600"
                            title="Confirm Appointment"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleCancel(item._id)}
                            className="p-1.5 hover:bg-red-50 rounded-full transition-colors text-red-600"
                            title="Cancel Appointment"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </>
                      )}
                      
                      {item.status === 'confirmed' && (
                        <button
                          onClick={() => handleComplete(item._id)}
                          className="p-1.5 hover:bg-green-50 rounded-full transition-colors text-green-600"
                          title="Mark as Completed"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                      
                      {item.status === 'completed' && (
                        <span className="text-xs text-green-600 font-medium">Completed</span>
                      )}
                      
                      {item.status === 'cancelled' && (
                        <span className="text-xs text-red-600 font-medium">Cancelled</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {appointments.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500">No appointments found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
