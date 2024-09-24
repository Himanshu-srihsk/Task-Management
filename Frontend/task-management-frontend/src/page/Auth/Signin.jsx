import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../Store/AuthSlice';

const Signin = ({togglePanel}) => {
  const dispatch = useDispatch();


    const [formData, setFormdata] = useState({
        email:"",
        password:""
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormdata({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData))
        console.log("login Data:", formData);
    }
  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
        <form className='space-y-3 pl-2' onSubmit={handleSubmit}>
           <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange}
           placeholder='Enter your email address'
           />

<TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange}
           placeholder='Enter your password'
           />

<div item xs={12}>
              <Button  fullWidth className='customButton' type='submit' sx={{padding:"0.9rem"}}>
                Login
              </Button>
             </div>
        </form>

        <div className='pl-5 mt-5 items-center gap-2 py-5 justify-center'>
            <span>don't have an account</span>
            <Button onClick={togglePanel}>Signup</Button>
        </div>
    </div>
  )
}

export default Signin