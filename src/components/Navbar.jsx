import React from 'react';
import { assets } from '../assets/admin_assets/assets';

const Navbar = ({setToken}) => {
  return (
    <div className='flex flex-row justify-between py-2 items-center border-b border-gray-400'>
      <img className='h-14 ' src={assets.logo} alt="not available" />
      <button onClick={()=>setToken("")} className='h-10 w-28 font-semibold border border-gray-900 rounded-3xl bg-gray-500 text-white'>Logout</button>
    </div>
  );
}

export default Navbar;
