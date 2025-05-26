package com.bases2.edustest.controller;

import com.bases2.edustest.dto.LoginRequest;
import com.bases2.edustest.entity.Users;
import com.bases2.edustest.repository.UsersImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UsersController {

    private final UsersImpl usersImpl;


    public UsersController(UsersImpl usersImpl) {
        this.usersImpl = usersImpl;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Users user = usersImpl.login(request.getUserEmail(), request.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Collections.singletonMap("message", "Invalid credentials"));
        }
    }

    @GetMapping("/questions")
    public ResponseEntity<?> getQuestions() {
        try {
            List<Map<String, Object>>  questions = usersImpl.getQuestions();
            return ResponseEntity.ok(questions);
        } catch (Exception e) {
            e.printStackTrace(); // Esto lo verás en la consola/log
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}
