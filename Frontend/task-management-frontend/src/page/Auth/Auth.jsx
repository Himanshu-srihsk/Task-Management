import React, { useState } from 'react'
import "./Auth.css"
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {
    const [isRegister, setIsRegister] = useState(false);
    const togglePanel = () =>{
        setIsRegister(!isRegister);
  
    }
  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>
       <div className='box lg:max-w-4xl'>
          <div className={`cover ${isRegister?"rotate-active":""}`}>
             <div className='front'>
                 <img src='https://cdn.pixabay.com/photo/2021/11/18/11/35/attack-6806140_640.png' 
                 alt=''/>

                 <div className='text'>
                    <span className='text-1'>Success is built upon well- organized tasks</span>
                    <span className='text-2 text-xs'>Create and manage your tasks!. Lets get connected</span>
                 </div>
             </div>
             <div className='back'>
              <img src='https://cdn.pixabay.com/photo/2017/03/03/22/37/background-2115142_640.jpg'
              alt='' />
             </div>
          </div>
          <div className='forms h-full'>
             <div className='form-content h-full'>
                <div className='login-form'>
<Signin togglePanel={togglePanel}/>
                </div>

                <div className='signup-form'>
                <Signup togglePanel={togglePanel}/>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}

export default Auth