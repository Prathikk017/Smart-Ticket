import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from "moment";

const Emptable = () => {
    const [data, setData] = useState('');
    const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getEmpData = async() =>{
    const res = await axios.post('http://localhost:8004/employee/reademp', {
        operId,
      });
      if(res.data.status === 201){
        setData(res.data.data);
      }else{
        console.log("error");
      }
    }

    useEffect(() => {
        getEmpData();
      });
  return (
    <>
    <div className='bg-white p-4 mt-16 mr-6 h-64 items-center rounded-md border border-gray-200 flex-1  max-h-[90vh] overflow-y-auto'>
      <strong className='text-gray-700 font-large'>Employee Table</strong>
      <div className='border-x border-gray-200 rounded-sm mt-2'>
        <table className='w-full text-gray-700 justify-between mx-1  '>
          <thead>
            <tr className=''>
              <th className='p-1 ml-1'>Sl No</th>
              <th className='p-1 ml-1'>Employee Name</th>
              <th className='p-1 ml-1'>Employee ID</th>
              <th className='p-1 ml-1'>Date Of Birth</th>
              <th className='p-1 ml-1'>Type</th>
              <th className='p-1 ml-1'>Status</th>
              <th className='p-2 ml-1'>View</th>
            </tr>
          </thead>
          <tbody className='justify-between  text-center'>
            {data.length > 0
              ? data.map((el, i) => {
                  return (
                    <>
                      <tr>
                        <td className='p-1 ml-1' key={el.EmpId}>{i + 1}</td>
                        <td className='p-1 ml-1'>{el.EmpName}</td>
                        <td className='p-1 ml-1'>{el.EmpIntId}</td>
                        <td className='p-1 ml-1'>{moment(el.EmpDOB).format("DD-MM-YYYY")}</td>
                        <td className='p-1 ml-1'>{el.EmpType}</td>
                        <td className='p-1 ml-1'>{el.EStatus}</td>
                        <td className='p-1 ml-1'>
                          <Link to={`/employee/${el.EmpId}`}>
                            <button className='hover:bg-pink-300  px-4 py-2 rounded-lg w-max'>
                              View
                            </button>
                          </Link>
                        </td>
                      </tr>
                    </>
                  );
                })
              : ' '}
          </tbody>
        </table>
      </div>
    </div>
  </>
  )
}

export default Emptable