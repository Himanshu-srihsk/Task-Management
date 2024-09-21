package com.fun.repository;

import com.fun.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepo extends JpaRepository<Task, Long> {
    // Additional methods for task operations
    public List<Task> findByAssignedUserId(Long userId);
}
