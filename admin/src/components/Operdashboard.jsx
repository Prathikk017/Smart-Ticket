import React from 'react';
import Opersidebar from './Opersidebar';
import Asttable from './Asttable';
import Emptable from './Emptable';

const Operdashboard = () => {
  return (
    <div className='flex flex-row gap-6 bg-gray-50'>
      <Opersidebar />
      {/* <Dheader/> */}
      <div className='flex justify-between gap-2'>
        <div className='grid-col-1'>
          <Asttable />
        </div>
        <div className='grid-col-1'>
          <Emptable />
        </div>
      </div>
    </div>
  );
};

export default Operdashboard;
