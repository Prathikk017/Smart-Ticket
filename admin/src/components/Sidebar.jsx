import React, { useState } from 'react';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { AiFillSetting } from 'react-icons/ai';
import { MdApproval } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { GrBus, GrGroup } from 'react-icons/gr';
import { BsFillPersonPlusFill, BsPersonBadge } from 'react-icons/bs';
import { GiPoliceOfficerHead } from 'react-icons/gi';
import { BiShowAlt } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { ImUser } from 'react-icons/im';

const Sidebar = () => {
	const [showOperatorDropdown, setShowOperatorDropdown] = useState(false);
	const [showTeamDropdown, setShowTeamDropdown] = useState(false);

	const history = useNavigate();

	const handlesub = () => {
		history('/');
	};

	const handleOperatorDropdown = () => {
		setShowOperatorDropdown(!showOperatorDropdown);
	};
	const handleTeamDropdown = () => {
		setShowTeamDropdown(!showTeamDropdown);
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
					<Link to='/admin/dashboard'>
						<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
							<HiOutlineViewGrid />
							<span className='ml-1'>Dashboard</span>
						</li>
					</Link>
					<div>
						<button
							className='flex justify-start items-center p-2 ml-2 mr-0 mt-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer w-max'
							onClick={handleOperatorDropdown}
						>
							<li className='flex justify-start items-center pr-1 mr-6 text-center'>
								<MdApproval />
								<span className='ml-2'>Operator</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`transition-transform duration-300 ml-[73px] ${
										showOperatorDropdown ? 'transform rotate-90' : ''
									}`}
								/>
							</li>
						</button>
						{showOperatorDropdown && (
							<div className=' mt-2'>
								<Link to='/admin/operatorsview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<GiPoliceOfficerHead />
											<span className='ml-2'>Show Operators</span>
										</li>
									</button>
								</Link>
								<Link to='/admin/employeesview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<BsPersonBadge />
											<span className='ml-2'>Show Employees</span>
										</li>
									</button>
								</Link>
								<Link to='/admin/assetsview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<GrBus />
											<span className='ml-2'>Show Asset</span>
										</li>
									</button>
								</Link>
							</div>
						)}
					</div>
					<div>
						<button
							className='flex justify-start items-center p-2 ml-2 mr-0 mt-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer w-max'
							onClick={handleTeamDropdown}
						>
							<li className='flex justify-start items-center pr-1 mr-6 text-center'>
								<GrGroup />
								<span className='ml-2'>Team</span>
								<FontAwesomeIcon
									icon={faChevronRight}
									className={`ml-auto transition-transform duration-300 ml-[99px] ${
										showTeamDropdown ? 'transform rotate-90' : ''
									}`}
								/>
							</li>
						</button>
						{showTeamDropdown && (
							<div className=' mt-2'>
								<Link to='/admin/addAdmin'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<BsFillPersonPlusFill />
											<span className='ml-2'>Add Admin</span>
										</li>
									</button>
								</Link>
								<Link to='/admin/adminview'>
									<button className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
										<li className='flex justify-start items-center pr-1 mr-4 text-center'>
											<BiShowAlt />
											<span className='ml-2'>Show Admins</span>
										</li>
									</button>
								</Link>
							</div>
						)}
					</div>
					<Link to='/admin/usersview'>
						<li className=' flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
							<ImUser />
							<span className='ml-1'>Users</span>
						</li>
					</Link>
				</ul>
			</div>
			<div className='opacity-70'>
				<hr />
				<ul className='p-1'>
					<li className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'>
						<AiFillSetting />
						<span className='ml-1'>Settings</span>
					</li>
					<li
						className='flex justify-start items-center p-2 m-2 rounded-lg text-center hover:bg-pink-300 hover:cursor-pointer'
						onClick={handlesub}
					>
						<FaUser />
						<span className='ml-1'>Logout</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
