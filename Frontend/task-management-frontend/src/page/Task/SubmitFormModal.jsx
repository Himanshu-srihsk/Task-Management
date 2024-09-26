
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { submitTask } from '../../Store/SubmissionSlice';
import { updateTask } from '../../Store/TaskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SubmitFormModal({item, handleClose, open}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get('taskId');


  const {task} = useSelector(store => store);
  const [formData, setFormData] = React.useState({
    githubLink:"",
    description:"",
  })

  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }


  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const {deadline} = formData;
  
  //   dispatch(updateTask({id: taskId, updatedTaskData: formData}))
  //   handleClose();
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("formData is:"+ formData);
    dispatch(submitTask({taskId: taskId, githubLink: formData.githubLink}))
    handleClose();
  }

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
             <Grid item xs={12}>
                  <TextField 
                  label="githubLink"
                  fullWidth
                  name='githubLink'
                  value={formData.githubLink}
                  onChange={handleChange}
                  />
             </Grid>

             <Grid item xs={12}>
                  <TextField 
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  />
             </Grid>

             <Grid item xs={12}>
              <Button  fullWidth className='customButton' type='submit' sx={{padding:"0.9rem"}}>
                Submit
              </Button>
             </Grid>

          </Grid>
         </form>
        </Box>
      </Modal>
    </div>
  );
}