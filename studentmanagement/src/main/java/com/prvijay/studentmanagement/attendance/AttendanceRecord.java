package com.prvijay.studentmanagement.attendance;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Document(collection = "attendance_records")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttendanceRecord {
    @Id
    private String id;

    @NotNull
    private String studentId;

    @NotNull
    private LocalDate date;

    @NotNull
    private Boolean present;

    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9 .]{2,50}$", message = "Subject must be 2-50 alphanumeric characters")
    private String subject;

    @NotBlank
    @Pattern(regexp = "^(PRESENT|ABSENT|LATE)$", message = "Status must be PRESENT, ABSENT or LATE")
    private String status;
}
