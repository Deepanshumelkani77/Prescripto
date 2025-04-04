import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'

const MyProfile = () => {

const [userData,setUserData]=useState({
  name:'Dev Melkani',
  image:assets.profile_pic,
  email:'deepumelkani123@gmail.com',
  phone:'+91 7983458418',
  address:{
    line1:'57th Cross,Richmond',
    line2:'Circle, Church Road , London'
  },
  gender:'Male',
  dob:'2000-01-20'
})

const [isEdit,setIsEdit]=useState(false)

  return (
    <div>
      
<img src={userData.image} alt="" />

{
  isEdit?
<input 
  type='text' 
  value={userData.name} 
  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
/>:
  <p>{userData.name}</p>

}

<hr />
<div>
  <p>CONTACT INFORMATION</p>
  <div>
    <p>Email id:</p>
    <p>{userData.email}</p>
    <p>Phone:</p>
    {
  isEdit?
<input 
  type='text' 
  value={userData.phone} 
  onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
/>:
  <p>{userData.phone}</p>

}
<p>Address:</p>
{
  isEdit?
  <p>
<input onChange={(e)=> setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line1} type='text' />
    <br />
    <input onChange={(e)=> setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={userData.address.line2} type="text" />
  </p>:
  <p>
    {userData.address.line1}
    <br />
    {userData.address.line2}
  </p>
}

  </div>
</div>

<div>
  <p>BASIC INFORMATION</p>
  <div>
    <p>Gender:</p>
    {
  isEdit?<select onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender} >
    <option value="Male"></option>
    <option value="Female"></option>
  </select>:
  <p>{userData.gender}</p>

}
<p>Birthday:</p>
  </div>
</div>

    </div>
  )
}

export default MyProfile
