import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from "moment";

const Asttable = () => {
  const [data, setData] = useState('');
  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getAstData = async() =>{
    const res = await axios.post('http://localhost:8004/operator/readast', {
        operId,
      });
      if(res.data.status === 201){
        setData(res.data.data);
      }else{
        console.log("error");
      }
    }

    useEffect(() => {
        getAstData();
      });
  return (
    <>
      <div className='bg-white p-4 mt-16 mr-4 h-64 items-center rounded-md border border-gray-200 flex-1  max-h-[90vh] overflow-y-auto '>
        <strong className='text-gray-700 font-large'>Asset Table</strong>
        <div className='border-x border-gray-200 rounded-sm mt-2'>
          <table className='w-full text-gray-700 justify-between mx-1  '>
            <thead>
              <tr className=''>
                <th className='p-1 ml-1'>Sl No</th>
                <th className='p-1 ml-1'>Asset Reg No</th>
                <th className='p-1 ml-1'>Asset Model</th>
                <th className='p-1 ml-1'>Insurance Exp</th>
                <th className='p-1 ml-1'>Permit Exp</th>
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
                          <td className='p-1 ml-1'>{i + 1}</td>
                          <td className='p-1 ml-1'>{el.AstRegNo}</td>
                          <td className='p-1 ml-1'>{el.AstName}</td>
                          <td className='p-1 ml-1'>{moment(el.AstInsurExp).format("DD-MM-YYYY")}</td>
                          <td className='p-1 ml-1'>{moment(el.AstPermitExp).format("DD-MM-YYYY")}</td>
                          <td className='p-1 ml-1'>{el.AStatus}</td>
                          <td className='p-2 ml-1'>
                            <Link to={`/operator/asset/${el.AstId}`}>
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
  );
};

export default Asttable;
