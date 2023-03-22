import React from 'react'
import {HiOutlineViewGrid, HiOutlineLogout} from 'react-icons/hi';
import {GrBus} from 'react-icons/gr';
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg';
import{AiFillSetting} from 'react-icons/ai';
import{FaMapMarkedAlt} from 'react-icons/fa';
import {BsFillXDiamondFill} from 'react-icons/bs';
import{TbRoute} from 'react-icons/tb';
import{MdApproval} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Opersidebar = () => {
 
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
        <Link to="/operdashboard">
          <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
           <HiOutlineViewGrid /><span className='ml-2'>Dashboard</span>
          </li></Link>
          <Link to="/empregister">
          <li className='flex justify-start items-center  p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
            <MdApproval/><span className='ml-2'>Employee</span>
          </li></Link>
          <Link to="/astregister">
          <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
           <GrBus/><span className='ml-2'>Asset</span> 
          </li></Link>
          <Link to="/stageregister">
          <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
           <BsFillXDiamondFill/><span className='ml-2'>Stage</span> 
          </li></Link>
          <Link to="/routeregister">
          <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
           <TbRoute/><span className='ml-2'>Route</span> 
          </li></Link>
          <Link to="/routemap">
          <li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
           <FaMapMarkedAlt/><span className='ml-2'>Route Map</span> 
          </li></Link>
        </ul>
        </div>
        <div className='opacity-70'>
          <hr/>
         <ul className='p-1'>
         <li className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
            <AiFillSetting/><span className='ml-2'>Settings</span> 
          </li>
          <li className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer' onClick={handlesub}>
           <HiOutlineLogout/><span className='ml-2'>Logout</span>
          </li>
         </ul>
        </div>
        
      </div>
    );
  };
  


export default Opersidebar

