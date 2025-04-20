import React, { useContext, useState, useEffect } from 'react';
import { assets1 } from '../assets/assets';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const DoctorAppointment = () => {
  const { doctor } = useContext(StoreContext);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [myDoctor, setMyDoctor] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/appointment/doctor')
      .then(res => setAppointments(res.data))
      .catch(err => console.error("Error fetching appointments:", err));
  }, []);

  useEffect(() => {
    if (doctor?.id) {
      axios.get('http://localhost:5000/doctor')
        .then(res => {
          const doctorList = res.data;
          setDoctors(doctorList);
          const found = doctorList.find(doc => doc._id === doctor.id);
          setMyDoctor(found || {});
        })
        .catch(err => console.error("Error fetching doctor data:", err));
    }
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

  const handleDelete = async (id) => {
    const confirm = window.confirm('Cancel this appointment?');
    if (!confirm) return;
    try {
      const res = await fetch(`http://localhost:5000/appointment/delete/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a._id !== id));
        alert('Appointment cancelled!');
      } else {
        alert('Error cancelling appointment.');
      }
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Something went wrong!");
    }
  };


  const [earning,setEarning]=useState({earnings:0,completed_appointment:0})
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
  


  return (
    <div className='w-[100%]  bg-green-200 mx-auto px-4 py-6'>
      <h2 className='text-2xl font-semibold mb-4'>My Appointments</h2>

      <div className='bg-white bg-pink-200 rounded-xl border border-gray-200 overflow-x-auto shadow-sm'>
        <table className='w-full text-sm  text-left w-[100%] md:min-w-[80%] '>
          <thead className='bg-gray-100 sticky top-0 z-10'>
            <tr className='text-gray-700 font-medium'>
              <th className='px-4 py-3'>#</th>
              <th className='px-4 py-3'>Patient</th>
              <th className='px-4 py-3 hidden md:table-cell'>Payment</th>
              <th className='px-4 py-3 hidden md:table-cell'>Age</th>
              <th className='px-4 py-3 '>Date & Time</th>
              <th className='px-4 py-3 text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              appointments.filter(a => a.doc_id?._id === myDoctor._id).map((item, idx) => (
                <tr key={item._id} className='border-t hover:bg-gray-50'>
                  <td className='px-4 py-3'>{idx + 1}</td>
                  <td className='px-4 py-3 flex items-center gap-2'>
                    <img src={item.user_id?.image} className='w-8 h-8 rounded-full object-cover' alt="patient" />
                    <span className='hidden md:table-cell'>{item.user_id?.username || 'Unknown'}</span>
                  </td>
                  <td className='px-4 py-3 hidden md:table-cell'>
                    <span className={`px-2 py-1 rounded-full text-xs  font-medium ${item.paid ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.paid ? 'Paid' : 'Cash'}
                    </span>
                  </td>
                  <td className='px-4 py-3 hidden md:table-cell'>{calculateAge(item.user_id?.dob)}</td>
                  <td className='px-4 py-3'>{formatDateTime(`${item.date} ${item.time}`)}</td>
                  <td className='px-4 py-3 text-center'>
                    <div className='flex justify-center gap-3'>
                      <img
                        src={assets1.cancel_icon}
                        alt='cancel'
                        className='w-6 h-6 cursor-pointer hover:scale-110 transition'
                        onClick={() => handleDelete(item._id)}
                        title="Cancel Appointment"
                      />
                      <img
                        src={assets1.tick_icon}
                        alt='confirm'
                        className='w-6 h-6 cursor-pointer hover:scale-110 transition'
                        title="Mark as Done (UI Only)"
                        onClick={() => {
                          setEarning({
                            earnings: myDoctor?.fees || 0,
                            completed_appointment: 1
                          })
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            }

            {
              appointments.filter(a => a.doc_id?._id === myDoctor._id).length === 0 && (
                <tr>
                  <td colSpan="6" className='px-4 py-6 text-center text-gray-500'>No appointments found</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointment;
