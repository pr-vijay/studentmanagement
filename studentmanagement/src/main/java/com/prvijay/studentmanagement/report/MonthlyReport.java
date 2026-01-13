package com.prvijay.studentmanagement.report;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "monthly_reports")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MonthlyReport {

    @Id
    private String id;

    private String studentId;

    private int year;
    private int month;

    private long totalClasses;
    private long present;
    private long absent;
    private long late;
    private double percentage;

    private boolean emailed;       // later for email feature
}
