"use strict";
let todos = [];
const apiUrl = "/todo/api/todos";
function renderTodos() {
    const list = document.getElementById("todoList");
    if (!list)
        return;
    list.innerHTML = "";
    todos.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.task + " ";
        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => deleteTodo(item.id);
        li.appendChild(btn);
        list.appendChild(li);
    });
}
function fetchTodos() {
    fetch(apiUrl)
        .then(res => res.json())
        .then((data) => {
        if (Array.isArray(data)) {
            todos = data;
            renderTodos();
        }
    });
}
function addTodo() {
    var _a;
    const input = document.getElementById("todoInput");
    const text = (_a = input === null || input === void 0 ? void 0 : input.value.trim()) !== null && _a !== void 0 ? _a : "";
    if (text !== "") {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: text
        }).then(fetchTodos);
        if (input)
            input.value = "";
    }
}
function deleteTodo(index) {
    fetch(`${apiUrl}/${index}`, {
        method: "DELETE"
    }).then(fetchTodos);
}
function isTodo(obj) {
    return typeof obj.id === "number" && typeof obj.task === "string";
}
function filterByStatus(status) {
    return status === "pending" ? todos.filter(t => !t.completed) : todos.filter(t => t.completed);
}
function processTodos(items, handler) {
    items.forEach(handler);
}
window.onload = fetchTodos;
