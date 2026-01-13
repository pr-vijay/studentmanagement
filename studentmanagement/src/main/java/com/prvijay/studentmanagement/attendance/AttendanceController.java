package com.prvijay.studentmanagement.attendance;


import com.prvijay.studentmanagement.attendance.MarkAttendanceRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.prvijay.studentmanagement.attendance.dto.AttendanceSummaryDto;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AttendanceController {

    private final AttendanceService service;

    public AttendanceController(AttendanceService service) {
        this.service = service;
    }

    // Mark attendance for a student
    @PostMapping
    public AttendanceRecord markAttendance(@Valid @RequestBody MarkAttendanceRequest req) {
        return service.markAttendance(req);
    }

    // Get full attendance history for a student
    @GetMapping
    public List<AttendanceRecord> getForStudent(@RequestParam String studentId) {
        return service.getAttendanceForStudent(studentId);
    }

    // Get attendance for a particular month
    @GetMapping("/monthly")
    public List<AttendanceRecord> getForStudentInMonth(
            @RequestParam String studentId,
            @RequestParam int year,
            @RequestParam int month) {
        return service.getAttendanceForStudentInMonth(studentId, year, month);
    }
    // Get summary (counts + percentage) for a month
    @GetMapping("/summary")
    public AttendanceSummaryDto getSummary(
            @RequestParam String studentId,
            @RequestParam int year,
            @RequestParam int month) {
        return service.getSummaryForStudentInMonth(studentId, year, month);
    }

}
