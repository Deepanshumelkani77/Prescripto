import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div>
  <ul>
    <NavLink to='/'>
      <img src={assets.home_icon} alt="" />
      <p>Dashboard</p>
    </NavLink>
    <NavLink to='add-doctor'>
      <img src={assets.add_icon} alt="" />
      <p>Add Doctor</p>
    </NavLink>
    <NavLink to='all-doctors'>
      <img src={assets.people_icon} alt="" />
      <p>Doctors List</p>
    </NavLink>
  </ul>
    </div>
  )
}

export default Sidebar
