package com.prvijay.studentmanagement.course;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CourseRepository extends MongoRepository<Course, String> {
    boolean existsByCourseCode(String courseCode);
}
