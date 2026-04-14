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

function weeklyActivity() {
    let completedHabits = JSON.parse(localStorage.getItem('completedHabits'));

    let weekCompletion = [0, 0, 0, 0, 0, 0, 0];
    let today = new Date();
    let day = today.getDay();
    let daysFromMonday = day === 0 ? 6 : day - 1;
    let monday = new Date(today);
    monday.setDate(today.getDate() - daysFromMonday);

    weekCompletion = [0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < 7; i++) {
        let currentDay = new Date(monday);
        currentDay.setDate(monday.getDate() + i);
        let dateStr = currentDay.toISOString().split('T')[0];

        let totCompleted = completedHabits.filter(c => c.date === dateStr);
        if (totCompleted.length > 0) {
            weekCompletion[i] = totCompleted[0].completedLen;
        } else {
            weekCompletion[i] = 0;
        };
    };

    return weekCompletion;
};
function monthlyActivity() {
    //to - do
}
function updateChart() {
    const ctx = document.getElementById('myChart');
    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
    let max = habitList.length;
    let weekProgress = weeklyActivity();

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Habit Completed',
                data: weekProgress,
                borderColor: '#e58123',
                backgroundColor: '#ebc9a9',
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    min: 0,
                    max: max,
                    ticks: {
                        stepSize: 1   
                    }
                }
            }
        }

    });
}
updateChart();