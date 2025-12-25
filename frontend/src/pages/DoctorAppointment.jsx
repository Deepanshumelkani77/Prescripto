import React, { useContext, useState, useEffect } from 'react';
import { assets1 } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const DoctorAppointment = () => {
  const { doctor } = useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [myDoctor, setMyDoctor] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes] = await Promise.all([
          axios.get(`http://localhost:5000/appointment/doctor/${doctor?.id}`),
          axios.get('http://localhost:5000/doctor')
        ]);
      
        setAppointments(appointmentsRes.data);
        setDoctors(doctorsRes.data);
        const found = doctorsRes.data.find(doc => doc.id === doctor?.id);
        setMyDoctor(found || {});
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [doctor]);

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
      const response = await fetch(`http://localhost:5000/appointment/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Update the appointment in the local state
        setAppointments(prev => 
          prev.map(appt => 
            appt._id === id ? { ...appt, status } : appt
          )
        );
        
        // If status is completed, fetch updated doctor data
        if (status === 'completed') {
          try {
            const doctorRes = await axios.get(`http://localhost:5000/doctor/${doctor?.id}`);
            setMyDoctor(prev => ({
              ...prev,
              earning: doctorRes.data.earning,
              completed_appointment: doctorRes.data.completed_appointment
            }));
          } catch (err) {
            console.error('Error fetching updated doctor data:', err);
          }
        }
        
        alert(`Appointment ${status} successfully`);
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      alert(error.message || 'Failed to update appointment status');
    }
  };

  const handleConfirm = async (id) => {
    if (window.confirm('Are you sure you want to confirm this appointment?')) {
      await updateAppointmentStatus(id, 'confirmed');
    }
  };

  const handleComplete = async (id) => {
    if (window.confirm('Mark this appointment as completed?')) {
      await updateAppointmentStatus(id, 'completed');
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      await updateAppointmentStatus(id, 'cancelled');
    }
  };

  const [earning, setEarning] = useState({ earnings: 0, completed_appointment: 0 });

  useEffect(() => {
    const updateEarnings = async () => {
      if (!earning.earnings || !myDoctor?._id) return;
      try {
        const res = await axios.post(`http://localhost:5000/doctor/edit_earning/${myDoctor._id}`, earning);
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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex items-center gap-4">
          <img src={assets1.earning_icon} alt="earning" className="w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <h4 className="text-gray-600 text-sm sm:text-base">Total Earnings</h4>
            <p className="text-xl sm:text-2xl font-semibold text-green-600">₹{myDoctor?.earning || 0}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 flex items-center gap-4">
          <img src={assets1.appointment_icon} alt="appointments" className="w-10 h-10 sm:w-12 sm:h-12" />
          <div>
            <h4 className="text-gray-600 text-sm sm:text-base">Appointments Done</h4>
            <p className="text-xl sm:text-2xl font-semibold text-blue-600">{myDoctor?.completed_appointment || 0}</p>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">My Appointments</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium hidden md:table-cell">#</th>
                <th className="px-4 py-3 font-medium">Patient</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Payment</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Age</th>
                <th className="px-4 py-3 font-medium">Date & Time</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.filter(a => a.doc_id?._id === myDoctor?._id).map((item, idx) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 hidden md:table-cell">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <img 
                        src={item.user_id?.image} 
                        className="w-8 h-8 rounded-full object-cover" 
                        alt="patient" 
                      />
                      <span className="hidden md:inline">{item.user_id?.username || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.paid ? 'Paid' : 'Cash'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">{calculateAge(item.user_id?.dob)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{formatDateTime(`${item.date} ${item.time}`)}</span>
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
                    <div className="flex justify-center gap-2">
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

              {appointments.filter(a => a.doc_id?._id === myDoctor?._id).length === 0 && (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>No appointments found</p>
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
