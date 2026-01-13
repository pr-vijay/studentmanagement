package com.prvijay.studentmanagement.teacher;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TeacherController {

    private final TeacherService service;

    public TeacherController(TeacherService service) {
        this.service = service;
    }

    @GetMapping
    public List<Teacher> getAll() {
        return service.getAll();
    }

    @GetMapping("/count")
    public long count() {
        return service.count();
    }

    @PostMapping
    public Teacher create(@Valid @RequestBody Teacher t) {
        return service.create(t);
    }

    @PutMapping("/{id}")
    public Teacher update(@PathVariable String id, @Valid @RequestBody Teacher t) {
        return service.update(id, t);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
