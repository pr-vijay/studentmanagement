package com.prvijay.studentmanagement.attendance;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
@Data
public class MarkAttendanceRequest {
    @NotNull
    private String studentId;
    @NotNull
    private String date;
    @NotNull// "2025-01-15"
    private String subject;
    @NotNull// e.g. "Maths"
    private String status;   // PRESENT, ABSENT, LATE
}
