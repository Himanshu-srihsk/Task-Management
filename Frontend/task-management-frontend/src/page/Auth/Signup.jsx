import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../Store/AuthSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = ({togglePanel}) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("please enter your name"),
    email:Yup.string().email("Invalid email").required("Email is required "),
    password: Yup.string().required("password is required"),
    role: Yup.string()
        .required("Please choose your role")
        .notOneOf(["","ROLE"], "You must select a valid role"),
})
  const formik = useFormik({
    initialValues:{
      fullName:"",
      email:"",
      password:"",
      role:""
    },
    validationSchema,
    onSubmit:(values)=>{
        dispatch(register(values))
         console.log("form value", values)
    }
})

    // const [formData, setFormdata] = useState({
    //     fullName:"",
    //     email:"",
    //     password:"",
    //     role:""
    // })
    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setFormdata({...formData, [name]: value})
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        //dispatch(register(formData))
       //  console.log("register Data:", formData);
    }
  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
        <form className='space-y-3 pr-2' onSubmit={formik.handleSubmit}>
        <TextField fullWidth label="Full name" name="fullName"  value={formik.values.fullName} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
           placeholder='Enter your fullName'
           />

           <TextField fullWidth label="Email" name="email" type="email" value={formik.values.email} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
           placeholder='Enter your email address'
           />

<TextField fullWidth label="Password" name="password" type="password" value={formik.values.password} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
           placeholder='Enter your password'
           />

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    name='role'
    value={formik.values.role}
    label="Role"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
  >
    <MenuItem value={"ROLE_CUSTOMER"}>USER</MenuItem>
    <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
  </Select>
</FormControl>

<div item xs={12}>
              <Button  fullWidth className='customButton' type='submit' sx={{padding:"0.9rem"}}>
              Register
              </Button>
             </div>
        </form>

        <div className='pl-5 mt-5 items-center gap-2 py-5 justify-center'>
            <span>Already have an account</span>
            <Button onClick={togglePanel}>Signin</Button>
        </div>
    </div>
  )
}

export default Signup