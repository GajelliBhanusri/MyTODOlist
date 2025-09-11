let todoArray=[
    { task: "Revise Java concepts", time: "7:00 AM" },
    { task: "Read 1-2 pages of a book", time: "8:00 AM" },
    { task: "Job search", time: "09:15 AM" },
    { task: "Coding practice", time: "10:00 AM" },
    { task: "Complete two LeetCode problems", time: "12:00 PM" },
    { task: "Take a short nap / relaxation", time: "2:00 PM" },
    { task: "Work on project or assignments", time: "4:00 PM" },
    { task: "Evening walk or exercise", time: "6:00 PM" },
    { task: "Revise notes. Note what you learned today", time: "8:00 PM" },
    { task: "Plan tasks for tomorrow", time: "9:30 PM" },
    { task: "Sleep on time", time: "11:00 PM" }
];
function display(){
    let newList="";
    for(let index in todoArray){
        newList+=`
        <tr>
            <td>${todoArray[index].task}</td>
            <td>${todoArray[index].time}</td>
            <td>
            <button onclick="deleteTask(${index});" class="deletebtn"><i class="fa-solid fa-trash"></i></button>
            </td>
            <td>
            <button onclick="editTask(${index});" type="button" class="btn btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pencil" style="color: #110d1c;"></i></button>
            </td>
        </tr>
        `
    }
    let table=`
    <table border="2px">
        ${newList}
    </table>
    `
    let refElem=document.getElementById("ref");
    refElem.innerHTML=table;
}
display();
function deleteTask(index){
    todoArray.splice(index,1);
    display();
}
function addTask(e){
    e.preventDefault();
    let allForms=document.forms;
    let taskElem=allForms.addTaskForm.task;
    let timeElem=allForms.addTaskForm.time;
    let obj={
        task:taskElem.value,
        time:timeFormat(timeElem.value)
    }
    todoArray.push(obj);
    display();
}
let i=0;
function editTask(index){
    i=index;
    let taskElem=document.getElementById("taskTextBox");
    let timeElem=document.getElementById("timeTextBox");
    let selectedTask=todoArray[index];
    taskElem.value=selectedTask.task;
    timeElem.value=selectedTask.time;

}
function save(){
    let taskElem=document.getElementById("taskTextBox");
    let timeElem=document.getElementById("timeTextBox");
    let obj={
        task:taskElem.value,
        time:timeFormat(timeElem.value)
    }
    todoArray[i]=obj;
    display();
}
function timeFormat(time){
    let [hour,minute]=time.split(":");
    hour=parseInt(hour);
    let ampm=hour>=12?"PM":"AM";
    hour=hour%12;
    hour=hour?hour:12;
    return `${hour}:${minute} ${ampm}`;
}
