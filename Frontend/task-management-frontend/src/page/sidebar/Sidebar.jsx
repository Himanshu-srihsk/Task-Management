import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import "./Sidebar.css"
import CreateTask from '../Task/CreateTask';
const menu = [
    {name: "Home", value:"HOME", role:["ROLE_ADMIN", "ROLE_CUSTOMER"]},
    {name: "Done", value:"DONE", role:["ROLE_ADMIN", "ROLE_CUSTOMER"]},
    {name: "Assigned", value:"ASSIGNED", role:["ROLE_ADMIN"]},
    {name: "Not Assigned", value:"PENDING", role:["ROLE_ADMIN"]},
    {name: "Create New Task", value:"", role:["ROLE_ADMIN", "ROLE_ADMIN"]},
    {name: "Notification", value:"NOTIFICATION", role:["ROLE_CUSTOMER"]}
]
const role = "ROLE_ADMIN";
const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState("Home");
    const [openCreateTaskForm, setOpenCreateTaskForm] = React.useState(false);
    const handleCloseUpdateTaskForm = () => {
        setOpenCreateTaskForm(false);
    }
    const handleOpenUpdateTaskModal = () => {
        setOpenCreateTaskForm(true);
    }
    const handleMenuChange = (item) =>{
        if(item.name==="Create New Task"){
           handleOpenUpdateTaskModal()
        }
        setActiveMenu(item.name);
    }
    const handleLogout = () => {
        // Add logout logic here
        console.log("handleLogout")
    }
  return (
    <>
    <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]'>
      <div className='space-y-5 h-full'>
        <div className='flex justify-center'>
            <Avatar sx={{width:"8rem", height:"8rem"}}
            src='https://avatars.githubusercontent.com/u/25025057?v=4'
            className='border-2 border-[#c24dd0]'
            />
        </div>
        
        {
            menu.filter((item) => item.role.includes(role)).map((item) =>
                <p  onClick={()=> handleMenuChange(item)}
            className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu === item.name?
                    "activeMenuItem": "MenuItem"
                }`}>
                    {item.name}
                    </p>
            )
        }

        <Button  sx={{padding: "0.7rem", borderRadius: "2rem"}} onClick={handleLogout}
        fullWidth className='logoutButton'>
            Logout
        </Button>
      </div>
    </div>
    <CreateTask open={openCreateTaskForm} handleClose={handleCloseUpdateTaskForm}/>
    </>
  )
}

export default Sidebar