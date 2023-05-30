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

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signInSchema,
    onSubmit: (values) => {
      console.log(values);
      resetForm();
    },
  });

  const Aname = values.Aname;
  const Apassword = values.Apassword;
  const [operid, setOperid] = useState('');
  const [token, setToken] = useState('');

  const handleSub = async (e) => {
    e.preventDefault();

    if (!Aname || !Apassword) {
      alert('Fill in the details');
      resetForm();
    } else {
      const res = await axios.post('https://lekpay.com/admin/login', {
        Aname,
        Apassword,
      });

      if (res.data.status === 200) {
        alert("User doesn't exist");
        resetForm();
        return;
      }
      if (res.data.status === 201) {
        alert('User Login Successfully');
        setToken(res.data.token);
        if (res.data.data.Flag === 'A') {
          setTimeout(() => history('/admin/dashboard'), 500);
          return;
        }
        if (res.data.data.Flag === 'O') {
          setOperid(res.data.data.AuthID);
          setTimeout(() => history('/operdashboard'), 500);
          return;
        }
      } else {
        alert('Wrong username/password!!');
        resetForm();
      }
    }
  };

  const handlereg = () => {
    history('/register');
  };

  useEffect(() => {
    window.localStorage.setItem('OperID', JSON.stringify(operid));
    window.localStorage.setItem('Lekpay', JSON.stringify(token));
  }, [operid, token]);

  return (
    <>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: `url(${login})` }}
      />
      <Header />
      <div className='relative flex items-center justify-start mx-[5%] h-full'>
        <form
          className='max-w-[500px] w-full my-auto mt-[10%] p-8 rounded-md bg-white'
          id='contact-form'
          onSubmit={handleSubmit}
        >
          <h2 className='text-4xl text-pink-500 text-center pt-0 pb-4'>Sign In</h2>
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
              <p className='text-red-500 text-xs'>{errors.Aname}</p>
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
              <p className='text-red-500 text-xs'>{errors.Apassword}</p>
            ) : null}
          </div>

          <div className='flex justify-between'>
            <p className='flex items-center'>
              <input type='checkbox' className='mr-2 cursor-pointer' />
              Remember Me
            </p>
            <p className='hover:text-pink-500 cursor-pointer'>
              <a href='/forgotpassword'>Forgotten Password?</a>
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
                <span
                  className='hover:text-pink-500'
                  onClick={handlereg}
                >
                  Register
                </span>
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignIn;
