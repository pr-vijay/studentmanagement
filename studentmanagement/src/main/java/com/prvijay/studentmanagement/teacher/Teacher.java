package com.prvijay.studentmanagement.teacher;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "teachers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    private String id;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Name can contain only letters and spaces")
    private String name;

    @NotBlank
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone must be a valid 10-digit Indian mobile number")
    private String phone;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z]{2,10}$", message = "Department must be alphabetic (e.g. CSE, IT)")
    private String department;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9 ]{2,30}$", message = "Subject must be 2-30 alphanumeric characters")
    private String subject;

    @NotNull
    @Positive(message = "Salary must be positive")
    private Double monthlySalary;

    @NotNull
    @Min(value = 0, message = "Paid leaves cannot be negative")
    @Max(value = 60, message = "Paid leaves cannot exceed 60 days")
    private Integer paidLeavesPerYear;

    @NotNull
    @Min(value = 0, message = "Used paid leaves cannot be negative")
    private Integer usedPaidLeaves;

    @NotNull
    @Min(value = 0, message = "Unpaid leaves cannot be negative")
    private Integer unpaidLeaves;

    @NotNull
    private Boolean active;

    @NotNull
    private LocalDate dateOfJoining;
}
