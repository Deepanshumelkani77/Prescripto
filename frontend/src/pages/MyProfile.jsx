import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
  const { user } = useContext(AppContext);

  const [userData, setUserData] = useState({ name: '', email: '', phone_no: '', address: '', gender: '', dob: '' });
  // Fetch user information
  const [userInfo, setUserInfo] = useState(null); // Initialize as null
const [images,setImages]=useState('')
  useEffect(() => {
    axios.get(`http://localhost:5000/user/info/${user.id}`)
      .then(response => {
        setUserInfo(response.data);

        // Set userData only after userInfo is fetched
        setUserData({
          name: response.data.username || '',
         email: response.data.email || '',
          phone_no: response.data.phone_no || '',
          address: response.data.address || '',
          gender: response.data.gender || '',
          dob: response.data.dob ? response.data.dob.slice(0, 10) : '',
        }); setImages(response.data.image)
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const cloudinaryUrl = "https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload";
  const uploadPreset = "Prescripto";

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl =images || assets.profile_pic; 

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

    const updatedData = { ...userData, image: imageUrl };

    try {
      const response = await fetch(`http://localhost:5000/user/edit/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
      
        alert('User updated successfully!');
        setUserInfo(updatedData); // Update info
        setImages(imageUrl); // Update image state
        setIsEdit(false);
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='w-[80%] flex flex gap-2 h-[80vh] m-auto bg-[#5f6FFF]'>
      {/* Conditional rendering: only show the profile picture if userInfo is available */}


      
      {userInfo ? (
        <>

{ /**Box first */}
<div className='w-[40%] h-[80vh] bg-[#5f6FFF] flex flex flex-col gap-3 p-15 pt-10'>


{isEdit ? (
            <div className='flex flex-items-center gap-4 text-gray-500'>
              <label htmlFor="doc-img">
                <img
                  className='w-25 h-26 bg-gray-100 rounded-full cursor-pointer'
                  src={file ? URL.createObjectURL(file) :images|| assets.profile_pic}
                  alt="profile"
                />
              </label>
              <input type="file" onChange={handleFileChange} name='image' id="doc-img" hidden />
              <p className='m-8 font-bold text-xl'>
                Upload <br />
                picture
              </p>
            </div>
          ) : (
            <img className='w-[100%] h-[50vh] rounded' src={userInfo.image || assets.profile_pic} alt="" />
          )}

          {/* Name Section */}
          {isEdit ? (
            <input
              className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
              name='name'
              type='text'
              value={userData.name}
              onChange={handleChange}
            />
          ) : (
            <p className='font-medium text-3xl text-white mt-4'>{userInfo.username || user.name}</p>
          )}


</div>

          


          {/* second box */}

<div className='flex flex-col gap-5 bg-[#5f6FFF] w-[60%] h-[80vh]  pl-10 pt-10'>

<div>
            <p className='text-white font-medium underline text-xl '>CONTACT INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-5 mt-6 text-neutral-700 text-lg'>
              <p className='font-medium text-white'>Email id:</p>
              <p className='text-white '>{userInfo.email}</p>
              <p className='font-medium text-white'>Phone:</p>
              {isEdit ? (
                <input
                  className='bg-gray-100 max-w-52'
                  name='phone_no'
                  type='text'
                  value={userData.phone_no}
                  onChange={handleChange}
                />
              ) : (
                <p className='text-white'>{console.log(userInfo.phone_no)}{userInfo.phone_no || '0000000000'}</p>
              )}
              <p className='font-medium text-white'>Address:</p>
              {isEdit ? (
                <input
                  name='address'
                  className='bg-gray-50'
                  onChange={handleChange}
                  value={userData.address}
                  type='text'
                />
              ) : (
                <p className='text-white'>{userInfo.address ||'Haldwani , Bhimtal Uttarakhand'}</p>
              )}
            </div>
          </div>

          {/* Basic Information Section */}
          <div>
            <p className='text-white underline mt-3 text-xl font-medium'>BASIC INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-5 text-lg mt-6 text-neutral-700'>
              <p className='font-medium'>Gender:</p>
              {isEdit ? (
                <select
                  name='gender'
                  className='max-w-20 bg-gray-10'
                  onChange={handleChange}
                  value={userData.gender}
                >
                  <option>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p className='text-gray-400'>{userInfo.gender || 'XXX'}</p>
              )}
              <p className='font-medium'>D.O.B:</p>
              {isEdit ? (
                <input
                  name='dob'
                  className='max-w-28 bg-gray-100'
                  type='date'
                  onChange={handleChange}
                  value={userData.dob}
                />
              ) : (
                <p className='text-white'>{userInfo.dob?.slice(0, 10) || '0000-00-00'}</p>
              )}
            </div>
          </div>

          <div className='mt-5'>
            {isEdit ? (
              <button
                className='border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all'
                onClick={(e) => {
                  handleSubmit(e);
                  setIsEdit(false);
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

export default MyProfile;
