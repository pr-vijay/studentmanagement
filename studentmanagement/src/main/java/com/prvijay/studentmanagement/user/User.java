package com.prvijay.studentmanagement.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private String id;

    private String username;      // login id
    private String passwordHash;  // BCrypt
    private String role;          // ADMIN, TEACHER, STUDENT
    private String studentId;     // link to Student.id if role=STUDENT (optional)

    // --- profile fields ---
    private String fullName;         // e.g. "Admin Principal"
    private String about;            // admin bio for profile section
    private String profileImageUrl;  // e.g. "/uploads/users/<id>.jpg"
}
