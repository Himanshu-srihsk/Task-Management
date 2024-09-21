package com.fun.service;

import com.fun.model.Task;
import com.fun.model.TaskStatus;

import java.util.List;

public interface TaskService {
    Task createTask(Task task, String requesterRole) throws Exception;
    Task getTaskById(Long taskId) throws Exception;
    List<Task>  getAllTask(TaskStatus status) throws Exception;
    Task updateTask(Long id, Task updatedTtask, Long userId) throws Exception;
    void deleteTask(Long id) throws Exception;
    Task assignedToUser(Long userId, Long taskId) throws Exception;
    List<Task> assignedUsersTask(Long userId, TaskStatus status) throws Exception;
    Task completedTask(Long taskId) throws Exception;
}
