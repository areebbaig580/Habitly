const back = document.querySelector('.symbol');
const percent = document.querySelector('.complPercent');
const percentDet = document.querySelector('.percentDet');
const streak = document.querySelector('.streak');
const tracked = document.querySelector('.tracked');

back.addEventListener('click', (evt) => {
    window.location.href = "../index.html";
});

function boxDetails(){
    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
    let totHabits = habitList.length;
    let compHabits = habitList.filter(h => h.completed === true).length;

    let percentage = (compHabits/totHabits)*100;

    percent.innerHTML = `${percentage} %`;
    percentDet.innerHTML = `${compHabits} of ${totHabits} habits`
    tracked.innerHTML = totHabits;

};
boxDetails();