let estudiarTittle = document.getElementById('estudiar');
let descansarTittle = document.getElementById('descanso');

let estudiarTime = 25; // tiempo de estudio en minutos
let descansoTime = 5;  // tiempo de descanso en minutos

let seconds = 0;
let isStudying = true; // variable para saber si estamos en tiempo de estudio o descanso
let timerInterval;

// Display inicial
window.onload = () => {
    document.getElementById('minutes').innerHTML = (estudiarTime < 10 ? "0" : "") + estudiarTime;
    document.getElementById('seconds').innerHTML = '00';
    estudiarTittle.classList.add('active');
}

// Start timer
function start() {
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    let studyMinutes = estudiarTime - 1; // Restamos 1 para comenzar correctamente
    let breakMinutes = descansoTime - 1; // Restamos 1 para comenzar correctamente
    seconds = 60;

    let timerFunction = () => {
        seconds--;

        if (seconds === -1) {
            if (isStudying && studyMinutes === 0) {
                isStudying = false;
                studyMinutes = estudiarTime;
                breakMinutes = descansoTime - 1;
                seconds = 59;
                descansarTittle.classList.add('active');
                estudiarTittle.classList.remove('active');
            } else if (!isStudying && breakMinutes === 0) {
                isStudying = true;
                breakMinutes = descansoTime;
                studyMinutes = estudiarTime - 1;
                seconds = 59;
                estudiarTittle.classList.add('active');
                descansarTittle.classList.remove('active');
            } else {
                if (isStudying) {
                    studyMinutes--;
                } else {
                    breakMinutes--;
                }
                seconds = 59;
            }
        }

        document.getElementById('minutes').innerHTML = (isStudying ? (studyMinutes < 10 ? "0" : "") + studyMinutes : (breakMinutes < 10 ? "0" : "") + breakMinutes);
        document.getElementById('seconds').innerHTML = (seconds < 10 ? "0" : "") + seconds;
    }

    timerInterval = setInterval(timerFunction, 1000);
}

// Reset timer
function reset() {
    clearInterval(timerInterval);
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";
    document.getElementById('minutes').innerHTML = (estudiarTime < 10 ? "0" : "") + estudiarTime;
    document.getElementById('seconds').innerHTML = '00';
    seconds = 0;
    isStudying = true;
    estudiarTittle.classList.add('active');
    descansarTittle.classList.remove('active');
}