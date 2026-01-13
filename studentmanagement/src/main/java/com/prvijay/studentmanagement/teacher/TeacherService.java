package com.prvijay.studentmanagement.teacher;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TeacherService {

    private final TeacherRepository repo;

    public TeacherService(TeacherRepository repo) {
        this.repo = repo;
    }

    public List<Teacher> getAll() {
        return repo.findAll();
    }

    public long count() {
        return repo.count();
    }

    public Teacher create(Teacher t) {
        if (t.getActive() == null) t.setActive(true);
        if (t.getUsedPaidLeaves() == null) t.setUsedPaidLeaves(0);
        if (t.getUnpaidLeaves() == null) t.setUnpaidLeaves(0);
        return repo.save(t);
    }

    public Teacher update(String id, Teacher t) {
        t.setId(id);
        return repo.save(t);
    }

    public void delete(String id) {
        repo.deleteById(id);
    }
}
