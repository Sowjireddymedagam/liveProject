document.getElementById("btn_submit").addEventListener("click", function () {
    const taskInput = document.getElementById("taskIP");
    const taskText = taskInput.value.trim(); 

    if (taskText === "") {
        alert("Enter Your Task Now");
        return;
    }
    if(taskText.length < 5){
        alert("task must be above 5 Characters");
        taskInput.value ="";
        return;
    }

    const LI = document.createElement("LI");
    LI.textContent = taskText;
    LI.className = "flex items-center judtify-between px-3 py-2 bg-white rounded-shadow transition duration-300 ease-in-out cursor-pointer hover:scale-100";
    
   LI.addEventListener("click", function(){
    LI.classList.toggle("line-through");
    LI.classList.toggle("text-green-600");
    saveTasks();
   });
    
    const del = document.createElement("button");
    del.innerHTML = "&#10006;"
    del.className = "ml-4 text-red-500 font-bold hover:text-red-700";

    del.addEventListener("click", function (e) {
        e.stopPropagation();
        LI.classList.add("opacity-0", "scale-90");
        setTimeout(() => {
            LI.remove();
            saveTasks();
        }, 300);
        
    });
    LI.appendChild(del);

    document.getElementById("taskContainer").appendChild(LI);
    saveTasks();

    taskInput.value = "";
});

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskContainer li").forEach((li) => {
        const text = li.childNodes[0].textContent;
        const completed = li.classList.contains("line-through");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.getItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
}

function addTask(text, completed = false) {
    const LI = document.createElement("LI");
    LI.textContent = text;
    LI.className = "flex items-center justify-between px-3 py-2 bg-white rounded shadow transition duration-300 ease-in-out cursor-pointer hover:scale-100";

    if (completed) {
        LI.classList.add("line-through", "text-green-600");
    }

    LI.addEventListener("click", function () {
        LI.classList.toggle("line-through");
        LI.classList.toggle("text-green-600");
        saveTasks();
    });

    const del = document.createElement("button");
    del.innerHTML = "&#10006;";
    del.className = "ml-4 text-red-500 font-bold hover:text-red-700";

    del.addEventListener("click", function (e) {
        e.stopPropagation();
        LI.classList.add("opacity-0", "scale-90");
        setTimeout(() => {
            LI.remove();
            saveTasks();
        }, 300);
    });

    LI.appendChild(del);
    document.getElementById("taskContainer").appendChild(LI);
}

window.addEventListener("DOMContentLoaded", () => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    saved.forEach((task) => addTask(task.text, task.completed));
});
