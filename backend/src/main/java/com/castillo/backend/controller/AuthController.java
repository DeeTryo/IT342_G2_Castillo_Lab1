package com.castillo.backend.controller;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.castillo.backend.entity.User;
import com.castillo.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static class AuthRequest {
        public String email;
        public String password;
        public String firstName;
        public String lastName;
    }

    // --- REGISTER ---
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AuthRequest request) {
        if (userRepository.findByEmail(request.email).isPresent()) {
            return ResponseEntity.badRequest().body("Email is already registered");
        }

        User newUser = new User();
        newUser.setEmail(request.email);
        newUser.setPassword(passwordEncoder.encode(request.password)); // Hash it!
        newUser.setFirstName(request.firstName);
        newUser.setLastName(request.lastName);

        userRepository.save(newUser);
        return ResponseEntity.ok("User registered successfully");
    }

    // --- LOGIN ---
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {
        Optional<User> userOptional = userRepository.findByEmail(request.email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(request.password, user.getPassword())) {
                user.setLast_login(java.time.LocalDateTime.now());
                userRepository.save(user);
                return ResponseEntity.ok("Login Successful");
            }
        }
        
        return ResponseEntity.status(401).body("Invalid email or password");
    }
}