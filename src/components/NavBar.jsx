import React from 'react';
import { MdOutlineShoppingCart } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/profil');
    } else {
      navigate('/auth');
    }
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className='navbar my-4 rounded-lg p-3 shadow-md text-center flex justify-between items-center'>
        <p></p>
        <button className='font-semibold from-neutral-700' onClick={handleTitleClick}>LocaVoiture</button>
        <div>
          <button className='btn btn-primary px-2 py-1'>
            <MdOutlineShoppingCart className='w-6 h-6'/>
          </button>
          <button className='btn btn-primary px-2 py-1' onClick={handleAccountClick}>
            <VscAccount className='w-6 h-6'/>
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
