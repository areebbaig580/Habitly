const back = document.querySelector('.symbol');
const percent = document.querySelector('.complPercent');
const percentDet = document.querySelector('.percentDet');
const streakEl = document.querySelector('.streak');
const tracked = document.querySelector('.tracked');
const chartFilter = document.querySelector('.dropdownMain');
const ctx2 = document.getElementById('barChart');

back.addEventListener('click', (evt) => {
    window.location.href = "../index.html";
});
chartFilter.addEventListener('change', (evt) => {
    updateChart(evt.target.value);
});

function progressSystem() {
    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
    let streeks = JSON.parse(localStorage.getItem('streeks')) || 0;
    let lastStreakDate = localStorage.getItem('lastStreakDate');
    let today = new Date().toISOString().split('T')[0];
    let yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let compHabits = habitList.filter(h => h.completed === true).length;
    let totHabits = habitList.length;
    let percentage = ((compHabits / totHabits) * 100).toFixed(1) ;
    
    if (percentage >= 60) {
        if (lastStreakDate === yesterday) {
            streeks = streeks + 1;
            localStorage.setItem('streeks', JSON.stringify(streeks));
            localStorage.setItem('lastStreakDate', today);
        };
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
    let completedHabits = JSON.parse(localStorage.getItem('completedHabits'));
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let FirstDate = new Date(year, month, 1);
    let monthName = today.toLocaleString('default', { month: 'short' });

    let datedata = [];
    let date = [];
    for (let i = 0; i < daysInMonth; i++) {
        let currDate = new Date(FirstDate);
        currDate.setDate(FirstDate.getDate() + i);
        let today = currDate.getDate();
        let dateStr = currDate.toISOString().split('T')[0];

        let totCompleted = completedHabits.filter(c => c.date === dateStr);

        if (totCompleted.length > 0) {
            date.push(`${today} ${monthName}`);
            datedata.push(`${totCompleted[0].completedLen}`)
        } else {
            date.push(`${today} ${monthName}`);
            datedata.push(0)
        }

    }
    return { date, datedata };

};
const ctx = document.getElementById('myChart');
let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
let max = habitList.length;
let myChart;
myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Habit Completed',
            data: [],
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

function updateChart(choice) {
    let weekProgress = weeklyActivity();
    let monthProgress = monthlyActivity();
    let monthDate = monthProgress.date;
    let dateData = monthProgress.datedata;

    let label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let data = weekProgress;

    if (choice === 'Daily') {
        label = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        data = weekProgress;
    } else if (choice === 'Monthly') {
        label = monthDate;
        data = dateData;
    } else if (choice === 'Year') {
        label = [];
        data = []
    };

    myChart.data.labels = label;
    myChart.data.datasets[0].data = data;
    myChart.update();


}
updateChart('Daily');

function updateChart2() {
    let habitList = JSON.parse(localStorage.getItem('habitList')) || [];
    let completedHabits = JSON.parse(localStorage.getItem('completedHabits'));
    let label = [];
    let habitColor = []
    for (let habit of habitList) {
        label.push(habit.name);
        habitColor.push(habit.color);
    }
    let today = new Date();
    let refdate = new Date(today);
    refdate.setDate(today.getDate() - 30);
    dateStr = refdate.toISOString().split('T')[0];

    let habitsCompletedIn30 = completedHabits.filter(s => s.date >= dateStr);

    let habitScore = {};

    // inialising every habit to 0 

    for (let habit of habitList) {
        habitScore[habit.name] = 0;
    };

    for (let entry of habitsCompletedIn30) {
        for (let completedHabit of entry.completed) {
            if (habitScore.hasOwnProperty(completedHabit.name)) {
                habitScore[completedHabit.name]++;
            };
        };
    };

    let data = label.map(name => habitScore[name]) || 0;


    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'Habit Score',
                data: data,
                backgroundColor: habitColor,
                borderColor: 'black',
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 30,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
};
updateChart2();
