const inputbox = document.getElementById("search");
const listcontainer = document.getElementById("list-container");

function addTask(){
    if(inputbox.value === ""){
        alert("Write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;

        let editbutton = document.createElement("button");
        editbutton.classList.add("edit");
        editbutton.innerHTML = "edit";
        editbutton.onclick = function() {
            const newTask = prompt("Edit the task:", li.childNodes[0].nodeValue);
            if (newTask) {
              li.childNodes[0].nodeValue = newTask;
              saveData();
            }
        };

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.onclick = function() {
            li.remove();
            saveData();
        };

        li.appendChild(editbutton);
        li.appendChild(span);
        listcontainer.appendChild(li);

        saveData();
    }
    inputbox.value = "";
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("check");
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(button => {
        button.onclick = function() {
            const li = button.parentElement;
            const newTask = prompt("Edit the task:", li.childNodes[0].nodeValue);
            if (newTask) {
                li.childNodes[0].nodeValue = newTask;
                saveData();
            }
        };
    });

    const spanButtons = document.querySelectorAll("span");
    spanButtons.forEach(span => {
        span.onclick = function() {
            const li = span.parentElement;
            li.remove();
            saveData();
        };
    });
}

showTask();
