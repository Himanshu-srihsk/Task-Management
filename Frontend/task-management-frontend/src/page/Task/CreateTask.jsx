
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch } from 'react-redux';
import { createTask } from '../../Store/TaskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

const tags = ["Angular", "React", "Vuejs", "Spring Boot", "Node js", "Python", "Flask", "Django"];

export default function CreateTask({handleClose, open}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    title:"",
    image:"",
    description:"",
    tags:[],
    deadline: new Date()
  })

  const [selectedTags, setSelectedTags] = React.useState([]);
    
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleTagsChange = (event, value) => {
     setSelectedTags(value);
  }
  const handleDeadlineChange =(date) =>{
    setFormData({
      ...formData,
      deadline: date
    })
  }
  const formatDate = (input) =>{
    let{
      $y: year,
      $M: month,
      $D: day,
      $H: hours,
      $m: minutes,
      $s: seconds,
      $ms: milliseconds
    } = input;

    const date = new Date(year,month,day,hours,minutes,seconds,milliseconds);
    const formatedDate = date.toISOString();
    return formatedDate;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const {deadline} = formData;
    formData.deadline = formatDate(deadline)
    formData.tags = selectedTags
    dispatch(createTask(formData));
    console.log("formData",formData, "deadline: ",formData.deadline );
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
                  label="Title"
                  fullWidth
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  />
             </Grid>

             <Grid item xs={12}>
                  <TextField 
                  label="Image"
                  fullWidth
                  name='image'
                  value={formData.image}
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
              <Autocomplete
              multiple
              id='multiple-limit-tags'
              options={tags}
              onChange={handleTagsChange}
              getOptionLabel={(option)=> option}
              renderInput={(params) =><TextField 
                label="Tags"
                fullWidth
                {...params}
                />}
              />
                  
             </Grid>

             <Grid item xs={12}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker onChange={handleDeadlineChange}
                renderInput={(params) =>
                  <TextField {...params} />
                }
                className='w-full' label="Deadline" />
            </LocalizationProvider>
             </Grid>
             <Grid item xs={12}>
              <Button  fullWidth className='customButton' type='submit' sx={{padding:"0.9rem"}}>
                Create Task
              </Button>
             </Grid>

          </Grid>
         </form>
        </Box>
      </Modal>
    </div>
  );
}