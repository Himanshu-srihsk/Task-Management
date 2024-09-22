import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'

const Signup = ({togglePanel}) => {
    const [formData, setFormdata] = useState({
        fullName:"",
        email:"",
        password:"",
        role:""
    })
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormdata({...formData, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("register Data:", formData);
    }
  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
        <form className='space-y-3 pr-2' onSubmit={handleSubmit}>

        <TextField fullWidth label="Full name" name="fullName"  value={formData.fullName} onChange={handleChange}
           placeholder='Enter your fullName'
           />

           <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange}
           placeholder='Enter your email address'
           />

<TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange}
           placeholder='Enter your password'
           />

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Role</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    name='role'
    value={formData.role}
    label="Role"
    onChange={handleChange}
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