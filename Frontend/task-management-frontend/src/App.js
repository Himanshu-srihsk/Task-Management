import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './theme/darkTheme';
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from './page/navbar/Navbar';
import Home from './page/home/Home';
import Auth from './page/Auth/Auth';
import { useState } from 'react';

function App() {
  const user = true;
  return (
    <ThemeProvider theme={darkTheme}>
       <CssBaseline />

       {user?<div>
           <Navbar/>
       <Home/>
       </div>: <Auth/>}
       
      
    </ThemeProvider>
  );
}

export default App;
