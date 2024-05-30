let taskInput = document.getElementById("input-box");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab p");
let tabsImg = document.querySelectorAll(".tab img");
let mode = "all";
let taskList = [];
let deletedTasks = [];
let filteredList = [];
let list = [];

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  if (taskInput.value === "") {
    return alert("Type a task to do");
  } else {
    let task = {
      taskContent: taskInput.value,
      ID: randomIDGenerate(),
      isFavorite: false,
      isImportant: false,
      isComplete: false,
    };
    taskList.push(task);
    if (mode === "to do") {
      filteredList.push(task);
    }
  }
  taskInput.value = "";
  render();
}


tabs[0].setAttribute("class", "selected")
tabs.forEach(t => t.addEventListener('click', e => filter(e.target.innerText)))
tabsImg.forEach(t => t.addEventListener('click', e => filter(e.target.id)))
function filter(m) {
  mode = m
  tabs.forEach(t => t.innerText === m ? t.setAttribute("class", "selected") : t.setAttribute("class", ""))
  tabsImg.forEach(t => t.id === m ? t.style.cssText = "opacity: 1" : t.style.cssText = "opacity: 0.5")
  filteredList = [];

  if (mode === "favorites") {
    filteredList = taskList.filter(t =>
      t.isFavorite === true
      && t.isComplete === false
    )
  }
  if (mode === "important") {
    filteredList = taskList.filter(t =>
      t.isImportant === true
      && t.isComplete === false
    )
  }
  if (mode === "to do") {
    filteredList = taskList.filter(t =>
      t.isComplete === false
    )
  }
  if (mode === "done") {
    filteredList = taskList.filter(t =>
      t.isComplete === true
    )
  }
  render();
}

tabsImg.forEach(t => t.id === mode ? t.style.cssText = "opacity: 1" : t.style.cssText = "opacity: 0.5")

function render() {
  let taskHTML = "";

  if (mode === "all") {
    list = taskList;
  } else if (mode === "deleted") {
    list = deletedTasks;
  } else {
    list = filteredList;
  }

  for (let i = 0; i < list.length; i++) {

    let favIcon = "";
    if (list[i].isFavorite) {
      favIcon = `<img src="image/heart.png" width="15px" onclick="taskLiked('${list[i].ID}')" />`
    } else {
      favIcon = `<img src="image/heart-empty.png" width="15px" onclick="taskLiked('${list[i].ID}')" />`
    }
    let starIcon = "";
    if (list[i].isImportant) {
      starIcon = `<img src="image/star.png" width="15px" onclick="taskStarred('${list[i].ID}')" />`
    } else {
      starIcon = `<img src="image/star-empty.png" width="15px" onclick="taskStarred('${list[i].ID}')" />`
    }
    let taskIsComplete = "";
    if (list[i].isComplete) {
      taskIsComplete = ` done`
    } else {
      taskIsComplete = ``
    }

    if (mode != "deleted") {
      taskHTML += `
    <div class="task-list${taskIsComplete}">
      <div class="task-with-icons">
        <div class="task-left">
          <div>${favIcon}</div>
          <div>${starIcon}</div>
        </div>
        <div class="task-center" >
          <div class="task-content" onclick="taskCompleted('${list[i].ID}')">${list[i].taskContent}</div>
        </div>
      </div>
      <div class="task-right">
        <div><img src="image/delete.png" width="20px" onclick="taskDeleted('${list[i].ID}')" /></div>
      </div>
    </div>`;
    } else if (mode === "deleted") {
      taskHTML += `
    <div class="task-list${taskIsComplete}">
      <div class="task-with-icons">
        <div class="task-left">
          <div><img id="restore" src="image/restore.png" width="25px" onclick="trashRestore('${list[i].ID}')" /></div>
        </div>
        <div class="task-center" >
          <div class="task-content" onclick="taskCompleted('${list[i].ID}')">${list[i].taskContent}</div>
        </div>
      </div>
      <div class="task-right">
        <div><img id="delete2" src="image/delete2.png" width="25px" onclick="trashDeleted('${list[i].ID}')" /></div>
      </div>
    </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = taskHTML;
}

function taskLiked(ID) {
  list.forEach(t => {
    if (ID === t.ID) {
      t.isFavorite = !t.isFavorite
    }
  })
  if (mode === "favorites") {
    filteredList = list.filter(t => t.isFavorite && !t.isComplete)
  }
  render();
}

function taskStarred(ID) {
  list.forEach(t => {
    if (ID === t.ID) {
      t.isImportant = !t.isImportant
    }
  })
  if (mode === "important") {
    filteredList = list.filter(t => t.isImportant && !t.isComplete)
  }
  render();
}

function taskCompleted(ID) {
  list.forEach(t => {
    if (ID === t.ID) {
      t.isComplete = !t.isComplete
    }
  })
  if (mode === "done") {
    filteredList = list.filter(t => t.isComplete)
  } else {
    filteredList = list.filter(t => ID !== t.ID)
  }
  render();
}

function taskDeleted(ID) {
  list.forEach(t => {
    if (ID === t.ID) {
      deletedTasks.push(t)
    }
  })
  taskList = list.filter(t => ID !== t.ID)
  filteredList = list.filter(t => ID !== t.ID)
  render();
}

function trashRestore(ID) {
  for (let i = 0; i < deletedTasks.length; i++) {
    if (deletedTasks[i].ID == ID) {
      taskList.push(deletedTasks[i]);
      deletedTasks.splice(i, 1);
    }
  }
  render();
}
function trashDeleted(ID) {
  deletedTasks = deletedTasks.filter(t => ID !== t.ID)
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
