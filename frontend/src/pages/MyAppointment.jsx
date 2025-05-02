import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const MyAppointment = () => {
  const { doctors, user } = useContext(AppContext);
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:5000/appointment')
      .then(response => {
        console.log("Appointments from backend:", response.data);
        setAppointment(response.data);
      })
      .catch(error => {
        console.error("Error fetching appointment data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel appointment?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/appointment/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAppointment(prev => prev.filter(doc => doc._id !== id));
        alert('Appointment cancelled successfully!');
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
        name: "DocApp",
        description: "Appointment Payment",
        order_id: res.data.id,
        handler: async function (response) {
          alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
          setPaid({ paid: true });

          try {
            await axios.post(`http://localhost:5000/appointment/update-payment/${appointmentId}`, {
              paid: true,
              payment_id: response.razorpay_payment_id,
            });
            alert("Appointment marked as paid!");
          } catch (error) {
            console.error("Error updating payment status:", error);
            alert("Payment succeeded, but failed to update appointment.");
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
      alert("Failed to initiate payment.");
    }
  };

  const userAppointments = appointment.filter(item => item.user_id === user?.id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6FFF]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">My  Appointments</h1>
        <span className="text-sm text-gray-500">
          {userAppointments.length} {userAppointments.length === 1 ? 'Appointment' : 'Appointments'}
        </span>
      </div>
      
      {userAppointments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No appointments found</p>
          <p className="text-gray-400 mt-2">Book an appointment to see it here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {userAppointments.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="md:w-48 flex-shrink-0">
                    <img 
                      className="w-full h-48 object-cover rounded-lg shadow-sm"
                      src={item.doc_id?.image} 
                      alt={item.doc_id?.name} 
                    />
                  </div>

                  {/* Appointment Details */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-800">{item.doc_id?.name}</h2>
                          <p className="text-[#5f6FFF] font-medium mt-1">{item.doc_id?.speciality}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                            <p className="text-sm text-gray-500">{item.doc_id?.address?.line1}</p>
                            <p className="text-sm text-gray-500">{item.doc_id?.address?.line2}</p>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-600 mb-1">Date & Time</p>
                            <p className="text-sm text-gray-500">
                              {new Date(item.date).toLocaleDateString()} | {item.time}
                            </p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-600 mb-1">Fees</p>
                            <p className="text-sm text-gray-500">₹{item.doc_id?.fees || 500}</p>
                          </div>

                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-gray-600 mb-1">Status</p>
                            <p className="text-sm text-green-500 font-medium">Confirmed</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-4 md:mt-0 flex flex-col gap-3">
                        <button
                          onClick={() => handlePayment(item.doc_id?.fees || 500, item._id)}
                          className="px-6 py-2.5 bg-[#5f6FFF] text-white rounded-md hover:bg-[#4a5ae8] transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Pay Online
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="px-6 py-2.5 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors duration-300 text-sm font-medium flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Cancel Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
