import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
{/*----Left sction------- */}
<div className=''>
    <img className='mb-5 w-40 ' src={assets.logo} alt="" />
    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam aperiam magni, alias, corporis veritatis eveniet nam velit eligendi quibusdam tempore odit voluptas? Aliquid modi, consectetur deserunt dignissimos ratione officia iusto illo enim delectus distinctio vero, odio natus eius necessitatibus molestias!</p>
</div>

{/*----center sction------- */}
<div>
    <p className='text-xl font-medium mb-5 '>COMPANY</p>
    <ul className='flex flex-col gap-2 text-gray-600 '>
        <li>Home</li>
        <li>About us</li>
        <li>Contact us</li>
        <li>Privacy policy</li>
    </ul>
</div>

{/*----right sction------- */}
<div>
    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
    <ul className='flex flex-col gap-2 text-gray-600 '>
        <li>7983458418</li>
        <li>deepumelkani123@gmail.com</li>
    </ul>
</div>
</div>

<div>

{/*----copyright text------- */}
<hr className='bg-gray-200  border-none h-1' />
<p className='py-5 text-sm text-center'>Copyright 2024@ Prescripto - All Right Reserved.</p>

</div>

    </div>
  )
}

export default Footer
