const dateCont = document.querySelector(".date-container");
const btn = document.querySelector(".btn");
const description = document.getElementById("input");
const listContainer = document.querySelector(".list");

dateContainer();
let list = JSON.parse(localStorage.getItem('toDoList')) || [];
console.log(list);


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

btn.addEventListener('click', (evt) => {
    const prioType = document.querySelector('input[name= "Priortype"]:checked');
    if (description.value === '') return;
    else descr = description.value;

    let list = JSON.parse(localStorage.getItem('toDoList')) || [];

    let i = list.length;
    let date = new Date();
    let today = date.toISOString().split('T')[0];
    let prior = prioType.value;

    const listItm = {
        description: descr,
        priority : prior,
        date: today,
        completed: false,
    }

    list.push(listItm);
    localStorage.setItem('toDoList', JSON.stringify(list));

});

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