let time = 60 * 60;

let timerStarted = false;



function startTimer(){


if(timerStarted)
return;


timerStarted=true;



setInterval(()=>{


let minutes =
Math.floor(time/60);


let seconds =
time%60;



document
.getElementById("timer")
.innerText =

`${minutes}:${seconds
.toString()
.padStart(2,'0')}`;



if(time>0)
time--;



},1000);


}