type TodoID = number;
type TaskText = string;

interface Todo {
    id: TodoID;
    task: TaskText;
    completed?: boolean;
}

type Timestamped = { createdAt: Date };
type FullTodo = Todo & Timestamped;

type Nullable<T> = T | null;
type Status = "pending" | "done";

type TodoResponse = Todo[] | string;

type ReadonlyTodo = {
    readonly [K in keyof Todo]: Todo[K];
};

let todos: Todo[] = [];

const apiUrl: string = "/todo/api/todos";

function renderTodos(): void {
    const list: Nullable<HTMLElement> = document.getElementById("todoList");
    if (!list) return;
    list.innerHTML = "";
    todos.forEach((item: Todo) => {
        const li: HTMLLIElement = document.createElement("li");
        li.textContent = item.task + " ";
        const btn: HTMLButtonElement = document.createElement("button");
        btn.textContent = "Delete";
        btn.onclick = () => deleteTodo(item.id);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

function fetchTodos(): void {
    fetch(apiUrl)
        .then(res => res.json())
        .then((data: TodoResponse) => {
            if (Array.isArray(data)) {
                todos = data;
                renderTodos();
            }
        });
}

function addTodo(): void {
    const input = document.getElementById("todoInput") as Nullable<HTMLInputElement>;
    const text: string = input?.value.trim() ?? "";
    if (text !== "") {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: text
        }).then(fetchTodos);
        if (input) input.value = "";
    }
}

function deleteTodo(index: number): void {
    fetch(`${apiUrl}/${index}`, {
        method: "DELETE"
    }).then(fetchTodos);
}

function isTodo(obj: any): obj is Todo {
    return typeof obj.id === "number" && typeof obj.task === "string";
}

function filterByStatus(status: Status): Todo[] {
    return status === "pending" ? todos.filter(t => !t.completed) : todos.filter(t => t.completed);
}

type TodoHandler<T> = (item: T) => void;

function processTodos<T extends Todo>(items: T[], handler: TodoHandler<T>): void {
    items.forEach(handler);
}

const exampleFullTodo: FullTodo = {
    id: 1,
    task: "Example",
    completed: false,
    createdAt: new Date()
};

const readOnlyTodo: ReadonlyTodo = {
    id: 2,
    task: "Static",
    completed: true
};

window.onload = fetchTodos;