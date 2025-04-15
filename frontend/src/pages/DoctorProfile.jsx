import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const DoctorProfile = () => {
  const { doctor } = useContext(StoreContext);

  const [doctorData, setDoctorData] = useState({ name: '' , email: '', speciality: '', degree: '', experience: '', about: '',fees:'',available:'',address:{line1:'',line2:''}});
  // Fetch user information
  const [doctorInfo, setDoctorInfo] = useState({}); // Initialize as null

  useEffect(() => {
    axios.get(`http://localhost:5000/doctor/info/${doctor.email}`)
      .then(response => {
        setDoctorInfo(response.data);
        setDoctorData(response.data); // Add this line
      })
      .catch(error => {
        console.error("Error fetching doctor data:", error);
      });
  }, []);
  




  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

 
const handleChange = (e) => {
  const { name, value } = e.target;

  // Handle nested address object
  if (name === 'line1' || name === 'line2') {
    setDoctorData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  } else {
    setDoctorData({ ...doctorData, [name]: value });
  }
};

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = assets.profile_pic;

    if (file) {
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('upload_preset', uploadPreset);

      try {
        const res = await axios.post(cloudinaryUrl, uploadData);
        imageUrl = res.data.secure_url;
      } catch (error) {
        console.error("Image upload error:", error.response?.data || error);
        alert("Image upload failed");
        return;
      }
    }

    const updatedData = { ...doctorData, image: imageUrl };

    try {
      const response = await fetch(`http://localhost:5000/doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        alert('Doctor updated successfully!');
        setDoctorInfo(updatedData); // <-- update local info with new data
        setIsEdit(false);
      } else {
        console.error('Failed to update doctor');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='w-[70%] h-[80vh] m-auto bg-white flex flex-row gap-2 text-sm'>
      {/* Conditional rendering: only show the profile picture if userInfo is available */}
      {doctorInfo ? (
        <>

        {/**first box */}
        <div className='w-[30%] h-[80vh] flex flex-col m-5 gap-4'>

        {isEdit ? (
            <div className='flex justify-evenly pt-5 pb-5 gap-4 text-gray-500 bg-gray-200'>
              <label htmlFor="doc-img">
                <img
                  className='w-25 h-26 bg-gray-100 rounded-full cursor-pointer'
                  src={file ? URL.createObjectURL(file) : assets.profile_pic}
                  alt="profile"
                />
              </label>
              <input type="file" onChange={handleFileChange} name='image' id="doc-img" hidden />
              <p className='m-6 font-bold text-xl'>
                Upload <br />
                picture
              </p>
            </div>
          ) : (
            <img className='w-[100%] h-[40vh] rounded' src={doctorInfo.image || assets.profile_pic} alt="" />
          )}

          {/* Name Section */}
          
          {isEdit ? (
            <input
              className='pl-5 bg-gray-200 font-medium h-[6vh] w-[100%]   outline-[#5f6FFF] mt-4'
              name='name'
              type='text'
              placeholder='Enter your name'
              onChange={handleChange}
            />
          ) : (
            <p className='font-medium text-3xl text-neutral-800  mt-4'>{doctor.name }</p>
          )}


        </div>
          
        <div className='flex flex-col w-[70%] h-[80vh]'>

<div className='flex flex-row w-[100%]'>

 {/**second box */}
 <div className='w-[50%]  flex flex-col gap-5 m-5 text-neutral-700'>

             <div className='flex flex-col gap-1 w-[100%]'>
             <p className='font-medium'>Email id:</p>
              {isEdit ? (
                <input
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  name='email'
                  type='email'
                
                  onChange={handleChange}
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctor.email }</p>
              )}
             </div>

             <div className=' flex flex-col gap-1 w-[100%]'>
              <p className='font-medium'>Speciality:</p>
              {isEdit ? (
                <select
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  name='speciality'
                  type='text'
                onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctorInfo.speciality || 'General Physician'}</p>
              )}
</div>

<div className='flex flex-col gap-1 w-[100%]'>
              <p className='font-medium'>Education:</p>
              {isEdit ? (
                <input
                  name='degree'
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  onChange={handleChange}
                 
                  type='text'
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctorInfo.degree || 'MBBS'}</p>
              )}
</div>

<div className='flex flex-col gap-1 w-[100%]'>
              <p className='font-medium'>Fees:</p>
              {isEdit ? (
                <input
                  name='fees'
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  onChange={handleChange}
                 
                  type='number'
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctorInfo.fees || 'XXX'}</p>
              )}
</div>




            </div>
        

           {/**third box */}
            <div className='w-[50%] flex flex-col gap-5 m-5 text-neutral-700'>

            <div className='flex flex-col gap-1 w-[100%] '>
              <p className='font-medium'>Experience:</p>
              {isEdit ? (
                <select
                  name='experience'
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  onChange={handleChange}
                  
                >
                  <option>Select</option>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="4 year">4 year</option>
                  <option value="5 year">5 year</option>
                  <option value="6 year">6 year</option>
                  <option value="7 year">7 year</option>
                  <option value="8 year">8 year</option>
                  <option value="9 year">9 year</option>
                  <option value="10 year">10 year</option>
                </select>
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctorInfo.experience || '0 year'}</p>
              )}
</div>


<div className='flex flex-col gap-1 w-[100%]'>
              <p className='font-medium'>Address 1:</p>
              {isEdit ? (
                <input
                  name='line1'
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  type='text'
                  onChange={handleChange}
                 
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctorInfo.address?.line1 || 'bhimtal haldwani,Naintal'}</p>
              )}
</div>


<div className='flex flex-col gap-1 w-[100%]'>
              <p className='font-medium'>Address 2:</p>
              {isEdit ? (
                <input
                  name='line2'
                  className='bg-gray-200  h-[5vh] w-[100%] outline-[#5f6FFF]'
                  onChange={handleChange}
                 
                  type='text'
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{doctorInfo.address?.line2 || 'bhimtal haldwani,Naintal'}</p>
              )}
</div>



<div className='mt-5 flex justify-between items-center w-[100%]'>
               <p className='font-medium'>Available:</p>
              {isEdit ? (
                <input
                  name='available'
                  className='bg-gray-200  h-[3vh] w-[10%] outline-[#5f6FFF]'
                  type='checkbox'
                  onChange={handleChange}
                 
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[5vh] flex items-center'>{}</p>
              )}
</div>




            </div>
  
    </div>

<div className='p-5 w-[100%]  '>

<p className='font-medium'>About:</p>
              {isEdit ? (
                <textarea
                  name='about'
                  className='w-[100%] bg-gray-200 h-[10vh] outline-[#5f6FFF]'
                  
                  onChange={handleChange}
                 
                />
              ) : (
                <p className='text-blue-400 bg-gray-100 h-[12vh] flex items-center'>{doctorInfo.about || 'I am a dedicated General Physician committed to providing comprehensive and compassionate healthcare for patients of all ages.  I focus on diagnosing and treating a wide range of acute and chronic illnesses, while promoting preventive care and healthy living. '}</p>
              )}

</div>


       {/**buttons */}
            <div className='mt-10'>
            {isEdit ? (
              <button
                className='border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all'
                onClick={(e) => {
                  handleSubmit(e);
                  
                }}
              >
                Save information
              </button>
            ) : (
              <button
                className='border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all'
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )}
          </div>


          </div>
          
        </>
      ) : (
        <div>Loading...</div> // Show loading indicator while fetching userInfo
      )}
    </div>
  );
};

export default DoctorProfile;
