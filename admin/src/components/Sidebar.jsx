import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { FiCalendar, FiHome, FiPlusCircle, FiUsers, FiSettings, FiLogOut, FiMessageSquare } from 'react-icons/fi'

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
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className={`
        bg-white border-r border-gray-200 shadow-lg transition-all duration-300
        md:static md:translate-x-0 md:h-[91vh] md:min-w-[280px] md:w-[280px]
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed top-0 left-0 h-full w-[280px] z-50
        flex flex-col
      `}>
        {/* Sidebar Header */}
        <div className='p-6 border-b border-gray-100'>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#5f6FFF] flex items-center justify-center">
                <span className="text-white font-semibold text-lg">AD</span>
              </div>
              <div>
                <h2 className='text-xl font-semibold text-gray-800'>Admin Portal</h2>
                <p className='text-sm text-gray-500 mt-0.5'>Manage your platform</p>
              </div>
            </div>
            {/* Close Button - Only visible on mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
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
        </div>

        {/* Navigation Links */}
        <div className='flex-1 overflow-y-auto py-4'>
          <ul className='text-[#515151] space-y-1 px-3'>
            {menuItems.map((item) => {
              if (item.requiresAuth && !user) {
                return (
                  <div
                    key={item.path}
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
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 py-3 px-4 rounded-lg cursor-pointer transition-all duration-300
                    ${isActive 
                      ? 'bg-[#F2F3FF] text-[#5f6FFF]' 
                      : 'hover:bg-gray-50 hover:text-[#5f6FFF]'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <div className={`w-6 h-6 flex items-center justify-center ${isActive ? 'text-[#5f6FFF]' : 'text-gray-500'}`}>
                        {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                      </div>
                      <div>
                        <p className='font-medium'>{item.label}</p>
                        <p className='text-xs text-gray-500'>{item.description}</p>
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </ul>
        </div>

        {/* Mobile Login/Logout Button */}
        <div className='md:hidden px-4 py-3 border-t border-gray-100'>
          {user ? (
            <button 
              onClick={() => {
                logout();
                setIsOpen(false);
              }} 
              className='w-full bg-[#5f6FFF] text-white text-sm px-6 py-2.5 rounded-lg cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300 flex items-center justify-center gap-2'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          ) : (
            <button 
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }} 
              className='w-full bg-[#5f6FFF] text-white text-sm px-6 py-2.5 rounded-lg cursor-pointer hover:bg-[#4a5ae8] transition-colors duration-300 flex items-center justify-center gap-2'
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </button>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className='hidden md:block p-6 border-t border-gray-100'>
          <div className='flex items-center gap-3 p-3 bg-[#F2F3FF] rounded-lg'>
            <div className='w-10 h-10 rounded-full bg-[#5f6FFF] flex items-center justify-center'>
              <span className='text-white font-semibold'>AD</span>
            </div>
            <div>
              <p className='font-medium text-gray-800'>Admin Portal</p>
              <p className='text-sm text-gray-500'>Manage your platform</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;


