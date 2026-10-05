const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

function createTaskElement(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  // 点击文字：切换完成状态
  span.addEventListener("click", function() {
    li.classList.toggle("completed");
  });

  // 点击 Delete：移除这个任务
  deleteBtn.addEventListener("click", function() {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});