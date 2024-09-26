package com.fun.service;

import com.fun.model.Task;
import com.fun.model.TaskStatus;
import com.fun.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService{
    @Autowired
    private TaskRepo taskRepo;

    @Override
    public Task createTask(Task task, String requesterRole) throws Exception {
        if(!requesterRole.equals("ROLE_ADMIN")){
            throw  new Exception("Only Admin are allowed to create tasks");
        }
        task.setStatus(TaskStatus.PENDING);
        task.setCreatedAt(LocalDateTime.now());

        return taskRepo.save(task);
    }

    @Override
    public Task getTaskById(Long taskId) throws Exception {
        return taskRepo.findById(taskId).orElseThrow(()-> new Exception("task not found with Id"+taskId));
    }

    @Override
    public List<Task> getAllTask(TaskStatus status) throws Exception {
        List<Task> tasks = taskRepo.findAll();
        List<Task> filteredTasks = tasks.stream().filter(task -> status==null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());
        return filteredTasks;
    }

    @Override
    public Task updateTask(Long id, Task updatedTtask, Long userId) throws Exception {
        Task task = taskRepo.findById(id).orElseThrow(()-> new Exception("Task not found with Id"+id));
        if(updatedTtask.getTitle() !=null){
            task.setTitle(updatedTtask.getTitle());
        }
        if(updatedTtask.getImage()!=null){
            task.setImage(updatedTtask.getImage());
        }
        if(updatedTtask.getDescription()!=null){
            task.setDescription(updatedTtask.getDescription());
        }
        if(updatedTtask.getStatus()!=null){
            task.setStatus(updatedTtask.getStatus());
        }
        if(updatedTtask.getDeadline()!=null){
            task.setDeadline(updatedTtask.getDeadline());
        }
        if(updatedTtask.getTags()!=null){
            task.setTags(updatedTtask.getTags());
        }
        return taskRepo.save(task);
    }

    @Override
    public void deleteTask(Long id) throws Exception {
        getTaskById(id);
        taskRepo.deleteById(id);
    }

    @Override
    public Task assignedToUser(Long userId, Long taskId) throws Exception {
        Task task = getTaskById(taskId);
        task.setAssignedUserId(userId);
        task.setStatus(TaskStatus.DONE);
        return taskRepo.save(task);
    }

    @Override
    public List<Task> assignedUsersTask(Long userId, TaskStatus status) throws Exception {
        List<Task> allTasks = taskRepo.findByAssignedUserId(userId);
        List<Task> filteredTasks = allTasks.stream().filter(task -> status==null || task.getStatus().name().equalsIgnoreCase(status.toString()))
                .collect(Collectors.toList());
        return filteredTasks;
    }

    @Override
    public Task completedTask(Long taskId) throws Exception {
        Task task = getTaskById(taskId);
        task.setStatus(TaskStatus.DONE);

        return taskRepo.save(task);
    }
}
