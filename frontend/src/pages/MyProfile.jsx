import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

  const {user}=useContext(AppContext)

const [userData,setUserData]=useState({
  name:user.name,
  image:assets.profile_pic,
  email:user.email,
  phone:'+91 XXXXXXXXXX',
  address:'Circle, Church Road , London',
  gender:'XYZ',
  dob:'0000-00-00'
})

const [isEdit,setIsEdit]=useState(false)


const handleChange = (e) => {
  const { name, value } = e.target;
  
    setUserData(prev => ({ ...prev, [name]: value }));
  
};
const [file, setFile] = useState(null);
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};


const cloudinaryUrl ="https://api.cloudinary.com/v1_1/drx3wkg1h/image/upload"
const uploadPreset ="Prescripto"

const handleSubmit = async (e) => {
  e.preventDefault();

  // Start with the existing image URL; if no new file is selected, we keep it
  let imageUrl;

  // If a new file is selected, upload it to Cloudinary
  if (file) {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', uploadPreset)

    try {
      const res = await axios.post( cloudinaryUrl,uploadData);
      imageUrl = res.data.secure_url; 
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error);
      alert("Image upload failed");
      return; // Stop if image upload fails
    }
  }

  // Combine the form data with the image URL
  const updatedData = { ...userData, image: imageUrl };

  try {
    const response = await fetch(`http://localhost:5000/user/edit/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      alert('User updated successfully!');
      navigate('/myprofile');
    } else {
      console.error('Failed to update user');
    }
  } catch (error) {
    console.error('Error update user:', error);
  }
};





  return (
    <div className=' max-w-lg flex flex-col gap-2 text-sm '>

{
  isEdit?
  <div className='flex flex-items-center gap-4 text-gray-500'>
          <label htmlFor="doc-img">
        
  <img
    className='w-25 h-26 bg-gray-100 rounded-full cursor-pointer'
    src={file ? URL.createObjectURL(file) : userData.image}
    alt="profile"
  />
</label>

          
          <input type="file" onChange={handleFileChange}  id="doc-img" hidden />
          <p className='m-8 font-bold text-xl'>
            Upload <br />
            picture
          </p>
          
        </div>:<img className='w-36 rounded' src={userData.image} alt="" />


}
 
      


{
  isEdit?
<input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' 
name='name'
  type='text' 
  value={userData.name} 
  onChange={handleChange}
/>:
  <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>

}

<hr className='bg-zinc-400 h-[1px] border-none' />
<div>
  <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
  <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
    <p className='font-medium '>Email id:</p>
    <p className='text-blue-500'>{userData.email}</p>
    <p className='font-medium'>Phone:</p>
    {
  isEdit?
<input className='bg-gray-100 max-w-52' 
name='phone'
  type='text' 
  value={userData.phone} 
  onChange={handleChange}
/>:
  <p className='text-blue-400'>{userData.phone}</p>

}
<p className='font-medium'>Address:</p>
{
  isEdit?
  <p>
<input name='address'  className='bg-gray-50' onChange={handleChange} value={userData.address} type='text' />
   
    
  </p>:
  <p className='text-gray-500'>
    {userData.address}
  </p>
}

  </div>
</div>

<div>
  <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
  <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
    <p className='font-medium '>Gender:</p>
    {
  isEdit?<select name='gender' className='max-w-20 bg-gray-10' onChange={handleChange} value={userData.gender} >
    <option  value="Male " >Male</option>
    <option value="Female">Female</option>
  </select>:
  <p className='text-gray-400'>{userData.gender}</p>

}
<p className='font-medium '>D.O.B:</p>
{
  isEdit?
  <input name='dob' className='max-w-28 bg-gray-100' type='date' onChange={handleChange} value={userData.dob} />:
  <p className='text-gray-400'>{userData.dob}</p>
}
  </div>
</div>

<div className='mt-10'>
  {
  isEdit 
  ?<button  className='border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all ' onClick={()=>{handleSubmit(); setIsEdit(false)}}>Save information</button> :
  <button className='border border-[#5f6FFF] px-8 py-2 rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all' onClick={()=>setIsEdit(true)}>Edit</button>
}
</div>

    </div>
  )
}

export default MyProfile
