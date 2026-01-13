package com.prvijay.studentmanagement.attendance;

import com.prvijay.studentmanagement.attendance.MarkAttendanceRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import com.prvijay.studentmanagement.attendance.dto.AttendanceSummaryDto;
@Service
public class AttendanceService {

    private final AttendanceRepository repo;

    public AttendanceService(AttendanceRepository repo) {
        this.repo = repo;
    }

    public AttendanceRecord markAttendance(MarkAttendanceRequest req) {
        LocalDate date = LocalDate.parse(req.getDate()); // expects "yyyy-MM-dd"

        AttendanceRecord record = AttendanceRecord.builder()
                .studentId(req.getStudentId())
                .date(date)
                .subject(req.getSubject())
                .status(req.getStatus())
                .build();

        return repo.save(record);
    }

    public List<AttendanceRecord> getAttendanceForStudent(String studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<AttendanceRecord> getAttendanceForStudentInMonth(
            String studentId, int year, int month) {

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        return repo.findByStudentIdAndDateBetween(studentId, start, end);
    }
    public AttendanceSummaryDto getSummaryForStudentInMonth(
            String studentId, int year, int month) {

        List<AttendanceRecord> records =
                getAttendanceForStudentInMonth(studentId, year, month);

        long total = records.size();
        long present = records.stream()
                .filter(r -> "PRESENT".equalsIgnoreCase(r.getStatus()))
                .count();
        long absent = records.stream()
                .filter(r -> "ABSENT".equalsIgnoreCase(r.getStatus()))
                .count();
        long late = records.stream()
                .filter(r -> "LATE".equalsIgnoreCase(r.getStatus()))
                .count();

        double percentage = total == 0 ? 0.0 : (present * 100.0) / total;

        return new AttendanceSummaryDto(
                studentId, year, month,
                total, present, absent, late,
                percentage
        );
    }

}
