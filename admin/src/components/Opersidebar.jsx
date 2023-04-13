import React, { useState } from 'react';
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi';
import { GrBus, GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { AiFillSetting } from 'react-icons/ai';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BsFillXDiamondFill } from 'react-icons/bs';
import { TbRoute } from 'react-icons/tb';
import { IoIosCreate } from 'react-icons/io';
import { MdApproval } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Opersidebar = () => {
	const [showAssetDropdown, setShowAssetDropdown] = useState(false);
	const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
	const [showStageDropdown, setShowStageDropdown] = useState(false);
	const history = useNavigate();

	const handlesub = () => {
		history('/');
	};
	const handleAssetDropdown = () => {
		setShowAssetDropdown(!showAssetDropdown);
	};
	const handleEmployeeDropdown = () => {
		setShowEmployeeDropdown(!showEmployeeDropdown);
	};
	const handleStageDropdown = () => {
		setShowStageDropdown(!showStageDropdown);
	};

	return (
		<div className='bg-neutral-100 flex flex-col py-3 px-1 w-64 h-screen'>
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
					<div>
						<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
							<Link to='/operdashboard'>
								<li className='flex justify-start items-center pr-1 mr-12 text-center '>
									<HiOutlineViewGrid />
									<span className='ml-2'>Dashboard</span>
								</li>
							</Link>
						</button>
						<div></div>
						<button
							className='flex justify-start items-center p-2 ml-2 mr-0 mt-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer w-max'
							onClick={handleEmployeeDropdown}
						>
							<li className='flex justify-start items-center pr-1 mr-12 text-center'>
								<MdApproval />
								<span className='ml-2'>Employee</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[60px] ${
										showEmployeeDropdown ? 'transform rotate-90' : ''
									}`}
								/>
							</li>
						</button>
						{showEmployeeDropdown && (
							<div className=' mt-2'>
								<Link to='/empregister'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center mr-1 text-center'>
											<IoIosCreate />
											<span className='ml-2'>Register Employee</span>
										</li>
									</button>
								</Link>
								<Link to='/empview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center mr-4 text-center'>
											<GrView />
											<span className='ml-2'>View Employee</span>
										</li>
									</button>
								</Link>
							</div>
						)}
					</div>
					<div>
						<button
							className='flex justify-start items-center p-2 ml-2 mr-0 mt-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer w-max'
							onClick={handleAssetDropdown}
						>
							<li className='flex justify-start items-center pr-1 mr-20 text-center'>
								<GrBus />
								<span className='ml-2'>Asset</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[60px] ${
										showAssetDropdown ? 'transform rotate-90' : ''
									}`}
								/>
							</li>
						</button>
						{showAssetDropdown && (
							<div className=' mt-2'>
								<Link to='/astregister'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<IoIosCreate />
											<span className='ml-2'>Register Asset</span>
										</li>
									</button>
								</Link>
								<Link to='/astview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<GrView />
											<span className='ml-2'>View Asset</span>
										</li>
									</button>
								</Link>
							</div>
						)}
					</div>
					<div>
						<button
							className='flex justify-start items-center p-2 ml-2 mr-0 mt-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer w-max'
							onClick={handleStageDropdown}
						>
							<li className='flex justify-start items-center pr-1 mr-20 text-center'>
								<BsFillXDiamondFill />
								<span className='ml-2'>Stage</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[60px] ${
										showStageDropdown ? 'transform rotate-90' : ''
									}`}
								/>
							</li>
						</button>
						{showStageDropdown && (
							<div className=' mt-2'>
								<Link to='/stageregister'>
									<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<IoIosCreate />
										<span className='ml-2'>Stage Register</span>
									</li>
								</Link>
								<Link to='/stgview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<GrView />
											<span className='ml-2'>View Stage</span>
										</li>
									</button>
								</Link>
							</div>
						)}
					</div>
					<Link to='/routeregister'>
						<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
							<TbRoute />
							<span className='ml-2'>Route</span>
						</li>
					</Link>
					<Link to='/routemap'>
						<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
							<FaMapMarkedAlt />
							<span className='ml-2'>Route Map</span>
						</li>
					</Link>
				</ul>
			</div>
			<div className='opacity-70'>
				<hr />
				<ul className='p-1'>
					<li className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
						<AiFillSetting />
						<span className='ml-2'>Settings</span>
					</li>
					<li
						className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'
						onClick={handlesub}
					>
						<HiOutlineLogout />
						<span className='ml-2'>Logout</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Opersidebar;
