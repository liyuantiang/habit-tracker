//找html的elements then save into variables
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

//create a new task element
function createTaskElement(text) {
  const li = document.createElement("li");

  //create a span to hold the task text|点text可以割掉代表完成了
  const span = document.createElement("span");
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.classList.add("delete-btn");

  // 点击文字：切换完成状态
  span.addEventListener("click", function() {
    li.classList.toggle("completed");
  });//用toggle可以点一次加上，再点一次去掉 | add只能是加上

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