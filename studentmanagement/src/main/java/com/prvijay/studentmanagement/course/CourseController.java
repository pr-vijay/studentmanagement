package com.prvijay.studentmanagement.course;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CourseController {
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @GetMapping
    public List<Course> getAll() {
        return service.getAll();
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }

    @GetMapping("/{id}")
    public Course getById(@PathVariable String id) {
        return service.getById(id);
    }

    @PostMapping
    public Course create(@Valid @RequestBody Course c) {
        return service.create(c);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable String id, @Valid @RequestBody Course c) {
        return service.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
