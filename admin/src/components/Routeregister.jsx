import React, { useEffect, useState } from 'react';
import Opersidebar from './Opersidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Routeregister = () => {
  const [RouteName, setRouteName] = useState('');
  const [RouteEffDate, setRouteEffDate] = useState('');
  const [RouteSStage, setRouteSStage] = useState('');
  const [RouteEStage, setRouteEStage] = useState('');
  const [ApplicableTickets, setApplicableTickets] = useState([]);
  const [checkboxOptions, setCheckBoxOptions] = useState([]);
 
  const history = useNavigate();
  const ID = window.localStorage.getItem('OperID');
  var operId = JSON.parse(ID);

  //function
  const setData = (e) => {
    setRouteName(e.target.value);
  };

  const setData1 = (e) => {
    setRouteEffDate(e.target.value);
  };

  const setData2 = (e) => {
    setRouteSStage(e.target.value);
  };

  const setData3 = (e) => {
    setRouteEStage(e.target.value);
  };
 
  const handleCheckboxChange = (e) => {
    const ticketValue = e.target.value;
    const isChecked = e.target.checked;
    if (isChecked) {
      setApplicableTickets([...ApplicableTickets, ticketValue]);
    } else {
      setApplicableTickets(ApplicableTickets.filter((t) => t !== ticketValue));
    }
  };

  const getTicketData = async() => {
    let ttstatus = 'A';
     const res1 = await axios.post('http://localhost:8004/operator/readticket',{ttstatus});

     if(res1.data.status === 201){
      setCheckBoxOptions(res1.data.data);
     }else{
      console.log("err");
     }
  }
// console.log(ApplicableTickets)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!RouteName || !RouteEffDate || !RouteSStage || !RouteEStage) {
      alert('Fill the details');
    } else {
      const res = await axios.post(
        'http://localhost:8004/operator/routecreate',
        {
          RouteName,
          RouteEffDate,
          RouteSStage,
          RouteEStage,
          operId,
        }
      );
      if (res.data.status === 201) {
        const RouteID = res.data.routeId;
        alert('Route created successfully');
        
        const  res2 = await axios.post('http://localhost:8004/operator/routettypecreate',{
          RouteID,
          ApplicableTickets
        })
        if(res2.data.status === 201){
          alert('Route Ticket Type added');
        }
        var form = document.getElementsByName('contact-form')[0];
        form.reset();
        return;
      } else {
        alert('Route unable to register');
        return;
      }
    }
  };

  useEffect(() => {
    const token = window.localStorage.getItem('Lekpay');
    const Token = JSON.parse(token);
    if (!Token) {
      history('/');
    }else{
     getTicketData();
    }
  }, []);

  return (
    <div className='flex flex-row gap-4 bg-gray-50'>
      <Opersidebar />
      <div className='h-screen w-full py-4 max-h-[100vh] overflow-y-auto'>
        <div className='py-4 flex flex-col justify-center items-center'>
          <form className='max-w-[400px] w-full mx-auto' name='contact-form'>
            <h2 className='text-4xl text-pink-500 text-center py-1'>
              Route Register
            </h2>
            <div className='flex flex-col py-2'>
              <label>Route Name</label>
              <input
                type='text'
                onChange={setData}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-2'>
              <label>Route Effective date</label>
              <input
                type='date'
                onChange={setData1}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-2'>
              <label>Route Start Stage</label>
              <input
                type='text'
                onChange={setData2}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-2'>
              <label>Route End Stage</label>
              <input
                type='text'
                onChange={setData3}
                className='border rounded w-full hover:border-pink-500 duration-200 p-1'
              />
            </div>
            <div className='flex flex-col py-2'>
              <label>Applicable Ticket:</label>
              <div className='grid grid-cols-3 gap-3 m-2'>
              { checkboxOptions.map((el, i) => {
                  return (
              <div className='flex items-center p-1' key={i}>
                <input
                  type='checkbox'
                  value={el.TTid}
                  onChange={handleCheckboxChange}
                  className='mr-1'
                />
                <label>{el.TTname}</label>
              </div>
                );
              })}
          </div>
            </div>
            <button
              className='border w-full my-2 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Routeregister;
