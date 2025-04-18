import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import axios from 'axios'

const Appointment = () => {

const {user}=useContext(AppContext)
const { docId } = useParams();

//state variable for appointment 
const [appointment, setAppointment] = useState({
  user_id: '',
  day: '',
  date: '',
  time: '',
  doc_id:''
});

useEffect(() => {
  if (user) {
    setAppointment(prev => ({
      ...prev,
      user_id: user.id
    }));
  }
}, [user]);


const handleSubmit = async () => {
  // Simple form validation
 
  if (!appointment.user_id || !appointment.day || !appointment.date || !appointment.time) {
    alert("Please select a date and time slot.");
    return;
  }

  const payload = {
    ...appointment,
    doc_id: docId
  };

  try {
    const res = await axios.post("http://localhost:5000/appointment", payload);
    
    if (res.status === 200 || res.status === 201) {
      alert("Appointment booked successfully!");
      // Optionally reset or redirect
    } else {
      alert("Failed to book appointment.");
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    alert("Something went wrong while booking.");
  }
};




 
 const [doctors,setDoctors]=useState([]);
 useEffect(() => {
  // Fetch data from backend
  axios.get('http://localhost:5000/doctor')
       // Backend API endpoint
    .then(response => {
     
      setDoctors(response.data); // Store the data in state
     
      
    })
    .catch(error => {
      console.error("Error fetching doctor data:", error);
    });
   
}, []);






  const [docInfo, setDocInfo] = useState({});

  useEffect(() => {

    const found = doctors.find((doc) => doc._id === docId);
   
    setDocInfo(found || {});
  }, [doctors, docId]);


//state variable for days
 const [docSlots,setDocSlots]=useState([]);
 const [slotIndex,setSlotIndex]=useState(null);
 const [slotTime,setSlotTime]=useState('')
const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']

 const getAvailableSlots=async()=>{
setDocSlots([])
//getting current date
let today=new Date();
for(let i=0;i<7;++i)
{
  //getting date with index
  let currentDate=new Date(today)
  currentDate.setDate(today.getDate()+i);

  //setting end time of the date
  let endTime=new Date()
  endTime.setDate(today.getDate()+i);
  endTime.setHours(21,0,0,0);

  //setting hours
  if(today.getDate()===currentDate.getDate()){

currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1:10)
currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
  }else{
    currentDate.setHours(10)
    currentDate.setMinutes(0)
  }
  
  let timeSlots=[]

  while(currentDate<endTime){
    let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
    //add slot to array
    timeSlots.push({
      datetime:new Date(currentDate),
      time:formattedTime
    })

    //Increment current time by 30 minutes
    currentDate.setMinutes(currentDate.getMinutes()+30)
  }

  setDocSlots(prev=>([...prev,timeSlots]))

}

 }

 useEffect(() => {
  if (docInfo && Object.keys(docInfo).length > 0) {
    getAvailableSlots();
  }
}, [docInfo]);


useEffect(() => {
  if (docSlots.length > 0) {
    console.log(docSlots);
  }
}, [docSlots]);





  return (
    <div>

      {/*------Doctor details----- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon}></img>
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className='py-0.5 px-2 border text-x5 rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-lg font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon}></img>
            </p>
            <p className='text-m text-gray-500 max-w-[1000px] mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment fee: <span className='text-gray-600'>&#8377;{docInfo.fees}</span></p>
        </div>
      </div>

{/** ------Booking Slots------ */}

<div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>

<p>Booking slots</p>
<div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
  {
    docSlots.length && docSlots.map((item,index)=>(
<div onClick={()=>{setSlotIndex(index);setAppointment(prev => ({
  ...prev,
  day: item[0] && daysOfWeek[item[0].datetime.getDay()],
  date: item[0] && item[0].datetime.toDateString(), // Better than just getDate()
}));
}} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex=== index ?'bg-[#5f6FFF] text-white' : 'border border-gray-200'}`} key={index}>
  <p >{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
  <p>{item[0] && item[0].datetime.getDate()}</p>

</div>

    ))
  }
</div>

<div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
  {slotIndex !== null && docSlots.length && docSlots[slotIndex].map((item,index)=>(
<p onClick={()=>{setSlotTime(item.time);setAppointment({...appointment,time:item.time.toLowerCase()})}} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-[#5f6FFF] text-white' :' text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>

  ))}
</div>

<button   onClick={handleSubmit} className='bg-[#5f6FFF] text-white text-sm font-light px-14 py-3  rounded-full my-6'>Book an appointment</button>

</div>


{/** Listing Related doctors */}
<RelatedDoctor docId={docId} speciality={docInfo.speciality} />





    </div>
  );
};

export default Appointment;


/**  */