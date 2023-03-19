import React from 'react'
import Opersidebar from './Opersidebar'


const Operdashboard = () => {
  return (
    <div className='flex flex-row gap-4 bg-gray-50'>
    <Opersidebar />
    {/* <Dheader/> */}
    <div className='justify-center text-center m-auto'>
      Dashboard
    </div>
  </div>
  )
}

export default Operdashboard