import React, { useEffect } from 'react'
import TaskCard from '../Task/TaskCard/TaskCard'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, fetchUsersTasks } from '../../Store/TaskSlice';
import { useLocation } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();


  const {task, auth} = useSelector(store => store)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = queryParams.get('filter');
  console.log("filterValue", filterValue)




  useEffect(()=> {
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks({status: filterValue}))
    }else{
      dispatch(fetchUsersTasks({status:filterValue}))
    }
   
  },[filterValue])

  // console.log("task", task)

  return (
    <div className='w-[67vw]'>
     <div className='space-y-3'>
     {
       auth.user?.role==="ROLE_ADMIN"? task.tasks.map((item) => <TaskCard item={item}/>) 
       : task.usersTask.map((item) => <TaskCard item={item}/>)
     }
     </div>
    </div>
  )
}

export default TaskList