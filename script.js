let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

function print(txt) {
    display.innerHTML = txt;
}

function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    startStopBtn.textContent = 'Pause';
}

function pause() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
}

function stop() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function lap() {
    let lapTime = timeToString(elapsedTime);
    let lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.innerText = lapTime;
    lapsContainer.appendChild(lapElement);
}

startStopBtn.addEventListener('click', () => {
    if (!isRunning) {
        start();
    } else {
        pause();
    }
    isRunning = !isRunning;
});

stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
