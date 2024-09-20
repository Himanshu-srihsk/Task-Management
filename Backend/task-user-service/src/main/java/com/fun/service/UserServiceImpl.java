package com.fun.service;

import com.fun.config.JwtProvider;
import com.fun.model.User;
import com.fun.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtProvider jwtProvider;


    @Override
    public User getUserProfile(String jwt) {
        String email = jwtProvider.getEmailFromToken(jwt);
        return userRepo.findByEmail(email);
    }

    @Override
    public List<User> getAllUser() {
        return userRepo.findAll();
    }
}
