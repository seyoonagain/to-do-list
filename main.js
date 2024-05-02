let taskInput = document.getElementById("input-box");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".tab div");
let tabsMini = document.querySelectorAll(".tab img");
let mode = "tab-all";
let taskList = [];
let deletedTasks = [];
let filteredList = [];
let list = [];
let underLine = document.getElementById("under-line");
let underLineMini = document.getElementById("under-line-mini");

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
    if(mode === "tab-to-do" || mode === "tab-to-do-img") {
      taskList.push(task);
      filteredList.push(task);
    } else {
      taskList.push(task);
    }
  }
  taskInput.value = "";
  render();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

underLine.style.width = document.getElementById("tab-default").offsetWidth + "px";
underLine.style.left = document.getElementById("tab-default").offsetLeft + "px";
underLine.style.top = document.getElementById("tab-default").offsetTop + document.getElementById("tab-default").offsetHeight - 7 + "px"

tabs.forEach((tabs)=>tabs.addEventListener("click", (e)=>tabsIndicator(e)));
function tabsIndicator (e) {
  underLine.style.width = e.currentTarget.offsetWidth + "px";
  underLine.style.left = e.currentTarget.offsetLeft + "px";
  underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight - 7 + "px";
}

underLineMini.style.width = document.getElementById("tab-all-img").offsetWidth + "px";
underLineMini.style.left = document.getElementById("tab-all-img").offsetLeft + "px";
underLineMini.style.top = document.getElementById("tab-all-img").offsetTop + document.getElementById("tab-all-img").offsetHeight + 8 + "px"

tabsMini.forEach((tabsMini)=>tabsMini.addEventListener("click", (e)=>tabsMiniIndicator(e)));
function tabsMiniIndicator (e) {
  underLineMini.style.width = e.currentTarget.offsetWidth + "px";
  underLineMini.style.left = e.currentTarget.offsetLeft + "px";
  underLineMini.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 8 + "px";
}
 
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
for (let i = 0; i < tabsMini.length; i++) {
  tabsMini[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function filter(event) {
  mode = event.target.id;
  console.log("모드", mode)
  filteredList = [];
  if (mode === "tab-fav" || mode === "tab-fav-img") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isFavorite === true && taskList[i].isComplete === false) {
        filteredList.push(taskList[i]);
      }
    }
  }
  if (mode === "tab-starred" || mode === "tab-starred-img") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isImportant === true && taskList[i].isComplete === false) {
        filteredList.push(taskList[i]);
      }
    }
  }
  if (mode === "tab-to-do" || mode === "tab-to-do-img") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filteredList.push(taskList[i]);
      }
    }
  }
  if (mode === "tab-completed" || mode === "tab-completed-img") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

function render() {
  let taskHTML = "";

  let list = [];
  if (mode === "tab-all" || mode === "tab-all-img") {
    list = taskList;
  } else if (mode === "tab-trash" || mode === "tab-trash-img") {
    list = deletedTasks;
  } else {
    list = filteredList;
  }

  for (let i = 0; i < list.length; i++) {
    let favIcon = "";
    if (list[i].isFavorite === true) {
      favIcon = `<img src="image/heart.png" width="15px" onclick="taskLiked('${list[i].ID}')" />`;
    } else {
      favIcon = `<img src="image/heart-empty.png" width="15px" onclick="taskLiked('${list[i].ID}')" />`;
    }
    let starIcon = "";
    if (list[i].isImportant === true) {
      starIcon = `<img src="image/star.png" width="15px" onclick="taskStarred('${list[i].ID}')" />`;
    } else {
      starIcon = `<img src="image/star-empty.png" width="15px" onclick="taskStarred('${list[i].ID}')" />`;
    }
    let taskIsComplete = "";
    if (list[i].isComplete === false) {
      taskIsComplete = ``;
    } else {
      taskIsComplete = `done`;
    }

    if (mode != "tab-trash" && mode != "tab-trash-img") {
      taskHTML += `
    <div class="task-list ${taskIsComplete}">
      <div class="task-with-icons">
        <div class="task-left">
          <div>${favIcon}</div>
          <div>${starIcon}</div>
        </div>
        <div class="task-center" >
          <div class="task-content ${taskIsComplete}" onclick="taskCompleted('${list[i].ID}')">${list[i].taskContent}</div>
        </div>
      </div>
      <div class="task-right">
        <div><img src="image/delete.png" width="20px" onclick="taskDeleted('${list[i].ID}')" /></div>
      </div>
    </div>`;
    } else if (mode === "tab-trash" || mode === "tab-trash-img") {
      taskHTML += `
    <div class="task-list ${taskIsComplete}">
      <div class="task-with-icons">
        <div class="task-left">
          <div><img id="restore" src="image/restore.png" width="25px" onclick="trashRestore('${list[i].ID}')" /></div>
        </div>
        <div class="task-center" >
          <div class="task-content ${taskIsComplete}" onclick="taskCompleted('${list[i].ID}')">${list[i].taskContent}</div>
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
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].ID == ID) {
      taskList[i].isFavorite = !taskList[i].isFavorite;
      if(mode === "tab-fav" || mode === "tab-fav-img") {
        for (let j = 0; j<filteredList.length; j++) {
          if (taskList[i].ID == filteredList[j].ID) {
            filteredList.splice(j,1)
          }
        }
       } 
    }
  }
  render();
}
function taskStarred(ID) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].ID == ID) {
      taskList[i].isImportant = !taskList[i].isImportant;
      if(mode === "tab-starred" || mode === "tab-starred-img") {
        for (let j = 0; j<filteredList.length; j++) {
          if (taskList[i].ID == filteredList[j].ID) {
            filteredList.splice(j,1)
          }
        }
       } 
    }
  }
  render();
}
function taskCompleted(ID) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].ID == ID) {
      taskList[i].isComplete = !taskList[i].isComplete;
      if(mode != "tab-all" && mode != "tab-all-img") {
        for (let j = 0; j<filteredList.length; j++) {
          if (taskList[i].ID == filteredList[j].ID) {
            filteredList.splice(j,1)
          }
        }
       } 
    }
  }
  render();
}
function taskDeleted(ID) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].ID == ID) {
      deletedTasks.push(taskList[i]);
      if(mode === "tab-all" || mode === "tab-all-img") {
        taskList.splice(i, 1);
      }else {
        for (let j = 0; j<filteredList.length; j++) {
          if (taskList[i].ID == filteredList[j].ID) {
            taskList.splice(i, 1);
            filteredList.splice(j,1)
          }
        }
       } 
    }
  }
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
  for (let i = 0; i < deletedTasks.length; i++) {
    if (deletedTasks[i].ID == ID) {
      deletedTasks.splice(i, 1);
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
