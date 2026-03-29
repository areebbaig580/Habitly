const dateCont = document.querySelector(".date-container");
const listContainer = document.querySelector(".list");
const habitsContainer = document.querySelector('.habits');
const addToggle = document.getElementById('filter');

dateContainer();
addTask();
resetTasks();
updateProgress();

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

function showProgress() {
    // To - do progress circle in bottom of date container 
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
                        <input type="text" class="input" id="habit-name" placeholder="Enter Habit name" required>
                        </div>
                        <div class="form-elm">
                            <label for="filter" class="label">Habit Color</label>
                            <input type="color" id="habit-color" value="#ffffff" class="color-picker">
                        </div>
                        <div class="form-elm">
                        <label for="filter" class="label">Habit category</label>
                        <select id="habit-categ" name="habit-type" class="dropdown inputStyle">
                            <option value="Fitness">Fitness</option>
                            <option value="Study">Study</option>
                            <option value="Self-care">Self care</option>
                            <option value="Skill">Skill</option>
                            <option value="Personal">Personal</option>
                        </select>
                    </div>
                    <div class="form-elm">
                        <label for="filter" class="label">Habit frequency</label>
                        <select id="habit-freq" name="habit-type" class="dropdown inputStyle">
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>
                    <div class="form-elm">
                        <div class="label">Goal amount</div>
                        <input type="number" class="input" id="goal-amt" placeholder="Enter amount">
                    </div>
                    <div class="form-elm">
                        <div class="label">Goal unit</div>
                        <input type="text" class="input" id="goal-unit" placeholder="Enter unit">
                    </div>
                    <div class="form-elm">
                        <div class="label">Start date</div>
                        <input type="date" class="inputStyle" id="start-dt" required>
                    </div>
                    <div class="btn-ctr">
                        <button class="btn2">add</button>
                    </div>`
        addHabit();
    };
});
function addTask() {
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

function showTasks() {
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
};
showTasks();

function resetTasks() {
    let today = new Date().toISOString().split('T')[0];
    let lastVisit = localStorage.getItem('lastVisited');

    if (lastVisit !== today) {
        let list = JSON.parse(localStorage.getItem('toDoList')) || [];

        let remainingTask = list.filter(itm => itm.completed === false);
        localStorage.setItem('toDoList', JSON.stringify(remainingTask));

        localStorage.setItem('lastVisited', today);
    };
};

function addHabit() {
    const addhabit = document.querySelector(".btn2");

    addhabit.addEventListener('click', (evt) => {
        const habit = document.getElementById('habit-name');
        const colorSel = document.getElementById('habit-color');
        const habitCat = document.getElementById('habit-categ');
        const habitFreq = document.getElementById('habit-freq');
        const goalAmt = document.getElementById('goal-amt');
        const goalUnt = document.getElementById('goal-unit');
        const startDt = document.getElementById('start-dt');

        let list = JSON.parse(localStorage.getItem('habitList')) || [];

        let name = habit.value;
        let color = colorSel.value;
        let habitCategory = habitCat.value;
        let habitFrequency = habitFreq.value
        let goalAmount = goalAmt.value;
        let goalUnit = goalUnt.value;
        let startDate = startDt.value;

        const habitItm = {
            name: name,
            color: color,
            habitCategory: habitCategory,
            habitFrequency: habitFrequency,
            goalAmount: goalAmount,
            goalUnit: goalUnit,
            startDate: startDate,
            completed: false,
        }

        list.push(habitItm);
        localStorage.setItem('habitList', JSON.stringify(list));
    });
};

function showHabits() {
    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];

    for (let itm of habitList) {
        card = `<div class="habit-ctr">
                        <div class="left">
                            <div class="left-top">

                                <div class="h-name ${itm.completed ? 'h-name-clr' : ''}">${itm.name}</div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="h-check"><i class="fa-solid ${itm.completed ? 'fa-check' : 'fa-plus'}"></i></div>
                            <div class="quant">${itm.goalAmount} ${itm.goalUnit}</div>
                        </div>
                    </div>`

        habitsContainer.insertAdjacentHTML('beforeend', card);
    };
    const habChBox = document.querySelectorAll('.h-check');

    habChBox.forEach((box, index) => {
        box.addEventListener('click', (evt) => {
            const icon = box.querySelector('i');
            console.log(`${index} was clicked`);

            if (habitList[index].completed === false) {
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-check');
                box.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.style.color = '#2CB67D';
                habitList[index].completed = true;
            } else if (habitList[index].completed === true) {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-plus');
                habitList[index].completed = false;
            }

            localStorage.setItem('habitList', JSON.stringify(habitList));
        });
    });
};
showHabits();

function updateProgress() {
    const ctx = document.getElementById('myChart');
    const habitDet = document.querySelector('.habitDet');
    const taskDet = document.querySelector('.taskDet');

    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
    let totHabits = habitList.length;
    let compHabits = habitList.filter(h => h.completed === true).length;
    let taskList = JSON.parse(localStorage.getItem('toDoList')) || [];
    let totTasks = taskList.length;
    let compTasks = taskList.filter(t => t.completed === true).length;

    habitDet.innerHTML = `Habits completed today : ${compHabits}/${totHabits}`;
    taskDet.innerHTML = ` Tasks completed today : ${compTasks}/${totTasks}`;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Remaining habits', 'Completed Habits'],
            datasets: [{
                data: [totHabits - compHabits, compHabits],
                backgroundColor: ['#e5e5e5', '#1ee0a9']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            cutout: '60%'
        }
    });

};

