package com.prvijay.studentmanagement.attendance;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.List;

public interface AttendanceRepository extends MongoRepository<AttendanceRecord, String> {

    List<AttendanceRecord> findByStudentId(String studentId);

    List<AttendanceRecord> findByStudentIdAndDateBetween(String studentId,
                                                         LocalDate start,
                                                         LocalDate end);
}
