const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

//让task=array,来save data；每个data有taskName和completedStatus
let tasks = [];

//save在localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
} //setItem(name,value): value必须是string,所以要JSON.stringify

//read data from localStorage
function loadTasks() {
  const saved = localStorage.getItem("tasks");
  if (saved !== null) { //如果有存过data,就parse
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
    //span是为了hold着taskName,让taskName和deleteBtn在同一行
    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X"; 
    deleteBtn.classList.add("delete-btn");

    //这边是span的toggle.That's why一开始是addCompleted, not toggle
    span.addEventListener("click", function() {
      tasks[index].completed = !tasks[index].completed;
      //第几个task被clicked了,negate它的completed status: true->false,false->true
      saveTasks(); //update了completedStatus,save起来
      renderTasks(); //再reload tasks,show completedStatus
    }); //.addEventListener是要被user的behaviour触发的,所以只有那时候才会execute function而已
    //renderTasks是不会execute这些小function的

    deleteBtn.addEventListener("click", function() {
      tasks.splice(index, 1);//splice(index,1)就是把第index个task删掉 *删一个而已
      //tasks = [A, B, C]，删除 B（index 是 1）
      //tasks.splice(1, 1);   // 结果: [A, C]
      saveTasks();
      renderTasks();
    });

    li.appendChild(span); //span hold着taskName,让taskName和deleteBtn在同一行
    li.appendChild(deleteBtn);
    taskList.appendChild(li); //把li放到ul里
    //li是为了让taskName和dltBtn同一行；taskList是真正的ul,是要把li放到ul里
  });
}

function addTask() {
  const taskText = taskInput.value.trim(); //.trim()是为了去掉前后空格

  if (taskText === "") { //如果user没有input任何东西, do nothing
    return;
  }

  tasks.push({ text: taskText, completed: false }); //把taskName和completedStatus放到tasks array里
  saveTasks();
  renderTasks();

  taskInput.value = ""; //清空input field
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

//open the page: load data from localStorage 1st, then显示tasks
loadTasks();
renderTasks();

// ===== Tabs =====
const tabButtons = document.querySelectorAll(".tab-btn"); //from css, .tab-btn是class,所以用querySelectorAll
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(function(button) { //forEach=for to-do & habit tab buttons
  button.addEventListener("click", function() { //直接把所有的tabBtn都加上click event listener,然后再去判断哪个被clicked
    // 1.先把所有按钮和区块的 active 拿掉，因为default tab是to-do,所以一开始to-do tab是active的
    tabButtons.forEach(function(b) { b.classList.remove("active"); });
    tabContents.forEach(function(c) { c.classList.remove("active"); });

    // 2.再给被点的按钮，和它对应的区块加上active
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});

// ===== Habits =====
const habitInput = document.getElementById("habit-input");
const addHabitBtn = document.getElementById("add-habit-btn");
const habitList = document.getElementById("habit-list");

let habits = [];

//Format:"YYYY-MM-DD"
function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return y + "-" + m + "-" + d;
}

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
  const saved = localStorage.getItem("habits");
  if (saved !== null) {
    habits = JSON.parse(saved);
  }
}

//Streak 计算连续天数：从今天往回数
function calculateStreak(completedDates) {
  let streak = 0;
  const day = new Date(); //今天的日期

  // 如果今天还没打卡，从昨天开始数（今天还有机会）
  if (!completedDates.includes(formatDate(day))) {
    day.setDate(day.getDate() - 1);
  }

  while (completedDates.includes(formatDate(day))) {
    streak++;
    day.setDate(day.getDate() - 1);
  }
  return streak;
}

function renderHabits() {
  habitList.innerHTML = "";
  const today = formatDate(new Date());

  habits.forEach(function(habit, index) {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.classList.add("habit-info");

    const name = document.createElement("span");
    name.textContent = habit.name;

    const streakText = document.createElement("small");
    streakText.textContent = "🔥 Streak: " + calculateStreak(habit.completedDates) + " days";

    info.appendChild(name);
    info.appendChild(streakText);

    const actions = document.createElement("div");
    actions.classList.add("habit-actions");

    const doneToday = habit.completedDates.includes(today);

    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.textContent = doneToday ? "✓ Done" : "Check in";
    if (doneToday) {
      checkBtn.classList.add("done");
    }

    checkBtn.addEventListener("click", function() {
      if (doneToday) {
        // 取消今天的打卡
        habit.completedDates = habit.completedDates.filter(function(d) {
          return d !== today;
        });
      } else {
        habit.completedDates.push(today);
      }
      saveHabits();
      renderHabits();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function() {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    });

    actions.appendChild(checkBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(info);
    li.appendChild(actions);
    habitList.appendChild(li);
  });
}

function addHabit() {
  const name = habitInput.value.trim();
  if (name === "") {
    return;
  }
  habits.push({ name: name, completedDates: [] });
  saveHabits();
  renderHabits();
  habitInput.value = "";
}

addHabitBtn.addEventListener("click", addHabit);

habitInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addHabit();
  }
});

loadHabits();
renderHabits();