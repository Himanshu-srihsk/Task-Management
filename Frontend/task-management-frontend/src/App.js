import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@emotion/react';
import { darkTheme } from './theme/darkTheme';
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from './page/navbar/Navbar';
import Home from './page/home/Home';
import Auth from './page/Auth/Auth';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
       <CssBaseline />
       {/* <Navbar/>
       <Home/> */}
       <Auth/>
    </ThemeProvider>
  );
}

export default App;
