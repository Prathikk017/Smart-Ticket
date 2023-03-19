import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom"
import Sidebar from './Sidebar';

const Opertable = () => {
  const [data, setData] = useState('');

  const getUserdata = async () => {
    const res = await axios.get('http://localhost:8004/operator/read');

    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    getUserdata();
  }, []);

  return (
    <>
      <div className='flex flex-row gap-4'>
        <Sidebar />

        <div className='bg-white p-4 my-20 mr-4 h-full items-center rounded-sm border border-gray-200 flex-1 '>
          <strong className='text-gray-700 font-large'>Operator's</strong>
          <div className='border-x border-gray-200 rounded-sm mt-3'>
            <table className='w-full text-gray-700 justify-between mx-1'>
              <thead>
                <tr>
                  <th className='p-1 ml-2'>Sl No</th>
                  <th className='p-1 ml-2'>Company Name</th>
                  <th className='p-1 ml-2'>Company Email</th>
                  <th className='p-1 ml-2'>GST No</th>
                  <th className='p-1 ml-2'>Phone No</th>
                  <th className='p-1 ml-2'>Status</th>
                  <th className='p-2 ml-2'>View</th>
                </tr>
              </thead>
              <tbody className='justify-between  text-center'>
                {data.length > 0
                  ? data.map((el, i) => {

                      return (
                        <>
                          <tr >
                            <td className='p-2 ml-2' >{i + 1}</td>
                            <td className='p-2 ml-2'>{el.OperName}</td>
                            <td className='p-2 ml-2'>{el.OperEmail}</td>
                            <td className='p-2 ml-2'>{el.OperGSTIN}</td>
                            <td className='p-2 ml-2'>{el.OperPhone}</td>
                            <td className='p-2 ml-2'>{el.OperStatus}</td>
                            <td className='p-2 ml-2'>
                            <Link
                            to={`/operator/${el.OperId}`}
                          >
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
      </div>
    </>
  );
};

export default Opertable;
