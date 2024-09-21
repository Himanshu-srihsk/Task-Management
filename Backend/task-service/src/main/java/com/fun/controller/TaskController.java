package com.fun.controller;

import com.fun.model.Task;
import com.fun.model.TaskStatus;
import com.fun.model.UserDto;
import com.fun.service.TaskService;
import com.fun.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    TaskService taskService;
    @Autowired
    private UserService userService;

    // Add CRUD methods for tasks here
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task, @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.getUserProfile(jwt);
        Task createdTask = taskService.createTask(task,userDto.getRole());
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);

    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById( @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.getUserProfile(jwt);
        Task task = taskService.getTaskById(id);
        return new ResponseEntity<>(task, HttpStatus.OK);

    }

    @GetMapping("/user")
    public ResponseEntity<List<Task>> getAssignedUsersTask(
            @RequestParam(required = false) TaskStatus status,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.getUserProfile(jwt);
        List<Task> tasks = taskService.assignedUsersTask(userDto.getId(), status);
        return new ResponseEntity<>(tasks, HttpStatus.OK);

    }

    @GetMapping()
    public ResponseEntity<List<Task>> getAllTasks(
            @RequestParam(required = false) TaskStatus status,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.getUserProfile(jwt);
        List<Task> tasks = taskService.getAllTask(status);
        return new ResponseEntity<>(tasks, HttpStatus.OK);

    }

    @PutMapping("/{id}/user/{userId}/assigned")
    public ResponseEntity<Task> assignedTaskToUser(
            @PathVariable Long id,
            @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.getUserProfile(jwt);
        Task task = taskService.assignedToUser(userId, id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task req,
            @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto = userService.getUserProfile(jwt);
        Task task = taskService.updateTask(id, req, userDto.getId());
        return new ResponseEntity<>(task, HttpStatus.OK);
    }
    @PutMapping("/{id}/complete")
    public ResponseEntity<Task> completedTask(
            @PathVariable Long id
            ) throws Exception {
        Task task = taskService.completedTask(id);
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id
    ) throws Exception {
        taskService.deleteTask(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
