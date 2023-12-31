let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    //Limpiar cualquier timer existente
    clearInterval(countdown);
    const now = Date.now();  //Tomamos la fecha actual en milisegundos
    const then = now + seconds * 1000; //Multiplicamos por 1000 porque now da el tiempo en milisegundos
    displayTimeLeft(seconds); //Muestra los segundos inmediatamente sin pasar por el segundo, para que muestre los segundos exactos
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000); //Redondeamos y vamos restando los segundos
        //Verificar si lo tenemos que parar
        if(secondsLeft < 0){
            clearInterval(countdown);
            return; //Va a detener la función
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60); //Convertimos y redondeamos los segundos
    const remainderSeconds = seconds % 60; //Buscamos el resto de lo que nos queda de segundos 
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;
    //Si remainderSeconds es menor a 10, tendreos que regresar un 0 y nada o los remainderseconds
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp); //Obtenemos el tiempo actual
    const hour = end.getHours(); //Obtenemos las horas actuales
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes(); 
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
e.preventDefault();
const mins = this.minutes.value;
console.log(mins);
  timer(mins * 60);
this.reset();
});

