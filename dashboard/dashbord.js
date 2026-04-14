const back = document.querySelector('.symbol');
const percent = document.querySelector('.complPercent');
const percentDet = document.querySelector('.percentDet');
const streakEl = document.querySelector('.streak');
const tracked = document.querySelector('.tracked');

back.addEventListener('click', (evt) => {
    window.location.href = "../index.html";
});

function progressSystem() {
    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
    let streeks = JSON.parse(localStorage.getItem('streeks')) || 0;
    let lastStreakDate = localStorage.getItem('lastStreakDate');
    let today = new Date().toISOString().split('T')[0];
    let yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let compHabits = habitList.filter(h => h.completed === true).length;
    let totHabits = habitList.length;
    let percentage = (compHabits / totHabits) * 100;

    if (percentage >= 60) {
        streeks = lastStreakDate === yesterday ? streeks + 1 : 1;
        localStorage.setItem('streeks', JSON.stringify(streeks));
        localStorage.setItem('lastStreakDate', today);
    } else {
        if (lastStreakDate !== today && lastStreakDate !== yesterday) {
            streeks = 0;
            localStorage.setItem('streeks', JSON.stringify(streeks));
        }
    };

    percent.innerHTML = `${percentage} %`;
    percentDet.innerHTML = `${compHabits} of ${totHabits} habits`
    tracked.innerHTML = totHabits;
    streakEl.innerHTML = streeks;
};
progressSystem();
