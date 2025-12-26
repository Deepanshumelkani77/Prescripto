import React, { useContext, useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { FiCalendar, FiHome, FiPlusCircle, FiLogOut, FiMessageSquare, FiUser } from 'react-icons/fi'

const Sidebar = () => {
  const { user, setShowLogin, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar from other components
  useEffect(() => {
    const handleToggleSidebar = () => setIsOpen(prev => !prev);
    const handleCloseSidebar = () => setIsOpen(false);
    
    document.addEventListener('toggleSidebar', handleToggleSidebar);
    document.addEventListener('closeSidebar', handleCloseSidebar);
    
    return () => {
      document.removeEventListener('toggleSidebar', handleToggleSidebar);
      document.removeEventListener('closeSidebar', handleCloseSidebar);
    };
  }, []);

  // Close sidebar when route changes
  const location = useLocation();
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

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
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl transition-all duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:mt-[8vh] md:h-[92vh] flex flex-col`}
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
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className='w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#5f6fff] hover:bg-[#4a5ae8] rounded-lg transition-colors duration-300'
            >
              <span>Login</span>
            </button>
          )}
        </div>

        {/* User Profile & Logout Section */}
        <div className='mt-auto border-t border-gray-100'>
          {user ? (
            <div className='p-4'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600'>
                  <FiUser className='w-5 h-5' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-gray-900 truncate'>{user.name || 'Admin'}</p>
                  <p className='text-xs text-gray-500 truncate'>{user.email || 'admin@example.com'}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className='w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-100'
              >
                <FiLogOut className='w-4 h-4' />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <div className='p-4'>
              <div className='w-10 h-10 rounded-lg bg-[#5f6FFF] flex items-center justify-center mx-auto mb-3'>
                <span className='text-white font-semibold text-lg'>AD</span>
              </div>
              <p className='text-sm text-center text-gray-500'>Admin Portal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
