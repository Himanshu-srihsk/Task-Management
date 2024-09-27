package com.fun.controller;

import com.fun.request.LoginRequest;
import com.fun.Response.AuthResponse;
import com.fun.config.JwtProvider;
import com.fun.model.User;
import com.fun.repository.UserRepo;
import com.fun.service.CustomUserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserRepo userRepository;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserServiceImpl customUserDetails;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws Exception {
        User isEmailExist = userRepository.findByEmail(user.getEmail());
        if(isEmailExist!=null) {
            throw new Exception("EMail is already  used with another Account");
        }
        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setRole(user.getRole());

        User savedUser =userRepository.save(createdUser);


//        List<GrantedAuthority> authorities=new ArrayList<>();
//
//        authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));


        Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Register Success");
        authResponse.setStatus(true);
//        authResponse.setRole(savedUser.getRole());

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest req) {
        try {
            String username = req.getEmail();
            String password = req.getPassword();

            Authentication authentication = authenticate(username, password);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtProvider.generateToken(authentication);
            AuthResponse response = new AuthResponse();
            response.setJwt(token);
            response.setMessage("Logged in Successfully");
            response.setStatus(true);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            AuthResponse response = new AuthResponse();
            response.setMessage("Invalid email or password");
            response.setStatus(false);
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
    }

    private Authentication authenticate(String username, String password) {
        UserDetails userDetails =  customUserDetails.loadUserByUsername(username);
        if(userDetails==null) {
            throw new BadCredentialsException("Invalid Username");
        }
        if(!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
