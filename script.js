let todoArray=[
 { task: "Buy groceries", time: "10:00 AM" },
  { task: "Attend team meeting", time: "11:30 AM" },
  { task: "Finish project report", time: "2:00 PM" },
  { task: "Go for a run", time: "5:00 PM" },
  { task: "Cook dinner", time: "7:00 PM" },
  { task: "Read a book", time: "9:00 PM" }
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
