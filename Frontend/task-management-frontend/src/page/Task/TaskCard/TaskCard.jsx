import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from "../../UserList";
import SubmissionList from "./SubmissionList";
import EditTaskForm from "./EditTaskForm";

const TaskCard = () => {
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

    const [openSubmissionList, setOpenSubmissionList] = useState(false);
    const handleCloseSubmissionList = () => {
        setOpenSubmissionList(false);
    }

    const [openUpdateTaskForm, setOpenUpdateTaskForm] = useState(false);
    const handleCloseUpdateTaskForm = () => {
        setOpenUpdateTaskForm(false);
    }

    const handleOpenUserList = () => {
        setOpenUserList(true);
    }
    const handleOpenSubmissionList = () => {
        setOpenSubmissionList(true);
    }
    const handleOpenUpdateTaskModal = () => {
        setOpenUpdateTaskForm(true);
        handleMenuClose();
    }

    const handleDeleteTask = () => {
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
                    {role === "ROLE_ADMIN" && (
                        <>
                            <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                            <MenuItem onClick={handleOpenSubmissionList}>See Submissions</MenuItem>
                            <MenuItem onClick={handleOpenUpdateTaskModal}>Edit</MenuItem>
                            <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
                        </>
                    )}
                </Menu>
            </div>

            <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
                <div className="">
                    <img 
                        className="lg:w-[7rem] lg:h-[7rem] object-cover"
                        src="https://cdn.pixabay.com/photo/2023/10/24/05/08/dog-8337394_640.jpg" 
                        alt="Animal Care"
                    />
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <h1 className="font-bold text-lg">Animal Care</h1>
                        <p className="text-gray-500 text-sm">
                            This task involves cleaning, feeding, and grooming pets. You will need to keep them hydrated, comfortable, and healthy.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        {[1,1,1].map((item, index) => (
                            <span key={index} className="py-1 px-5 rounded-full techStack">
                                React
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <UserList open={openUserList} handleClose={handleCloseUserList} />
            <SubmissionList open={openSubmissionList} handleClose={handleCloseSubmissionList} />
            <EditTaskForm open={openUpdateTaskForm} handleClose={handleCloseUpdateTaskForm} />
        </div>
    );
};

export default TaskCard;
