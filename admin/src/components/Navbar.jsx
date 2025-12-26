import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { FiMenu, FiX, FiLogIn, FiLogOut, FiChevronDown, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, setShowLogin } = useContext(AppContext);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close dropdown when navigating
  useEffect(() => {
    setShowDropdown(false);
    // Close sidebar when navigating on mobile
    if (window.innerWidth < 768) {
      document.dispatchEvent(new CustomEvent('closeSidebar'));
    }
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDropdown && !e.target.closest('.user-menu')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 lg:h-[8vh] md:h-[8vh] ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-100'
      }`}
    >
      <div className='max-w-8xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo and Brand */}
          <div className='flex items-center space-x-4'>
            <button 
              onClick={() => document.dispatchEvent(new CustomEvent('toggleSidebar'))}
              className='md:hidden p-2 -ml-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200'
              aria-label='Toggle menu'
              aria-expanded={false}
            >
              <FiMenu className='w-5 h-5' />
            </button>
            
            <div 
              onClick={() => navigate('/')} 
              className='flex items-center space-x-2 cursor-pointer group'
            >
              <img 
                className='h-8 w-auto transition-transform duration-300 group-hover:scale-105' 
                src={assets.admin_logo} 
                alt="Admin Logo" 
              />
              <span className='hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border border-blue-100'>
                Admin Panel
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {!user ? (
              <button
                onClick={() => setShowLogin(true)}
                className='group relative flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md'
              >
                <FiLogIn className='w-4 h-4' />
                <span>Sign In</span>
                <span className='absolute -bottom-1 left-0 w-full h-0.5 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></span>
              </button>
            ) : (
              <div className='relative'>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className='flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200 group'
                >
                  <div className='w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600'>
                    <FiUser className='w-4 h-4' />
                  </div>
                  <span className='hidden lg:inline-block'>{user.name || 'Admin'}</span>
                  <FiChevronDown className={`w-4 h-4 transition-transform duration-200 ${showDropdown ? 'transform rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50'>
                    <div className='px-4 py-2 border-b border-gray-100'>
                      <p className='text-sm font-medium text-gray-900'>{user.name || 'Admin'}</p>
                      <p className='text-xs text-gray-500'>{user.email || 'admin@example.com'}</p>
                    </div>
                    <button
                      onClick={logout}
                      className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center space-x-2'
                    >
                      <FiLogOut className='w-4 h-4' />
                      <span>Sign out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Only shown on mobile */}
          <div className='md:hidden flex items-center'>
            {user ? (
              <button
                onClick={logout}
                className='p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200'
                aria-label='Logout'
              >
                <FiLogOut className='w-5 h-5' />
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className='p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200'
                aria-label='Login'
              >
                <FiLogIn className='w-5 h-5' />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
