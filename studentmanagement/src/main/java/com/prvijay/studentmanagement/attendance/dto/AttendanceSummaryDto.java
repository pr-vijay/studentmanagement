package com.prvijay.studentmanagement.attendance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AttendanceSummaryDto {

    private String studentId;
    private int year;
    private int month;

    private long totalClasses;
    private long present;
    private long absent;
    private long late;

    private double percentage;  // (present / totalClasses) * 100
}
