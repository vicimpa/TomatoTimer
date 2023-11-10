let timer = new Timer();

let test = document.getElementById("taimers");

test.innerHTML = timer.createTimer();
timer.setTime(0, 1, 1);
