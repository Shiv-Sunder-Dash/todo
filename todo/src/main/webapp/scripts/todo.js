const apiUrl = "/todo/api/todos";
let todos = [];

function renderTodos() {
    const list = document.getElementById("todoList");
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
        .then(data => {
            todos = data;
            renderTodos();
        });
}

function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (text !== "") {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: text
        }).then(fetchTodos);
        input.value = "";
    }
}

function deleteTodo(index) {
    fetch(`${apiUrl}/${index}`, {
        method: "DELETE"
    }).then(fetchTodos);
}

window.onload = fetchTodos;

console.log(hoistedVar);
var hoistedVar = "Hoisting works";

const exampleTodo = { id: 101, task: "Example from object concept" };

const sampleTasks = ["Buy fruits", "Complete assignment", "Read book"];

if (sampleTasks.length > 0) {
    console.log("Sample tasks are available");
}

function printTasks(arr) {
    arr.forEach(t => console.log("Task:", t));
}
printTasks(sampleTasks);

let taskId = 1;
let taskName = "Grocery";
let isCompleted = false;
let additionalData = null;
let notDefined;