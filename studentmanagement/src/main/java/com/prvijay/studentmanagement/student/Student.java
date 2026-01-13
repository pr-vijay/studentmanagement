package com.prvijay.studentmanagement.student;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "students")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    private String id;

    @NotBlank(message = "Admission number is required")
    private String admissionNumber;

    @NotBlank(message = "First name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "First name can contain only letters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Last name can contain only letters")
    private String lastName;

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be a valid 10-digit Indian mobile number")
    private String phone;

    @NotBlank(message = "Class name is required")
    private String className;

    @NotBlank(message = "Section is required")
    private String section;

    @NotBlank(message = "Standard is required")
    private String standard;

    @NotBlank(message = "Stream is required")
    private String stream;

    @NotBlank(message = "Department is required")
    private String department;

    @NotNull(message = "Current year is required")
    private String currentYear;

    @NotNull(message = "Current semester is required")
    private String currentSemester;

    private LocalDate dateOfBirth;

    @NotNull
    private Boolean active;
}
