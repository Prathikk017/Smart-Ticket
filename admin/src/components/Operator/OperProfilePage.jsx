import React from 'react'
import Opersidebar from './Opersidebar'
import OperHeader from './OperLayout/OperHeader'
import OperStatsGrid from './OperLayout/OperStatsGrid'
import OperProfileView from './OperProfileView'

const OperProfilePage = () => {
  return (
    <div className='flex gap-4 bg-gray-50'>
    <Opersidebar />
    <div className='flex flex-col flex-1'>
        <OperHeader />
        <div className='flex flex-col gap-4'>
          <OperProfileView/>
            {/* <OperStatsGrid /> */}
            {/* <OperTransactionChart/> */}
        </div>
    </div>
</div>
  )
}

export default OperProfilePage