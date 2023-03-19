import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useFormik } from 'formik';

import { useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';
import { signInSchema } from '../schemas';

const initialValues = {
  Aname: '',
  Apassword: '',
};

const SignIn = () => {
  const history = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });
  const Aname = values.Aname;
  const Apassword = values.Apassword;
  const [operid, setOperid] = useState('');


  const handleSub = async (e) => {
    e.preventDefault();

    if (!Aname || !Apassword) {
      alert('Fill the details');
    } else {
      const res = await axios.post('http://localhost:8004/admin/login', {
        Aname,
        Apassword,
      });

      if (res.data.status === 200) {
        alert("User doesn't exist");
        var form = document.getElementsByName('contact-form')[0];
        form.reset();
        return;
      }
      if (res.data.status === 201) {
        alert('User Login Successfully');
        if (res.data.data.Flag === 'A') {
          setTimeout(() => history('/dashboard'), 500);
          return;
        }
        if (res.data.data.Flag === 'O') {
          setOperid(res.data.data.AuthID);
          setTimeout(() => history('/operdashboard'), 500);
          return;
        }
      } else {
        alert('Wrong username/password!!');
      }
    }
  };

  const handlereg = () => {
    history('/register');
  };

   useEffect(()=>{
    window.localStorage.setItem('OperID', JSON.stringify(operid));
  },[operid]);

  return (
    <>
      <Header />
      <div className='grid grid-cols-1 sm:grid-cols-2 h-full w-full'>
        <div className='flex flex-col justify-center'>
          <form
            className='max-w-[400px] w-full mx-auto p-4  rounded-md'
            name='contact-form'
            onSubmit={handleSubmit}
          >
            <h2 className='text-4xl text-pink-500 text-center py-6'>Sign In</h2>
            <div className='flex flex-col py-2'>
              <label>Email or phone number</label>
              <input
                type='text'
                name='Aname'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Aname}
                className='border rounded p-2 hover:border-pink-400 duration-200'
              />
              {errors.Aname && touched.Aname ? (
                <p className='text-red-500 text-xs '>{errors.Aname}</p>
              ) : null}
            </div>
            <div className='flex flex-col py-2'>
              <label>Password</label>
              <input
                type='password'
                name='Apassword'
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Apassword}
                className='border rounded p-2 hover:border-pink-400 duration-200'
              />
              {errors.Apassword && touched.Apassword ? (
                <p className='text-red-500 text-xs '>{errors.Apassword}</p>
              ) : null}
            </div>

            <div className='flex justify-between'>
              <p className='flex items-center'>
                <input type='checkbox' className='mr-2 cursor-pointer' />
                Remember Me
              </p>
              <p className='hover:text-pink-500 cursor-pointer'>
                <a href='/'>Forgotten Password?</a>
              </p>
            </div>
            <button
              className='border w-full my-5 py-2 text-white bg-pink-500 rounded text-lg hover:bg-pink-400 duration-200'
              onClick={handleSub}
            >
              Sign In
            </button>
            <div className='flex justify-between'>
              <p className='mx-auto'>
                <a href='/register'>
                  Don't have an account?
                  <span className='hover:text-pink-500' onClick={handlereg}>
                    Register
                  </span>
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className='hidden sm:block  mt-16'>
          <img src={login} alt='logo' className='w-[500px] h-[500px]' />
        </div>
      </div>
    </>
  );
};

export default SignIn;
