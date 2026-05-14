package backend.controller;

import backend.model.Course;
import backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin("*")

public class CourseController {

    @Autowired
    private CourseRepository repository;

    @GetMapping
    public List<Course> getAllCourses() {
        return repository.findAll();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return repository.save(course);
    }
}