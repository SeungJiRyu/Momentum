const toDoForm = document.querySelector("#todo-form");
const toDoList = document.querySelector("#todo-list");
const toDoInput = toDoForm.querySelector("input");

let toDos = []; //create an array which can be revised.(let)

const TODOS_KEY = "todos";

function saveToDos(){
    localStorage.setItem(TODOS_KEY,JSON.stringify(toDos));
}//array toDos를 다시 저장해주는 함수!!!

function deleteToDo(event){
    const li = event.target.parentElement;
    toDos = toDos.filter(toDo =>JSON.stringify(toDo.id)!==li.id);
    //li가 해당 item에 대해 생성된 것이므로, 버튼을 누른 item과 같으면 false를 return하여 버튼 누른 item을 toDos에서 제거한다.
    
    saveToDos(); //제거한 array toDos를 위에 정의한 함수 saveToDos로 업데이트
    li.remove(); //화면에서 보여지는 것 중 어느 것을 골라서 지워야 하는지만 체크해서 지우고 있음
}

function paintToDo(newtodo){
    const li = document.createElement("li");
    li.id = newtodo.id;
    const span = document.createElement("span");
    span.innerText = newtodo.text; //newtodo라는 array에는 이제 object가 들어갔기 때문에 .Text로 내용을 받아와야 한다.
    const button = document.createElement("button");
    button.innerText="❌";
    button.addEventListener("click",deleteToDo);

    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event){
    event.preventDefault();
    const newtodo = toDoInput.value;
    toDoInput.value = "";
    const newtodoObj = {
        text:newtodo,
        id:Date.now(), //li를 구분할 수 있게 만들어준다!!! = 이제 원하는 item을 삭제할 수 있다는 얘기이다!!!
    }
    toDos.push(newtodoObj); // 배열 toDos에 newtodo를 요소로 저장
    paintToDo(newtodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos!==null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); 
}
