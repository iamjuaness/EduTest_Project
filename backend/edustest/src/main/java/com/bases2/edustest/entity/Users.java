package com.bases2.edustest.entity;

import jakarta.persistence.Id;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Users {
    @Id
    private int userId;
    private int roleId;
    private int locationId;
    private String userEmail;
    private String firstName;
    private String lastName;
    private String password;
}