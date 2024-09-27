import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../Store/AuthSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signin = ({togglePanel}) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Email is required "),
    password: Yup.string().required("password is required"),
})
  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:(values)=>{
        dispatch(login(values))
         console.log("login form value", values)
    }
})

    // const [formData, setFormdata] = useState({
    //     email:"",
    //     password:""
    // })
    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormdata({...formData, [name]: value})
    // }
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(login(formData))
    //     console.log("login Data:", formData);
    // }
  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
        <form className='space-y-3 pl-2' onSubmit={formik.handleSubmit}>
           <TextField fullWidth label="Email" name="email" type="email" value={formik.values.email} 
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
           error={formik.touched.email && Boolean(formik.errors.email)}
           helperText={formik.touched.email && formik.errors.email}
           placeholder='Enter your email address'
           />

<TextField fullWidth label="Password" name="password" type="password" value={formik.values.password} 
onChange={formik.handleChange}
onBlur={formik.handleBlur}
error={formik.touched.password && Boolean(formik.errors.password)}
helperText={formik.touched.password && formik.errors.password}
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