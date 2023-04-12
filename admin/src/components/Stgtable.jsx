import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import moment from 'moment';
import Opersidebar from './Opersidebar';
import './pagination.css';

const Stgtable = () => {
  const [data, setData] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  const getAstData = async () => {
    const res = await axios.post('http://localhost:8004/operator/readstg', {
      operId,
    });
    if (res.data.status === 201) {
      setData(res.data.data);
    } else {
      console.log('error');
    }
  };

  // Get current items based on currentPage and itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render page numbers
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumber.push(i);
  }

  const renderPageNumbers = pageNumber.map((number) => {
    return (
      <li
        key={number}
        className={`${currentPage === number ? 'active' : ''}page-item`}
      >
        <button className='page-link' onClick={() => paginate(number)}>
          {number}
        </button>
      </li>
    );
  });

  useEffect(() => {
    getAstData();
  });

  return (
    <>
      <div>
        <div className='flex flex-row gap-10'>
          <Opersidebar />
          <div className='flex-col justify-center items-center ml-[10%]'>
            <div className='bg-white p-4 mt-4 mr-10 ml-8 max-h-96 items-center rounded-md w-[160%] flex-1'>
              <h1 className='text-gray-700 text-3xl text-center font-semibold pb-1'>
                Stage Table
              </h1>
              <div className=' rounded-sm mt-2'>
                <table className='w-full text-gray-700 justify-between mx-1 border border-gray-800'>
                  <thead>
                    <tr className='border border-gray-800'>
                      <th className='p-1 ml-1'>Sl No</th>
                      <th className='p-1 ml-1'>Stage Name</th>
                      <th className='p-1 ml-1'>Status</th>
                      <th className='p-1 ml-1'>Created Date</th>
                      <th className='p-2 ml-1'>View</th>
                    </tr>
                  </thead>
                  <tbody className='justify-between  text-center'>
                    {currentItems.length > 0
                      ? currentItems.map((el, i) => {
                          return (
                            <>
                              <tr>
                                <td className='p-1 ml-1'>
                                  {indexOfFirstItem + i + 1} 
                                </td>
                                <td className='p-1 ml-1'>{el.StageName}</td>
                                <td className='p-1 ml-1'>{el.StageStatus}</td>
                                <td className='p-1 ml-1'>
                                  {moment(el.CreatedDate).format('DD-MM-YYYY')}
                                </td>
                                <td className='p-2 ml-1'>
                                  <Link to={`/operator/stage/${el.StageID}`}>
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
                {/* Pagination */}
                <div className='flex justify-center items-center'>
                  <nav>
                    <ul className='flex' id='pagination'>
                      <li
                        className={`${
                          currentPage === 1 ? 'disabled' : ''
                        } page-item`}
                      >
                        <button
                          className='page-link  rounded-r-md focus:outline-none rounded-l-md mr-1 mt-1'
                          onClick={() =>
                            setCurrentPage((prev) =>
                              prev === 1 ? prev : prev - 1
                            )
                          }
                        >
                          <FaAngleDoubleLeft />
                        </button>
                      </li>
                      {renderPageNumbers}
                      <li
                        className={`${
                          currentPage === pageNumber.length ? 'disabled' : ''
                        } page-item`}
                      >
                        <button
                          className='page-link  rounded-r-md focus:outline-none rounded-l-md ml-2 mt-1'
                          onClick={() =>
                            setCurrentPage((prev) =>
                              prev === pageNumber.length ? prev : prev + 1
                            )
                          }
                        >
                          <FaAngleDoubleRight />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stgtable;