const apiUrl = "/todo/api/todos";
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

let todos = [];

class TodoItem {
    constructor(id, task) {
        this.id = id;
        this.task = task;
        this.created = new Date();
    }
}

const renderTodos = () => {
    todoList.innerHTML = "";
    for (const item of todos) {
        const { id, task } = item;
        const li = document.createElement("li");
        li.textContent = `${task} (ID: ${id})`;

        const btn = document.createElement("button");
        btn.textContent = "Delete";
        btn.addEventListener("click", () => deleteTodo(id));
        li.appendChild(btn);
        todoList.appendChild(li);
    }

    const meta = Object.assign({}, {
        total: todos.length,
        ids: Array.from(todos.map(t => t.id))
    });

    console.log("Meta info:", meta);
};

const fetchTodos = () => {
    return fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            todos = data.map(obj => new TodoItem(obj.id, obj.task));
            renderTodos();
        })
        .catch(showError);
};

const addTodo = () => {
    const input = document.getElementById("todoInput");
    const payload = input.value.trim() || "Untitled Task";
    if (payload !== "") {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: payload
        })
            .then(fetchTodos)
            .catch(showError);
        input.value = "";
    }
};

const deleteTodo = (id) => {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    })
        .then(fetchTodos)
        .catch(showError);
};

const showError = ({ message } = { message: "Unknown error" }) => {
    console.error(`Error: ${message}`);
};

function* customMessageGen() {
    yield* ["Task added", "Task deleted", "Tasks loaded"];
}

const logMessages = () => {
    const gen = customMessageGen();
    for (const msg of gen) {
        console.log(`MSG: ${msg}`);
    }
};

const demoSetMap = () => {
    const idSet = new Set(todos.map(t => t.id));
    const taskMap = new Map(todos.map(t => [t.id, t.task]));
    const weakTaskMap = new WeakMap();
    const weakTaskSet = new WeakSet();

    todos.forEach(t => {
        weakTaskMap.set(t, t.task);
        weakTaskSet.add(t);
    });

    console.log("Unique IDs:", [...idSet]);
    console.log("Task Map:", taskMap);
};

const uniqueTaskSymbol = Symbol("task");
const getTaskWithSymbol = (task) => ({
    [uniqueTaskSymbol]: task,
    get taskName() {
        return this[uniqueTaskSymbol];
    }
});

const checkEquality = () => {
    const x = NaN, y = NaN;
    console.log("Strict Equality using Object.is:", Object.is(x, y));
};

const sampleCombine = (...args) => {
    const base = { a: 1, b: 2 };
    const extra = { ...base, ...args[0] };
    console.log("Merged object:", extra);
};

const helper = {
    todoInput,
    addTodo,
    fetchTodos,
    renderTodos,
    deleteTodo
};

window.onload = () => {
    fetchTodos();
    logMessages();
    demoSetMap();
    checkEquality();
    sampleCombine({ c: 3 });
    console.log("Enhanced Object:", helper);
    console.log("Symbol demo:", getTaskWithSymbol("Study").taskName);
};