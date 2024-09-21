package com.fun.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    Long id;
    private String password;
    private String email;
    private String role;
    private String fullName;
}
