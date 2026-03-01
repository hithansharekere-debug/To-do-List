document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    createTask(task);
    saveTask(task);

    input.value = "";
}

function createTask(task) {
    const li = document.createElement("li");

    if (task.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    span.addEventListener("click", function() {
        li.classList.toggle("completed");
        task.completed = !task.completed;
        updateStorage();
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function() {
        li.style.opacity = "0";
        setTimeout(() => {
            li.remove();
            removeTask(task);
        }, 300);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => createTask(task));
}

function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateStorage() {
    const listItems = document.querySelectorAll("#taskList li");
    let tasks = [];

    listItems.forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(type) {
    const listItems = document.querySelectorAll("#taskList li");

    listItems.forEach(li => {
        const isCompleted = li.classList.contains("completed");

        if (type === "all") {
            li.style.display = "flex";
        } else if (type === "completed") {
            li.style.display = isCompleted ? "flex" : "none";
        } else if (type === "pending") {
            li.style.display = !isCompleted ? "flex" : "none";
        }
    });
}
// 🔥 LIVE COUNTER
function updateCounter() {
    const listItems = document.querySelectorAll("#taskList li");
    let completed = 0;
    let pending = 0;

    listItems.forEach(li => {
        if (li.classList.contains("completed")) {
            completed++;
        } else {
            pending++;
        }
    });

    document.getElementById("taskStatus").textContent =
        completed + " Completed | " + pending + " Pending";
}

// Call counter after page loads
document.addEventListener("DOMContentLoaded", updateCounter);

// Update counter whenever task list changes
document.getElementById("taskList").addEventListener("click", function() {
    setTimeout(updateCounter, 50);
});

// 🌙 DARK / LIGHT MODE
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}