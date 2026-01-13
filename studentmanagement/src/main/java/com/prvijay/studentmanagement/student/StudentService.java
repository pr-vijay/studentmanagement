package com.prvijay.studentmanagement.student;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Student create(Student s) {
        if (repo.existsByAdmissionNumber(s.getAdmissionNumber())) {
            throw new RuntimeException("Admission number already exists");
        }
        return repo.save(s);
    }

    // ===== for admin dashboard cards =====
    public long countStudents() {
        return repo.count();
    }

    // ===== for admin CRUD (optional but useful) =====
    public Student update(String id, Student s) {
        Student existing = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        existing.setAdmissionNumber(s.getAdmissionNumber());
        existing.setFirstName(s.getFirstName());
        existing.setLastName(s.getLastName());
        existing.setEmail(s.getEmail());
        existing.setDepartment(s.getDepartment());
        existing.setCurrentYear(s.getCurrentYear());
        existing.setCurrentSemester(s.getCurrentSemester());
        existing.setClassName(s.getClassName());
        existing.setSection(s.getSection());
        existing.setPhone(s.getPhone());
        existing.setActive(s.getActive());
        existing.setDateOfBirth(s.getDateOfBirth());

        return repo.save(existing);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
    // Add this method to your existing StudentService.java
    public Student getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

}
