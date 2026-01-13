package com.prvijay.studentmanagement.course;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CourseService {
    private final CourseRepository repo;

    public CourseService(CourseRepository repo) {
        this.repo = repo;
    }

    public List<Course> getAll() {
        return repo.findAll();
    }

    public long count() {
        return repo.count();
    }

    public Course create(Course c) {
        if (repo.existsByCourseCode(c.getCourseCode())) {
            throw new RuntimeException("Course code already exists");
        }
        if (c.getActive() == null) c.setActive(true);
        return repo.save(c);
    }

    public Course update(String id, Course c) {
        c.setId(id);
        return repo.save(c);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }

    public Course getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }
}
