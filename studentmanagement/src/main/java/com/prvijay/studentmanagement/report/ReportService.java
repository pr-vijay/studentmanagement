package com.prvijay.studentmanagement.report;

import com.prvijay.studentmanagement.attendance.AttendanceService;
import com.prvijay.studentmanagement.attendance.dto.AttendanceSummaryDto;
import com.prvijay.studentmanagement.email.EmailService;
import com.prvijay.studentmanagement.student.Student;
import com.prvijay.studentmanagement.student.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final MonthlyReportRepository reportRepo;
    private final AttendanceService attendanceService;
    private final StudentRepository studentRepo;
    private final EmailService emailService;

    public ReportService(MonthlyReportRepository reportRepo,
                         AttendanceService attendanceService,
                         StudentRepository studentRepo,
                         EmailService emailService) {
        this.reportRepo = reportRepo;
        this.attendanceService = attendanceService;
        this.studentRepo = studentRepo;
        this.emailService = emailService;
    }

    // Generate report for one student and send email
    public MonthlyReport generateReportForStudent(String studentId, int year, int month) {
        // 1. Get attendance summary
        AttendanceSummaryDto summary =
                attendanceService.getSummaryForStudentInMonth(studentId, year, month);

        // 2. Build and save MonthlyReport
        MonthlyReport report = MonthlyReport.builder()
                .studentId(studentId)
                .year(year)
                .month(month)
                .totalClasses(summary.getTotalClasses())
                .present(summary.getPresent())
                .absent(summary.getAbsent())
                .late(summary.getLate())
                .percentage(summary.getPercentage())
                .emailed(false)
                .build();

        report = reportRepo.save(report);

        // 3. Fetch student email
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // 4. Prepare email content
        String subject = "Monthly Attendance Report - " + month + "/" + year;
        String body = String.format(
                "Hello %s,\n\n" +
                        "Attendance summary for %d/%d:\n" +
                        "Total classes: %d\n" +
                        "Present: %d\n" +
                        "Absent: %d\n" +
                        "Late: %d\n" +
                        "Percentage: %.2f%%\n\n" +
                        "Regards,\nStudent Management System",
                student.getFirstName(),
                month, year,
                report.getTotalClasses(),
                report.getPresent(),
                report.getAbsent(),
                report.getLate(),
                report.getPercentage()
        );

        // 5. Send email
        emailService.sendSimpleMail(student.getEmail(), subject, body);

        // 6. Mark as emailed and save again
        report.setEmailed(true);
        return reportRepo.save(report);
    }

    // Generate reports for all students (no return, just process)
    public void generateReportsForAllStudents(int year, int month) {
        List<Student> students = studentRepo.findAll();
        for (Student s : students) {
            generateReportForStudent(s.getId(), year, month);
        }
    }

    // Get all reports for a student
    public List<MonthlyReport> getReportsForStudent(String studentId) {
        return reportRepo.findByStudentId(studentId);
    }
}