import React, { Fragment, useEffect, useState } from 'react';
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineLogout,
  HiOutlineSearch,
} from 'react-icons/hi';
import {MdOutlineAccountCircle} from 'react-icons/md';
import {RiAccountCircleFill} from 'react-icons/ri';
import axios from 'axios';
import moment from 'moment';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';
import { AuthProvider } from '../../../Contexts/authContext';
const OperHeader = () => {
  const [operFullName, setOperFullName] = useState('');
  const [expiredAssets, setExpiredAssets] = useState([]);
  const [notificationDate, setNotificationDate] = useState('');
  const [notificationCount, setNotificationCount] = useState(0); // New state to hold the count of notifications
  const ID = window.localStorage.getItem('OperID');
  const history = useNavigate();
  var operId = JSON.parse(ID);

  const getOperator = async () => {
    const res = await axios.post(
      'https://lekpay.com/operator/readoperatorshortname',
      { operId }
    );

    if (res.data.status === 201) {
      setOperFullName(res.data.data[0].OperName);
    } else {
      console.log('error');
    }
  };

  const getExpiredAssets = async () => {
    try {
      const res = await axios.post(
        'https://lekpay.com/operator/asset/checkexpiries'
      );
      if (res.data.status === 201) {
        console.log(res.data.data);
		setNotificationDate(moment(res.data.Notification).format('DD-MM-YYYY'));
		const assetsArray = Object.values(res.data.data); // Convert the response object into an array
		console.log(assetsArray)
    const filteredAssets = assetsArray.filter(asset => asset.asset.AstId.startsWith(operId));
		setExpiredAssets(filteredAssets);
    setNotificationCount(filteredAssets.length); // Update the notification count
      }
    } catch (error) {
      console.error('Error retrieving expired assets:', error);
    }
  };

  const handleLogOut = (logout) => {
		<AuthProvider children={logout} />;
    history('/signin');
	};

  console.log(expiredAssets)
  useEffect(() => {
    getOperator();
    getExpiredAssets();
  }, []);

  return (
    <div className='bg-white h-16 px-4 flex justify-between items-center border-b border-gray-200 shadow-md shadow-gray-200 '>
      <div className='relative'>
        <HiOutlineSearch
          fontSize={20}
          className='text-gray-400 absolute top-1/2 -translate-y-1/2 left-3'
        />
        <input
          type='text'
          placeholder='Search...'
          className='text-sm focus:outline-none active:outline-none h-10 md:w-[24rem] w-[19rem] border border-gray-300 rounded-sm  pl-11 px-4 shadow-md shadow-gray-200 '
        />
      </div>
      <div className='flex items-center gap-2 mr-2'>
        
        <strong className='md:text-lg text-xs md:ml-0 ml-2 cursor-pointer'>
          {operFullName}
        </strong>
        {/* notification bell */}
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && 'bg-gray-100',
                  'p-1.5 rounded-md inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100'
                )}
              >
                <HiOutlineBell fontSize={24} />
                {notificationCount > 0 && ( // Display the notification count only if it is greater than 0
                  <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>{notificationCount}</span>
                )}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Popover.Panel className='absolute right-0 z-20 mt-2 w-80'>
                  <div className='bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <div className='flex flex-row justify-between items-center'>
                    <strong className='text-gray-600 font-medium'>
                      Notification
                    </strong>
                    {/* <MdOutlineCancel className='cursor-pointer text-gray-600' size={22} onClick={handleClick}/> */}
                    </div>
                   
                    {expiredAssets.length === 0 ? (
                      <div className='mt-1 py-1 text-sm'>
                        No notifications!!
                      </div>
                    ) : (
                      <ul className='mt-1 py-1 text-sm'>
                        {expiredAssets.map((asset) => (
                          <div className='mb-1'>
                            <div className='flex flex-row'>
                              <Link to={`/astupdatemap/${asset.asset.AstId}`}>
                                <li className='p-1 mt-1 text-gray-700' key={asset.asset.AstId}>
                                  <span className='text-gray-500 font-medium'>{asset.asset.AstRegNo}</span> 
                                  {asset.expiryInfo.insuranceExpiry && asset.expiryInfo.permitExpiry ? (
                                    <>
                                      <span className='text-gray-500 font-medium'><span className='font-normal mx-1'>insurance expiry on</span>{asset.expiryInfo.insuranceExpiry}</span> and
                                      <span className='text-gray-500 font-medium'><span className='font-normal mx-1'>permit expiry on</span>{asset.expiryInfo.permitExpiry}</span>
                                    </>
                                  ) : asset.expiryInfo.insuranceExpiry ? (
                                    <span className='text-gray-500 font-medium'><span className='font-normal mx-1'>insurance expiry on</span>{asset.expiryInfo.insuranceExpiry}</span>
                                  ) : (
                                    <span className='text-gray-500 font-medium'><span className='font-normal mx-1'>permit expiry on</span>{asset.expiryInfo.permitExpiry}</span>
                                  )}
                                </li>
                              </Link>
                            </div>
                            <hr/>
                          </div>
                        ))}
                        
                      </ul>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        {/* profile  */}
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && 'bg-gray-100',
                  'p-1.5 rounded-md inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100 '
                )}
              >
                <RiAccountCircleFill fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-1'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-1'
              >
                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-40'>
                  <div className='bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <ul>
                      <h6 className='font-normal text-gray-700 ml-2'>WELCOME!</h6>
                    <Link to={'/operator/profileview'}>
                    <strong className='text-gray-800 font-normal flex flex-row my-2 '>
                    <MdOutlineAccountCircle className='text-gray-600 mr-2' size={24}/> View Profile
                    </strong>
                    </Link>
                    <li onClick={handleLogOut}>
                    <strong className='text-gray-800 font-normal flex flex-row my-2 cursor-pointer' >
                    <HiOutlineLogout  className='text-gray-600 mr-1 ml-1' size={24}/> Logout
                    </strong>
                    </li>
                    
                    </ul>
                    
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default OperHeader;
