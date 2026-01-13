package com.prvijay.studentmanagement.report;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface MonthlyReportRepository extends MongoRepository<MonthlyReport, String> {

    List<MonthlyReport> findByStudentId(String studentId);

    Optional<MonthlyReport> findByStudentIdAndYearAndMonth(String studentId, int year, int month);
}
