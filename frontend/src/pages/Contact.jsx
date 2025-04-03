import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      
<div className='text-center text-2xl pt-10 text-gray-500'>
    <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
</div>

<div>

<img src={assets.contact_image} alt="" />
<div>
    <p>OUR OFFICE</p>
    <p>54709 Willms Station <br /> Suite 350 , Washington ,USA</p>
    <p>Number: 7983458418 <br />Email: deepumelkani123@gmail.com</p>
    <p>Careers at Prescripto</p>
    <p>Learn more about teams and job openings</p>
    <button>Explore Jobs</button>
</div>

</div>

    </div>
  )
}

export default Contact
