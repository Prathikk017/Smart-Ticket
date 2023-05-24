import React, { Fragment, useEffect, useState } from 'react';
import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from 'react-icons/hi';
import axios from 'axios';
import moment from 'moment';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
const OperHeader = () => {
  const [operFullName, setOperFullName] = useState('');
  const [expiredAssets, setExpiredAssets] = useState([]);
  const [notificationDate, setNotificationDate] = useState('');
  const ID = window.localStorage.getItem('OperID');
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
		setNotificationDate(moment(res.data.Notification).format('DD-MM-YYYY'));
		const assetsArray = Object.values(res.data.data); // Convert the response object into an array
		const filteredAssets = assetsArray.filter(asset => asset.AstId.startsWith(operId));
		setExpiredAssets(filteredAssets);
      }
    } catch (error) {
      console.error('Error retrieving expired assets:', error);
    }
  };

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
        {/* <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && 'bg-gray-100',
                  'p-1.5 rounded-md inline-flex items-center text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100 '
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
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
                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80'>
                  <div className='bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <strong className='text-gray-600 font-medium'>
                      Messages
                    </strong>
                    <div className='mt-1 py-1 text-sm'>No messages!!</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover> */}
        <strong className='md:text-lg text-xs md:ml-0 ml-2 cursor-pointer'>
          {operFullName}
        </strong>
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
                <Popover.Panel className='absolute right-0 z-10 mt-2.5 w-80'>
                  <div className='bg-white rounded-md shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5'>
                    <strong className='text-gray-600 font-medium'>
                      Notification
                    </strong>
                    {expiredAssets.length === 0 ? (
                      <div className='mt-1 py-1 text-sm'>
                        No notifications!!
                      </div>
                    ) : (
                      <ul className='mt-1 py-1 text-sm'>
						
                        {expiredAssets.map((asset) => (
                          <li key={asset.AstId}>{asset.AstRegNo} will expiry on {notificationDate}.</li>
                        ))}
                      </ul>
                    )}
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
