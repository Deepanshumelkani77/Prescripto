import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { FiCalendar, FiHome, FiPlusCircle, FiLogOut, FiMessageSquare } from 'react-icons/fi'

const Sidebar = () => {
  const { user, setShowLogin, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleToggleSidebar = () => setIsOpen(prev => !prev);
    document.addEventListener('toggleSidebar', handleToggleSidebar);
    return () => document.removeEventListener('toggleSidebar', handleToggleSidebar);
  }, []);

  const menuItems = [
    {
      path: '/',
      icon: <FiHome className="w-5 h-5" />,
      label: 'Dashboard',
      description: 'View admin overview'
    },
    {
      path: 'appointments',
      icon: <FiCalendar className="w-5 h-5" />,
      label: 'Appointments',
      description: 'Manage all appointments',
      requiresAuth: true
    },
    {
      path: 'feedback',
      icon: <FiMessageSquare className="w-5 h-5" />,
      label: 'Feedback',
      description: 'View customer feedback',
      requiresAuth: true
    },
   
    {
      path: 'add-doctor',
      icon: <FiPlusCircle className="w-5 h-5" />,
      label: 'Add Doctor',
      description: 'Register new doctors',
      requiresAuth: true
    }
  ];

  return (
    <div className="flex h-full">
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />

      <div 
        className={`fixed top-0 left-0 h-full md:mt-[8vh] lg:mt-[8vh] lg:h-[92vh] md:h-[92vh] w-72 bg-white shadow-xl transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 flex flex-col`}
      >  
        {/* Sidebar Content */}
        <div className='flex-1 overflow-y-auto'>
          {/* Close Button - Only visible on mobile */}
          <div className="md:hidden p-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className='py-2'>
            <ul className='text-[#515151] space-y-1 px-3'>
              {menuItems.map((item) => (
                <li key={item.path}>
                  {item.requiresAuth && !user ? (
                    <div
                      onClick={() => setShowLogin(true)}
                      className="flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-50 transition-all duration-300"
                    >
                      <div className='w-6 h-6 flex items-center justify-center text-gray-500'>
                        {item.icon}
                      </div>
                      <div>
                        <p className='font-medium'>{item.label}</p>
                        <p className='text-xs text-gray-500'>{item.description}</p>
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `flex items-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-[#F2F3FF] text-[#5f6fff] font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      title={item.description}
                    >
                      <div className='w-6 h-6 flex items-center justify-center'>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Login/Logout Button */}
        <div className='md:hidden px-4 py-3 border-t border-gray-100'>
          {user ? (
            <button 
              onClick={() => {
                logout();
                setIsOpen(false);
              }} 
              className='w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-300'
            >
              <FiLogOut className='w-5 h-5' />
              Logout
            </button>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className='w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#5f6fff] hover:bg-[#4a5ae8] rounded-lg transition-colors duration-300'
            >
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Admin Portal Footer */}
        <div className='p-6 border-t border-gray-100 mt-auto'>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#5f6FFF] flex items-center justify-center">
              <span className="text-white font-semibold text-lg">AD</span>
            </div>
            <div>
              <h2 className='text-base font-semibold text-gray-800'>Admin Portal</h2>
              <p className='text-xs text-gray-500 mt-0.5'>Manage your platform</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
