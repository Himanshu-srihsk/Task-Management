import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './theme/darkTheme';
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from './page/navbar/Navbar';
import Home from './page/home/Home';
import Auth from './page/Auth/Auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './Store/TaskSlice';
import { getUserProfile } from './Store/AuthSlice';

function App() {

  const dispatch = useDispatch();

  const {task, auth} = useSelector(store => store)

  useEffect(()=> {
    const jwt = localStorage.getItem('jwt'); 
    if (jwt) {
      console.log("ed ejne")
      dispatch(fetchTasks({}))
   dispatch(getUserProfile(auth.jwt || localStorage.getItem('jwt')))
    }
   
  },[auth.jwt])
   
  console.log("auth:", auth)
  // const user = true;
  return (
    <ThemeProvider theme={darkTheme}>
       <CssBaseline />

       {auth.user?<div>
           <Navbar/>
       <Home/>
       </div>: <Auth/>}
       
      
    </ThemeProvider>
  );
}

export default App;
