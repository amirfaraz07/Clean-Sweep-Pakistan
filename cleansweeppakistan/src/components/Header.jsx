import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-[#9B9A9A]">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <Link to='/'><img src="/cspLogofavicon.png" alt="Logo" className="h-[40px] w-[40px] mr-4" /></Link>
        </div>
        <ul className="flex gap-12 font-semibold">
          <li>
            <Link to="/" className="hover:text-gray-600">Home</Link>
          </li>
          <li>
            <Link to="/status/civilian" className="hover:text-gray-600">Status</Link>
          </li>
          <li>
            <Link to="/complain-hub" className="hover:text-gray-600">Complain Hub</Link>
          </li>
          <li>
            <Link to="/about-us" className="hover:text-gray-600">About us</Link>
          </li>
        </ul>
        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout} className='bg-[#AAFF95] ml-5 px-8 py-1 font-semibold rounded-full hover:bg-green-500'>Logout</button>
          ) : (
            <Link to="/login"><button className='bg-[#AAFF95] ml-5 px-8 py-1 font-semibold rounded-full hover:bg-green-500'>Login</button></Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
