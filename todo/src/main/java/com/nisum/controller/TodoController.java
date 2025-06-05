package com.nisum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class TodoController {

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    public void clearTableOnStartup() {
        System.out.println("Clearing todos table on startup...");
        jdbc.update("DELETE FROM todos");
    }

    @GetMapping(produces = "application/json")
    public List<Todo> getTodos() {
        return jdbc.query("SELECT id, task FROM todos", (rs, rowNum) ->
                new Todo(rs.getInt("id"), rs.getString("task"))
        );
    }

    @PostMapping(consumes = "text/plain")
    public void addTodo(@RequestBody String todo) {
        jdbc.update("INSERT INTO todos(task) VALUES (?)", todo);
    }

    @DeleteMapping("/{index}")
    public void deleteTodo(@PathVariable int index) {
        jdbc.update("DELETE FROM todos WHERE id = ?", index);
    }
}
