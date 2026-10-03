//add task
//edit task
//delete task
//Mark completed
//Pending/completed filters
//Search tasks
//Priority: Low / Medium / High
//Due date
//Categories

const inputTask=document.getElementById("input");
const form=document.getElementById("taskform");
const taskLists=document.getElementById("taskList");
const allbtn=document.getElementById("allbtn");
const pending=document.querySelector("#pendingbtn");
const completed=document.querySelector("#completedbtn");
const searchInput=document.getElementById("searchinput");
const prioritySelect=document.getElementById("priority");
const dueDateInput=document.getElementById("duedate");
let searchText="";
let currentFilter="all";
let finalTasks;
let tasks=[];
let currentId=0;
let savedTasks=localStorage.getItem("tasks");
if(savedTasks){
    tasks=JSON.parse(savedTasks);
    if(tasks.length>0){
    currentId=Math.max(...tasks.map(task=>task.id));
    }
   
}
renderTasks();
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
form.addEventListener("submit",function(event){
    event.preventDefault();
    const inputText=inputTask.value.trim();
    if(inputText===""){
        console.log("Enter something");
    }else{
    console.log(inputText);
    console.log("Task is submitted");
        const task={
            id: ++currentId,
            title:inputText,
            completed:false,
            priority: prioritySelect.value,
            duedate: dueDateInput.value,
        };
        tasks.push(task);
        saveTasks();
        renderTasks();
    }
    
});
function renderTasks(){
    taskLists.innerHTML="";
     let filteredTasks;
     if(currentFilter==="all"){
        filteredTasks=tasks;
     }
     else if(currentFilter==="pending"){
        filteredTasks=tasks.filter(task=>task.completed!=true);;
     }
     else if(currentFilter==="completed"){
        filteredTasks=tasks.filter(task=>task.completed==true);;
     }
     if(searchText.trim()!=""){
        finalTasks=filteredTasks.filter(task=>task.title.toLowerCase().includes(searchText.toLowerCase()));
     }else if(searchText.trim()==""){
        finalTasks=filteredTasks;
     }
     finalTasks.forEach(function(task){

        const list=document.createElement("li");
        const title=document.createElement("span");
        title.textContent=task.title;
        const priority1=document.createElement("span");
        priority1.textContent=task.priority;
        const duedate=document.createElement("span");
        duedate.textContent=task.duedate;
        const checkBox=document.createElement("input");
        checkBox.type="checkbox";
        checkBox.dataset.taskId=task.id;
        checkBox.checked=task.completed;
        const edit=document.createElement("button");
         edit.textContent="Edit";
         edit.type="button";
         edit.dataset.taskId=task.id;
        const deleterender=document.createElement("button");
        deleterender.textContent="Delete";
        deleterender.type="button";
        deleterender.dataset.taskId=task.id;
        list.appendChild(title);
        list.appendChild(priority1);
        list.appendChild(duedate);
        list.appendChild(checkBox);
        list.appendChild(edit);
        list.appendChild(deleterender);
        taskLists.appendChild(list);
        deleterender.addEventListener("click",function(e){
            const id=Number(deleterender.dataset.taskId);
            tasks=tasks.filter(task=>task.id!=id);
            saveTasks();
            console.log(tasks);
            renderTasks();
        });
        checkBox.addEventListener("change",function(e){
            const id=Number(checkBox.dataset.taskId);
            const Selected=tasks.find(task=>task.id==id);
             Selected.completed=e.target.checked;
             saveTasks();
             title.classList.toggle("completed", e.target.checked);
            renderTasks();
            console.log(tasks);
        });
        edit.addEventListener("click",function(e){
            const id=Number(edit.dataset.taskId);
            const selected=tasks.find(task=>task.id==id);
            const newtitle=prompt("Enter new Task");
            if(newtitle.trim()==""){
                console.log("Enter something");
            }else{
                selected.title=newtitle;
                
            }
            saveTasks();
            renderTasks();
        });
       searchInput.addEventListener("input",function(e){
        searchText=e.target.value.trim();
       // task.title.toLowerCase().includes(searchText.toLowerCase());
        renderTasks();
    }); 

    });
}  

    

    allbtn.addEventListener("click", function() {
    currentFilter = "all";
    renderTasks();
    });
          pending.addEventListener("click",function(e){
             currentFilter="pending";
        //     tasks=tasks.filter(task=>task.completed!=true);
             renderTasks();
         });
          completed.addEventListener("click",function(e){
             currentFilter="completed";
        //     tasks=tasks.filter(task=>task.completed==true);
             renderTasks();
         });



