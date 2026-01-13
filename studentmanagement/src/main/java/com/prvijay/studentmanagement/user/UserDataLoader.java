package com.prvijay.studentmanagement.user;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserDataLoader implements CommandLineRunner {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserDataLoader(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (repo.findByUsername("admin").isEmpty()) {
            repo.save(User.builder()
                    .username("admin")
                    .passwordHash(encoder.encode("admin123"))
                    .role("ADMIN")
                    .build());
        }

        if (repo.findByUsername("teacher").isEmpty()) {
            repo.save(User.builder()
                    .username("teacher")
                    .passwordHash(encoder.encode("teacher123"))
                    .role("TEACHER")
                    .build());
        }
        if (repo.findByUsername("admin").isEmpty()) {
            repo.save(User.builder()
                    .username("admin")
                    .passwordHash(encoder.encode("admin123"))
                    .role("ADMIN")
                    .fullName("Admin Principal")
                    .about("Admin of PRVijay School Management System, managing students, teachers and attendance.")
                    .build());
        }

    }
}