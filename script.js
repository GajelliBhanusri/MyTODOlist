let API="http://localhost:3000/todos";
async function getTodos(){
    let res=await fetch(API);
    let todoArray=await res.json();
    display(todoArray);
}
getTodos();
function display(todoArray){
    let newList="";
    for(let index in todoArray){
        newList+=`
        <tr>
            <td>${todoArray[index].task}</td>
            <td>${todoArray[index].time}</td>
            <td>
            <button onclick="deleteTask(${todoArray[index].id});" class="deletebtn"><i class="fa-solid fa-trash"></i></button>
            </td>
            <td>
            <button onclick="editTask(${todoArray[index].id}, '${todoArray[index].task}', '${todoArray[index].time}')" type="button" class="btn btn-primary edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-pencil" style="color: #110d1c;"></i></button>
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
async function deleteTask(id){
    await fetch(`${API}/${id}`,{
        method:"Delete"
    }
    );
    getTodos();
}
async function addTask(e){
    e.preventDefault();
    let allForms=document.forms;
    let taskElem=allForms.addTaskForm.task;
    let timeElem=allForms.addTaskForm.time;
    let obj={
        task:taskElem.value,
        time:timeFormat(timeElem.value)
    };
    let res=await fetch(API,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
    });
    if(res.ok){
        getTodos();
    }
}
let currentId=null;
function editTask(id,task,time){
    currentId=id;
    let taskElem=document.getElementById("taskTextBox");
    let timeElem=document.getElementById("timeTextBox");
    taskElem.value=task;
    timeElem.value=time;

}
async function save(){
    let taskElem=document.getElementById("taskTextBox");
    let timeElem=document.getElementById("timeTextBox");
    let obj={
        task:taskElem.value,
        time:timeFormat(timeElem.value)
    };
    await fetch(`${API}/${currentId}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(obj)
    });
    getTodos();
}
function timeFormat(time){
    let [hour,minute]=time.split(":");
    hour=parseInt(hour);
    let ampm=hour>=12?"PM":"AM";
    hour=hour%12;
    hour=hour?hour:12;
    return `${hour}:${minute} ${ampm}`;
}
