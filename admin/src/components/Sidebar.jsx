import React from 'react';
import {HiOutlineViewGrid, HiOutlineLogout} from 'react-icons/hi';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';
import {IoIosPeople} from 'react-icons/io';
import{AiFillSetting} from 'react-icons/ai';
import{MdApproval} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const history = useNavigate();

  const handlesub = ()=>{
    history('/');
  }
  return (
    <div className='bg-neutral-100 flex flex-col py-3 px-1 w-60 h-screen'>
      <div className='flex items-center justify-start hover:cursor-pointer'>
        <img
          className='w-[50px] ml-2 rounded-r-full rounded-l-full'
          src={logo}
          alt='LOGO'
        />
        <h1 className='text-2xl ml-2'>LEKPAY</h1>
      </div>
      <div className='flex-1'>
      <ul className='p-2'>
      <Link to="/dashboard">
        <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
         <HiOutlineViewGrid /><span className='ml-1'>Dashboard</span>
        </li></Link>
        <Link to="/opertable">
        <li className='flex justify-start items-center  p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
          <MdApproval/><span className='ml-1'>Operator</span>
        </li></Link>
        <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
         <IoIosPeople/><span className='ml-1'>Team</span> 
        </li>
      </ul>
      </div>
      <div className='opacity-70'>
        <hr/>
       <ul className='p-1'>
       <li className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
          <AiFillSetting/><span className='ml-1'>Settings</span> 
        </li>
        <li className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer' onClick={handlesub}>
         <HiOutlineLogout/><span className='ml-1'>Logout</span>
        </li>
       </ul>
      </div>
      
    </div>
  );
};

export default Sidebar;
