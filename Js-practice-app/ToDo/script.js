//변수 상수 생성
const createBtn = document.getElementById("create-btn");
const submit = document.getElementById("submit");
const inputText = document.getElementById("input-text");
const list = document.getElementById("list");
let todos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
    event.preventDefault();  // 기본 동작인 폼 제출 후 페이지 새로고침을 방지

    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,
    };
    //입력 폼에 저장된 내용을 item으로 저장하도록 한다.
    if (inputText.value.length > 0) {
        item.text = inputText.value;
        todos.unshift(item);
        inputText.value = "";
        createToDoElement(item);
    } else {
        window.alert("내용을 입력하세요");
    }
}

// 새로운 할 일 요소를 만드는 함수
function createToDoElement(item) {
    let container = document.createElement("div");
    container.className = "container";
    container.setAttribute("data-id", item.id);


    let inputEl = document.createElement("input");
    inputEl.className = "input-box";
    inputEl.setAttribute("type", "text");
    inputEl.disabled="true";
    inputEl.value = item.text;

    let checkbox = document.createElement("input");
    checkbox.className = "check-box";
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = item.complete;
    checkbox.addEventListener('click',()=>{
        if(checkbox.checked){
            inputEl.style.textDecoration ="line-through";
        }else{
            inputEl.style.textDecoration ="none";

        }
    })

    let action = document.createElement("div");
    action.className = "action";

    let buttonDel = document.createElement("button");
    buttonDel.textContent = "삭제";
    buttonDel.className = "delete-btn";
    buttonDel.addEventListener("click", () => deleteToDoElement(item, container));

    let buttonUp = document.createElement("button");
    buttonUp.textContent = "수정";
    buttonUp.className = "update-btn";
    buttonUp.addEventListener("click", () => updateToDoElement(inputEl,buttonUp));

    action.append(buttonDel, buttonUp);
    container.append(checkbox, inputEl, action);
    list.appendChild(container);
}

// 할 일을 수정하는 함수
function updateToDoElement(inputEl,buttonUp) {
    inputEl.disabled = !inputEl.disabled;  // 수정할 수 있게 필드 활성화 또는 비활성화
    if(buttonUp.innerText == "완료"){
        buttonUp.innerText = '수정';
    }else{
        buttonUp.innerText = '완료';
    }
}

// 할 일을 삭제하는 함수
function deleteToDoElement(item, container) {
    todos = todos.filter(todo => todo.id !== item.id);  // 배열에서 할 일 삭제
    container.remove();  // 화면에서 할 일 삭제
}