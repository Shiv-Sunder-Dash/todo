package com.nisum.controller;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    private final List<String> todos = new ArrayList<>();

    public TodoController() {
        System.out.println("TodoController initialized");
    }

    @GetMapping(produces = "application/json")
    public List<String> getTodos() {
        System.out.println("GET /todos called");
        return todos;
    }

    @PostMapping(consumes = "text/plain")
    public void addTodo(@RequestBody String todo) {
        todos.add(todo);
    }

    @DeleteMapping("/{index}")
    public void deleteTodo(@PathVariable int index) {
        if (index >= 0 && index < todos.size()) {
            todos.remove(index);
        }
    }
}
