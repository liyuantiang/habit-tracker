const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// 数据：所有任务都存在这个数组里
let tasks = [];

// 保存到 localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 从 localStorage 读取
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
}

// 把数组里的任务全部画到页面上
function renderTasks() {
  taskList.innerHTML = "";   // 先清空列表

  tasks.forEach(function(task, index) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    span.addEventListener("click", function() {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    deleteBtn.addEventListener("click", function() {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 页面打开时：先读取，再显示
loadTasks();
renderTasks();