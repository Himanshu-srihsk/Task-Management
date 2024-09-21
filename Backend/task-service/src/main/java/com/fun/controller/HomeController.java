package com.fun.controller;

import com.fun.model.Task;
import com.fun.model.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @GetMapping("/tasks")
    public ResponseEntity<String> createTask(
            ) {

        return new ResponseEntity<>("Welcome to Task Service", HttpStatus.OK);

    }
}
