// 1.找html的element by using id
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// 2.Add task function
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return; //if empty string, do nothing
  }

  const li = document.createElement("li");
  li.textContent = taskText;
  taskList.appendChild(li);

  taskInput.value = ""; //clear input field after adding task
}
//enter key event listener
taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// 3. Add event listener to the button
addBtn.addEventListener("click", addTask);