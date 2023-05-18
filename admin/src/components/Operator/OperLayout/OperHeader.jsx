import React, { Fragment, useEffect, useState } from 'react';
import {
	HiOutlineBell,
	HiOutlineChatAlt,
	HiOutlineSearch,
} from 'react-icons/hi';
import axios from 'axios';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
const OperHeader = () => {
	const [operFullName, setOperFullName] = useState('');
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

	useEffect(() => {
		getOperator();
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
				<strong>{operFullName}</strong>
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
										<div className='mt-1 py-1 text-sm'>No notifications!!</div>
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
