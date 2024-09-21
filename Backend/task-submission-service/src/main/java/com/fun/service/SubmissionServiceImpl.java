package com.fun.service;

import com.fun.model.Submission;
import com.fun.model.TaskDto;
import com.fun.repository.SubmissionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
@Service
public class SubmissionServiceImpl implements SubmissionService{
    @Autowired
    private SubmissionRepo submissionRepo;
    @Autowired
    private TaskService taskService;
    @Autowired
    private UserService userService;

    @Override
    public Submission submitTask(Long taskId, String githubLink, Long userId, String jwt) throws Exception {
        TaskDto taskDto = taskService.getTaskById(taskId, jwt);
        if(taskDto!=null){
            Submission submission = new Submission();
            submission.setGithubLink(githubLink);
            submission.setUserId(userId);
            submission.setTaskId(taskId);
            submission.setSubmissionTime(LocalDateTime.now());
            submission = submissionRepo.save(submission);
            return submission;
        }
        throw new Exception("Task not found with id"+ taskId);
    }

    @Override
    public Submission getTaskSubmissionbyId(Long submissionId) throws Exception {

        return submissionRepo.findById(submissionId).orElseThrow(()-> new Exception("Task submission not found with id"+submissionId));
    }

    @Override
    public List<Submission> getAllTaskSubmissions() throws Exception {
        return submissionRepo.findAll();
    }

    @Override
    public List<Submission> getTaskSubmissionsByTaskId(Long taskId) throws Exception {
        return submissionRepo.findByTaskId(taskId);
    }

    @Override
    public Submission acceptDeclineSubmission(Long id, String status) throws Exception {
        Submission submission = getTaskSubmissionbyId(id);
        submission.setStatus(status);
        if(status.equalsIgnoreCase("accept")){
            taskService.completedTask(submission.getTaskId());
        }

        return submissionRepo.save(submission);
    }
}
