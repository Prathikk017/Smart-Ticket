import React, { useEffect, useState } from 'react';
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi';
import { GrBus, GrView } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { AiFillSetting } from 'react-icons/ai';
import { FaMapMarkedAlt } from 'react-icons/fa';
import { BsFillXDiamondFill } from 'react-icons/bs';
import { TbRoute } from 'react-icons/tb';
import { IoIosCreate } from 'react-icons/io';
import { MdApproval } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthProvider } from '../../Contexts/authContext';

const Opersidebar = () => {
	const [showAssetDropdown, setShowAssetDropdown] = useState(false);
	const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
	const [showStageDropdown, setShowStageDropdown] = useState(false);
	const [showRouteDropdown, setShowRouteDropdown] = useState(false);
	const history = useNavigate();

	const handlesub = () => {
		history('/signin');
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
	const handleRouteDropdown = () => {
		setShowRouteDropdown(!showRouteDropdown);
	};

	const handleLogOut = (logout) => {
		<AuthProvider children={logout} />;
	};

	useEffect(() => {
		const token = window.localStorage.getItem('Lekpay');
		const Token = JSON.parse(token);
		if (!Token) {
			history('/signin');
		}
	}, []);

	return (
		<div className='bg-neutral-100 flex flex-col p-3 w-60 h-screen'>
			<Link to='/signin'>
				<div className='flex items-center justify-start hover:cursor-pointer'>
					<img
						className='w-[50px] ml-2 rounded-r-full rounded-l-full'
						src={logo}
						alt='LOGO'
					/>
					<h1 className='text-2xl ml-2'>LEKPAY</h1>
				</div>
			</Link>
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
							<li className='flex justify-start items-center pr-1 mr-6 text-center'>
								<MdApproval />
								<span className='ml-2'>Employee</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[20px] ${
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
							<li className='flex justify-start items-center pr-1 mr-14 text-center'>
								<GrBus />
								<span className='ml-2'>Asset</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[20px] ${
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
							<li className='flex justify-start items-center pr-1 mr-14 text-center'>
								<BsFillXDiamondFill />
								<span className='ml-2'>Stage</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[20px] ${
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

					<div>
						<button
							className='flex justify-start items-center p-2 ml-2 mr-0 mt-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer w-max'
							onClick={handleRouteDropdown}
						>
							<li className='flex justify-start items-center pr-1 mr-14 text-center'>
								<TbRoute />
								<span className='ml-2'>Route</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[20px] ${
										showRouteDropdown ? 'transform rotate-90' : ''
									}`}
								/>
							</li>
						</button>
						{showRouteDropdown && (
							<div className=' mt-2'>
								<Link to='/routeregister'>
									<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<IoIosCreate />
										<span className='ml-2'>Route Register</span>
									</li>
								</Link>
								<Link to='/rutview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<GrView />
											<span className='ml-2'>View Route</span>
										</li>
									</button>
								</Link>
							</div>
						)}
					</div>
					<Link to='/routemap'>
						<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
							<FaMapMarkedAlt />
							<span className='ml-2'>Route Map</span>
						</li>
					</Link>
				</ul>
			</div>
			<div className='fixed bottom-0'>
				<hr />
				<ul className='p-1'>
					<li
						className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'
						onClick={handlesub}
					>
						<HiOutlineLogout />
						<span className='ml-2' onClick={handleLogOut}>
							Logout
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Opersidebar;
