package com.prvijay.studentmanagement.report;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ReportController {

    private final ReportService service;

    public ReportController(ReportService service) {
        this.service = service;
    }

    // Generate report for one student (manual trigger)
    @PostMapping("/student")
    public MonthlyReport generateForStudent(
            @RequestParam String studentId,
            @RequestParam int year,
            @RequestParam int month) {
        return service.generateReportForStudent(studentId, year, month);
    }

    // Generate reports for all students (admin trigger)
    @PostMapping("/all")
    public void generateForAll(
            @RequestParam int year,
            @RequestParam int month) {
        service.generateReportsForAllStudents(year, month);
    }

    // View all reports of a student
    @GetMapping
    public List<MonthlyReport> getForStudent(@RequestParam String studentId) {
        return service.getReportsForStudent(studentId);
    }
}
