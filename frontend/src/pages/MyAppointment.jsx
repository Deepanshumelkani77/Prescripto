import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiCalendar, FiClock, FiMapPin, FiDollarSign, FiCheckCircle, FiX, FiCreditCard, FiTrash2, FiUser, FiAlertCircle } from 'react-icons/fi';

const MyAppointment = () => {
  const { doctors, user } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCancelModal, setShowCancelModal] = useState({ show: false, id: null });

  // Function to categorize appointments
  const categorizeAppointments = (appointmentsList) => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().substring(0, 5);
    console.log('Current date/time:', currentDate, currentTime);

    return appointmentsList.reduce((acc, appointment) => {
      console.log('Processing appointment:', {
        id: appointment._id,
        date: appointment.date,
        time: appointment.time,
        status: appointment.status
      });

      // Parse the appointment date and time
      const [year, month, day] = appointment.date.split('-').map(Number);
      const [hours, minutes] = appointment.time.split(':').map(Number);
      
      // Create date objects in local timezone
      const apptDate = new Date(year, month - 1, day, hours, minutes);
      const currentDateObj = new Date();
      
      console.log('Appointment datetime:', apptDate.toString());
      console.log('Current datetime:', currentDateObj.toString());
      
      // Check if appointment is in the past or has a completed/cancelled status
      const isPast = apptDate < currentDateObj;
      console.log('Is past?', isPast);
      
      if (isPast || appointment.status === 'completed' || appointment.status === 'cancelled') {
        console.log('Adding to past appointments');
        acc.past.push(appointment);
      } else {
        console.log('Adding to upcoming appointments');
        acc.upcoming.push(appointment);
      }
      
      return acc;
    }, { upcoming: [], past: [] });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/appointment/user/${user?.id}`);
        console.log('Raw API response:', response.data);
        const { upcoming, past } = categorizeAppointments(response.data);
        setAppointments(response.data);
        setUpcomingAppointments(upcoming);
        setPastAppointments(past);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
        toast.error("Failed to load appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

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
        // Update the appointment in the local state and recategorize
        setAppointments(prev => {
          const updated = prev.map(appt => 
            appt._id === id ? { ...appt, status } : appt
          );
          const { upcoming, past } = categorizeAppointments(updated);
          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
          return updated;
        });
        
        setShowCancelModal({ show: false, id: null });
        toast.success(`Appointment ${status} successfully`);
        return true;
      } else {
        throw new Error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast.error(error.message || 'Failed to update appointment status');
      return false;
    }
  };

  const handleCancel = async (id) => {
    const confirm = window.confirm('Are you sure you want to cancel this appointment?');
    if (!confirm) return;
    
    const success = await updateAppointmentStatus(id, 'cancelled');
    if (success) {
      setShowCancelModal({ show: false, id: null });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/appointment/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointments(prev => {
          const updated = prev.filter(doc => doc._id !== id);
          const { upcoming, past } = categorizeAppointments(updated);
          setUpcomingAppointments(upcoming);
          setPastAppointments(past);
          return updated;
        });
        setShowCancelModal({ show: false, id: null });
        toast.success('Appointment deleted successfully');
      } else {
        throw new Error('Failed to delete appointment');
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast.error(error.message || 'An error occurred while deleting the appointment.');
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
            setAppointments(prev => prev.map(apt => 
              apt._id === appointmentId ? { ...apt, paid: true } : apt
            ));
            toast.success('Payment successful!');
          } catch (error) {
            console.error("Error updating payment status:", error);
            toast.error("Payment succeeded, but failed to update appointment status.");
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
      toast.error("Failed to initiate payment. Please try again.");
    }
  };

  const renderAppointments = () => {
    if (loading) {
      return <div className="text-center py-8">Loading appointments...</div>;
    }

    const displayAppointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments;
    
    if (displayAppointments.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No {activeTab} appointments found.</p>
          <button
            onClick={() => window.location.href = '/doctor'}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiUser className="mr-2" /> Find a Doctor
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {displayAppointments.map((item) => {
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
                                  : item.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800'
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
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    {(item.status === 'pending' || item.status === 'confirmed') && (
                      <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                        {!item.paid ? (
                          <button
                            onClick={() => handlePayment(item.doc_id?.fees || 500, item._id)}
                            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            disabled={item.status !== 'confirmed'}
                          >
                            <FiCreditCard className="mr-2 h-4 w-4" />
                            {item.status === 'confirmed' ? 'Pay Now' : 'Awaiting Confirmation'}
                          </button>
                        ) : (
                          <div className="flex flex-col space-y-2">
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <FiCheckCircle className="mr-1.5 h-4 w-4" />
                              Payment Completed
                            </span>
                            {item.status === 'completed' && (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <FiCheckCircle className="mr-1.5 h-4 w-4" />
                                Appointment Completed
                              </span>
                            )}
                            {item.status === 'cancelled' && (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <FiX className="mr-1.5 h-4 w-4" />
                                Appointment Cancelled
                              </span>
                            )}
                          </div>
                        )}
                        
                        {item.status !== 'cancelled' && item.status !== 'completed' && (
                          <button
                            onClick={() => setShowCancelModal({ show: true, id: item._id })}
                            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            <FiX className="mr-2 h-4 w-4" />
                            {item.status === 'pending' ? 'Cancel Request' : 'Cancel Appointment'}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming
            {upcomingAppointments.length > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {upcomingAppointments.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'past'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past
            {pastAppointments.length > 0 && (
              <span className="ml-2 bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {pastAppointments.length}
              </span>
            )}
          </button>
        </nav>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {renderAppointments()}
      </div>

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
