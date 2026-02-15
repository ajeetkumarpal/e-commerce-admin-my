import React from 'react'
import { assets } from '../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    
  return (
    <div className='flex flex-col border-r h-screen border-gray-400 w-[max(15%,40px)] '>
      <NavLink to="/add" className={({isActive})=> `${isActive?"bg-amber-300":"bg-white"} mb-1.5 flex flex-row justify-between items-center gap-6 px-10 py-2 border border-t-0 rounded-bl-md border-gray-400 border-r-0`}>
<img className='h-4 ' src={assets.add_icon} alt="" />
<p className='text-sm'>Add Items</p>
      </NavLink>
      <NavLink to="/list" className={({isActive})=> `${isActive?"bg-amber-300":"bg-white"} mb-1.5 flex flex-row justify-between items-center gap-6 px-10 py-2 border border-t-0 rounded-bl-md border-gray-400 border-r-0`}>
<img className='h-4 ' src={assets.order_icon} alt="" />
<p className='text-sm'>List Items</p>
      </NavLink>
        <NavLink to="/order" className={({isActive})=> `${isActive?"bg-amber-300":"bg-white"} mb-1.5 flex flex-row justify-between items-center gap-6 px-10 py-2 border border-t-0 rounded-bl-md border-gray-400 border-r-0`}>
<img className='h-4 ' src={assets.order_icon} alt="" />
<p className='text-sm'>Order Items</p>
      </NavLink>
      
    </div>
  )
}

export default Sidebar
