import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      
<div className='text-center text-2xl pt-10 text-gray-500 '>
  <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
</div>

<div className='my-10 flex flex-col md:flex-row gp-12'>
  <img className='w-full md:max-w-[360px] ' src={assets.about_image} alt="" />
  <div className=' md:pl-[8vw] flex flex-col justify-center gap-6  md:text-lg text-sm text-gray-600'>
    <p>Welcom To prescripto. Your Trusted Partner In Managing Your Healthcare Needs conveniently And Efficiently. at Prescripto , We Understand The Challanges Individuals Face When It Comes To Scheduling Doctor Appointments And Managing Their Health Records.</p>
    <p>Prescripto Is Committed To Excellence In Healthcare Technology. We Continuously Strive To Enhance Our Platform , Integrating The Latest Advancements To Improve User Experience And Deliver Superior Service. Whether You're Booking Your First Appointment Or Managing Ongoing Care. Prescripto Is Here To Support You Every Step Of The Way.</p>
    <b className='text-gray-800 '>Our Vision</b>
    <p>Our Vision At Prescripto Is To Create A Seamless Healthcare Experience For Every User . We Aim To Bridge The Gap Between patients And Healthcare Providers, Making It Easier For You To Access The Care You Need,Whwn You Need It.</p>
  </div>
</div>

    </div>
  )
}

export default About
