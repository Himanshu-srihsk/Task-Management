import React from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Button, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const SubmissionCard = () => {
    const handleAcceptDecline = (status) =>{
        // API Call to accept or decline submission
        console.log(status);
    }
  return (
    <div className="rounded-md bg-black p-5 flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span>Github:</span>
          <div className="flex items-center gap-2 text-[#c24dd0]">
            <OpenInNewIcon />
            <a
              href="https://github.com/Himanshu-Kumar-Kishore/Task-management-Project"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go to Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <p>Submission Time:</p>
          <p className="text-gray-400"> 2024-09-22T11:30:45.123</p>
        </div>
      </div>

      <div>
        {true ? (
          <div className="flex gap-5">
            <div className="text-green-500">
                <IconButton color="success" onClick={()=> handleAcceptDecline("ACCEPTED")}>
                    <CheckIcon />
                </IconButton>
            </div>
            <div className="text-red-500">
            <IconButton color="error" onClick={()=> handleAcceptDecline("DECLINED")}>
                    <CloseIcon />
                </IconButton>
            </div>
          </div>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color={true ? "success" : "error"}
          >
            Accept
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionCard;
