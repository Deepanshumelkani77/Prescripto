import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiCheckCircle, FiX, FiCreditCard, FiTrash2, FiUser, FiAlertCircle } from 'react-icons/fi';

const MyAppointment = () => {
  const { doctors, user } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState({ show: false, id: null });



  useEffect(() => {
    
    const fetchAppointments = async () => {
  setLoading(true);
  try {
    const response = await axios.get(`http://localhost:5000/appointment/user/${user?.id}`);
    console.log("Appointments from backend:", response.data);
    setAppointment(response.data);
    console.log("Appointments set in state:", response.data[0]);
  } catch (error) {
    console.error("Error fetching appointment data:", error);
  
  } finally {
    setLoading(false);
  }
};

    if (user?.id) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user?.id]); // Add user.id as a dependency

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/appointment/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointment(prev => prev.filter(doc => doc._id !== id));
        setShowCancelModal({ show: false, id: null });
      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('An error occurred while canceling the appointment.');
    }
  };

  const handlePayment = async (amount, appointmentId) => {
    try {
      const res = await axios.post("http://localhost:5000/payment/create-order", { amount });

      const options = {
        key: "rzp_test_PuXf2SZhGaKEGd",
        amount: res.data.amount,
        currency: "INR",
        name: "Prescripto",
        description: "Appointment Payment",
        order_id: res.data.id,
        handler: async function (response) {
          try {
            await axios.post(`http://localhost:5000/appointment/update-payment/${appointmentId}`, {
              paid: true,
              payment_id: response.razorpay_payment_id,
            });
            // Update local state to reflect payment
            setAppointment(prev => prev.map(apt => 
              apt._id === appointmentId ? { ...apt, paid: true } : apt
            ));
          } catch (error) {
            console.error("Error updating payment status:", error);
            alert("Payment succeeded, but failed to update appointment status.");
          }
        },
        prefill: {
          name: user?.username,
          email: user?.email,
        },
        theme: {
          color: "#5f6FFF",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error creating payment order:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  // Get appointments for the current user
  const userAppointments = appointment.filter(item => {
    const itemUserId = typeof item.user_id === 'object' ? item.user_id?._id : item.user_id;
    return itemUserId === user?.id;
  });
  
  // Filter upcoming and past appointments
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingAppointments = userAppointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    return appointmentDate >= today;
  });
  
  const pastAppointments = userAppointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    return appointmentDate < today;
  });
  
  // Sort appointments by date and time
  const sortAppointments = (appointments) => {
    return [...appointments].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
  };
  
  const sortedUpcoming = sortAppointments(upcomingAppointments);
  const sortedPast = sortAppointments(pastAppointments);
  
  const currentAppointments = activeTab === 'upcoming' ? sortedUpcoming : sortedPast;

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600">Loading your appointments...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-500 mt-2">Manage and view your upcoming and past appointments</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`${activeTab === 'upcoming' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FiCalendar className="mr-2" />
            Upcoming ({sortedUpcoming.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`${activeTab === 'past' 
              ? 'border-blue-500 text-blue-600' 
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} 
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FiCheckCircle className="mr-2" />
            Past ({sortedPast.length})
          </button>
        </nav>
      </div>

      {userAppointments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-blue-50 mb-4">
            <FiCalendar className="h-12 w-12 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            You don't have any {activeTab} appointments. Book an appointment to get started.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/doctors')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Find a Doctor
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {currentAppointments.map((item) => {
            const appointmentDate = new Date(item.date);
            const isUpcoming = appointmentDate >= new Date();
            
            return (
              <div 
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Doctor Image and Basic Info */}
                    <div className="md:w-48 flex-shrink-0">
                      <div className="relative">
                        <img 
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                          src={item.doc_id?.image || 'https://via.placeholder.com/150'} 
                          alt={item.doc_id?.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150';
                          }}
                        />
                        {item.paid && (
                          <div className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                            <FiCheckCircle className="mr-1" /> Paid
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <h3 className="font-medium text-gray-900">Dr. {item.doc_id?.name}</h3>
                        <p className="text-sm text-blue-600">{item.doc_id?.speciality}</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {item.doc_id?.experience || '5+'} years experience
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                <FiCalendar className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Date</p>
                                <p className="text-sm text-gray-900">{formatDate(item.date)}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                <FiClock className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Time</p>
                                <p className="text-sm text-gray-900">{item.time}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                <FiDollarSign className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Consultation Fee</p>
                                <p className="text-sm text-gray-900">₹{item.doc_id?.fees || '500'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Doctor's Information</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                <FiUser className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Name</p>
                                <p className="text-sm text-gray-900">Dr. {item.doc_id?.name}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                <FiMapPin className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Location</p>
                                <p className="text-sm text-gray-900">
                                  {item.doc_id?.address?.line1 || '123 Medical Center'}
                                  {item.doc_id?.address?.line2 && `, ${item.doc_id.address.line2}`}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <div className="flex-shrink-0 h-5 w-5 text-gray-400">
                                <FiAlertCircle className="h-5 w-5" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-500">Status</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  item.status === 'completed' 
                                    ? 'bg-gray-100 text-gray-800' 
                                    : item.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {item.status === 'completed' 
                                    ? 'Completed' 
                                    : item.status === 'cancelled'
                                    ? 'Cancelled'
                                    : 'Pending'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      {(item.status === 'pending' || isUpcoming) && (
                        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                          {!item.paid ? (
                            <button
                              onClick={() => handlePayment(item.doc_id?.fees || 500, item._id)}
                              className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              <FiCreditCard className="mr-2 h-4 w-4" />
                              Pay Now
                            </button>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FiCheckCircle className="mr-1.5 h-4 w-4" />
                              Payment Completed
                            </span>
                          )}
                          
                          <button
                            onClick={() => setShowCancelModal({ show: true, id: item._id })}
                            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <FiX className="mr-2 h-4 w-4" />
                            Cancel Appointment
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal.show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FiTrash2 className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Cancel appointment</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel this appointment? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => handleDelete(showCancelModal.id)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Yes, cancel appointment
                </button>
                <button
                  type="button"
                  onClick={() => setShowCancelModal({ show: false, id: null })}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Go back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
