const dateCont = document.querySelector(".date-container");
const listContainer = document.querySelector(".list");
const addToggle = document.getElementById('filter');

dateContainer();
addTask();
let list = JSON.parse(localStorage.getItem('toDoList')) || [];

function dateContainer() {
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    for (let i = date; i < date + 21; i++) {

        let currDate = new Date(year, month, i - 20);
        let currMonth = currDate.toLocaleString('default', { month: 'short' });

        const dateCard = `
        <div class="date">
                    <div class="dtmain">${currDate.getDate()}</div>
                    <div class="dtbtm">${currMonth}</div>
                </div>
        `;
        dateCont.innerHTML += dateCard;
    }
};

addToggle.addEventListener('change', (evt) => {
    const form = document.querySelector('.form');
    let toggle = evt.target.value;

    if (toggle === "tasks") {
        form.innerHTML = ` <div class="form-elm">
                        <div class="label">Add Task name</div>
                        <input type="text" class="input" id="input" placeholder="Enter task" required>
                    </div>
                    <div class="radio-btns">
                        <div class="type">Priority Type</div>
                        <input type="radio" name="Priortype" value="high" class="radio-bt" required>
                        High
                        <input type="radio" name="Priortype" value="medium" class="radio-bt" required>
                        Medium
                        <input type="radio" name="Priortype" value="low" class="radio-bt" required>
                        Low
                    </div>
                    <div class="btn-ctr">
                        <button class="btn">add</button>
                    </div>` 
                    addTask();          
    } else if (toggle === "habits") {
        form.innerHTML = `<div class="form-elm">
                        <div class="label">Add Habit name</div>
                        <input type="text" class="input" id="input2" placeholder="Enter Habit name" required>
                        </div>
                        <div class="form-elm">
                            <label for="filter" class="label">Habit Color</label>
                            <input type="color" id="habit-color" value="#fa7900" class="color-picker">
                        </div>
                        <div class="form-elm">
                        <label for="filter" class="label">Habit category</label>
                        <select id="habit-type" name="habit-type" class="dropdown inputStyle">
                            <option value="Fitness">Fitness</option>
                            <option value="Study">Study</option>
                            <option value="Self-care">Self care</option>
                            <option value="Skill">Skill</option>
                        </select>
                    </div>
                    <div class="form-elm">
                        <label for="filter" class="label">Habit frequency</label>
                        <select id="habit-type" name="habit-type" class="dropdown inputStyle">
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
                    <div class="form-elm">
                        <div class="label">Goal amount</div>
                        <input type="number" class="input" id="input3" placeholder="Enter amount" required>
                    </div>
                    <div class="form-elm">
                        <div class="label">Goal unit</div>
                        <input type="text" class="input" id="input" placeholder="Enter unit" required>
                    </div>
                    <div class="form-elm">
                        <div class="label">Start date</div>
                        <input type="date" class="inputStyle" id="input3" required>
                    </div>
                    <div class="btn-ctr">
                        <button class="btn2">add</button>
                    </div>`
    };
});
function addTask(){
    const addBtn = document.querySelector('.btn');
    addBtn.addEventListener('click', (evt) => {
        const description = document.getElementById("input");
        const prioType = document.querySelector('input[name="Priortype"]:checked');
        if (description.value === '') return;
        else descr = description.value;
    
        let list = JSON.parse(localStorage.getItem('toDoList')) || [];
        let date = new Date();
        let today = date.toISOString().split('T')[0];
        let prior = prioType.value;
    
        const listItm = {
            description: descr,
            priority: prior,
            date: today,
            completed: false,
        }
    
        list.push(listItm);
        localStorage.setItem('toDoList', JSON.stringify(list));
    });
};

function showTdL() {
    let list = JSON.parse(localStorage.getItem('toDoList')) || [];

    for (let item of list) {
        const card = `  <div class="itm-ctr">
                        <div class= "prior ${item.priority}"></div>
                            <div class="task ${item.completed ? 'completed' : ''}">${item.description}</div>
                            <div class="check"><i class="fa-regular ${item.completed ? 'fa-square-check' : 'fa-square'}"></i></div>
                        </div>
                    
        `
        listContainer.insertAdjacentHTML('beforeend', card);
    }

    const checkBox = document.querySelectorAll('.check');

    checkBox.forEach((box, index) => {
        box.addEventListener('click', (evt) => {
            const icon = box.querySelector('i');

            if (list[index].completed === false) {
                box.parentElement.firstElementChild.nextElementSibling.style.color = "#464646b7";
                box.parentElement.firstElementChild.nextElementSibling.style.textDecoration = "line-through";
                icon.classList.remove('fa-square');
                icon.classList.add('fa-square-check');
                list[index].completed = true;
            } else if (list[index].completed === true) {
                box.parentElement.firstElementChild.nextElementSibling.style.color = "";
                box.parentElement.firstElementChild.nextElementSibling.style.textDecoration = "";
                icon.classList.remove('fa-square-check');
                icon.classList.add('fa-square');
                list[index].completed = false;
            }

            localStorage.setItem('toDoList', JSON.stringify(list));
        });
    });
}

showTdL();