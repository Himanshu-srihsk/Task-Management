import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from "../../UserList";
import SubmissionList from "./SubmissionList";
import EditTaskForm from "./EditTaskForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../Store/TaskSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SubmitFormModal from "../SubmitFormModal";

const TaskCard = ({item}) => {
    const dispatch = useDispatch();
    const  location = useLocation();
    const navigate = useNavigate();
    const {auth} = useSelector(store => store);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const role = "ROLE_ADMIN";

    const [openUserList, setOpenUserList] = useState(false);
    const handleCloseUserList = () => {
        setOpenUserList(false);
    }

   
    

    const handleOpenUserList = () => {

        const updatedParams = new URLSearchParams(location.search)
        
        updatedParams.set("taskId", item.id)
            const queryString = updatedParams.toString();
            const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
            navigate(updatePath);

        setOpenUserList(true);
        handleMenuClose()
    }
    const [openSubmissionList, setOpenSubmissionList] = useState(false);
    const handleCloseSubmissionList = () => {
        setOpenSubmissionList(false);
    }

    const handleOpenSubmissionList = () => {
        const updatedParams = new URLSearchParams(location.search)
        
        updatedParams.set("taskId", item.id)
            const queryString = updatedParams.toString();
            const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
            navigate(updatePath);

        setOpenSubmissionList(true);
        handleMenuClose();
    }

    const [openUpdateTaskForm, setOpenUpdateTaskForm] = useState(false);
    const handleCloseUpdateTaskForm = () => {
        setOpenUpdateTaskForm(false);
    }
    const handleRemoveTaskIdParams = () =>{
        const updatedParams = new URLSearchParams(location.search)
        updatedParams.delete("filter")
           const queryString = updatedParams.toString();
           const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
           navigate(updatePath);
    }
    const handleOpenUpdateTaskModal = () => {
        const updatedParams = new URLSearchParams(location.search)
        
        updatedParams.set("taskId", item.id)
            const queryString = updatedParams.toString();
            const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
            navigate(updatePath);
            setOpenUpdateTaskForm(true);
        handleMenuClose();
    }

    const handleDeleteTask = () => {
        dispatch(deleteTask(item.id))
       handleMenuClose();
    }


    const [openSubmitFormModal, setOpenSubmitFormModal] = useState(false);
    const handleCloseSubmitFormModal = () => {
        setOpenSubmitFormModal(false);
    }

    const handleOpenSubmitFormModal = () => {
        const updatedParams = new URLSearchParams(location.search)
        
        updatedParams.set("taskId", item.id)
            const queryString = updatedParams.toString();
            const updatePath = queryString?`${location.pathname}?${queryString}`: location.pathname;
            navigate(updatePath);

            setOpenSubmitFormModal(true);
        handleMenuClose();
    }

    return (
        <div className="relative card lg:flex justify-between p-4 shadow-lg rounded-md">
            {/* MoreVertIcon positioned in the top-right corner */}
            <div className="absolute top-2 right-2">
                <IconButton 
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleMenuClick}
                >
                    <MoreVertIcon />
                </IconButton>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {auth.user?.role === "ROLE_ADMIN" ? (
                        <>
                            <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                            <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
                            <MenuItem onClick={handleOpenUpdateTaskModal}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
                        </>
                    ): (
                        <>
                        <MenuItem onClick={handleOpenSubmitFormModal}>Submit</MenuItem>
                        </>
                    )
                    }
                </Menu>
            </div>

            <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
                <div className="">
                    <img 
                        className="lg:w-[7rem] lg:h-[7rem] object-cover"
                        src={item.image} 
                        alt=""
                    />
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <h1 className="font-bold text-lg">{item.title}</h1>
                        <p className="text-gray-500 text-sm">
                           {item.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        {item.tags.map((item, index) => (
                            <span key={index} className="py-1 px-5 rounded-full techStack">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <UserList open={openUserList} handleClose={handleCloseUserList} />
            <SubmissionList open={openSubmissionList} handleClose={handleCloseSubmissionList} />
            <EditTaskForm item= {item} open={openUpdateTaskForm} handleClose={handleCloseUpdateTaskForm} />
            <SubmitFormModal open={openSubmitFormModal} handleClose={SubmitFormModal}/>
        </div>
    );
};

export default TaskCard;
