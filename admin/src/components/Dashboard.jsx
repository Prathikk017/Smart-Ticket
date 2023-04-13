import React from 'react';
// import Opertable from './Opertable';
// import Dheader from './Dheader';
import Sidebar from './Sidebar';

const Dashboard = () => {
	return (
		<div className='flex flex-row gap-4 bg-gray-50'>
			<Sidebar />
			<div className='justify-center text-center m-auto'>Dashboard</div>
		</div>
	);
};

export default Dashboard;
