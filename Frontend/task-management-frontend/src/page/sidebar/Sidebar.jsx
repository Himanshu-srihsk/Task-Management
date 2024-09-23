import { Avatar, Button } from '@mui/material'
import React, { useState } from 'react'
import "./Sidebar.css"
import CreateTask from '../Task/CreateTask';
import { useLocation, useNavigate } from 'react-router-dom';
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
    const location = useLocation();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState("Home");
    const [openCreateTaskForm, setOpenCreateTaskForm] = React.useState(false);
    const handleCloseUpdateTaskForm = () => {
        setOpenCreateTaskForm(false);
    }
    const handleOpenUpdateTaskModal = () => {
        setOpenCreateTaskForm(true);
    }
    const handleMenuChange = (item) =>{
        const updatedParams= new URLSearchParams(location.search);
        if(item.name==="Create New Task"){
           handleOpenUpdateTaskModal()
        }
        else if(item.name==="Home"){
           updatedParams.delete("filter")
           const queryString = updatedParams.toString();
           const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
           navigate(updatePath);
        }else{
            updatedParams.set("filter", item.value)
            const queryString = updatedParams.toString();
            const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
            navigate(updatePath);

            // // Add logic to update task status here
            // console.log("Update Task Status", item.value)

            // // Add logic to fetch updated task list here
            // console.log("Fetch updated task list")

            // // Add logic to set new active menu here
            // console.log("Set new active menu", item.name)

            // // Add logic to update task status in task list here
            // console.log("Update task status in task list", item.value)

            // // Add logic to fetch updated task list in task list here
            // console.log("Fetch updated task list in task list")

            // // Add logic to set new active menu in task list here
            // console.log("Set new active menu in task list", item.
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