const hourHand = document.querySelector(".hour-hand");
const minuteHand = document.querySelector(".minute-hand");
const secondHand = document.querySelector(".second-hand");

let hour = new Date().getHours();
if (hour > 12) hour -= 12;
let second = new Date().getSeconds();
let minute = new Date().getMinutes();

let secondDegree = second * 6;
let minuteDegree = minute * 6 + (6 / 60) * second;
let hourDegree = hour * 30 + (30 / 60) * minute + (30 / 3600) * second;

secondHand.style.rotate = `${secondDegree}deg`;
minuteHand.style.rotate = `${minuteDegree}deg`;
hourHand.style.rotate = `${hourDegree}deg`;

setInterval(() => {
  hour = new Date().getHours();
  if (hour > 12) hour -= 12;
  second = new Date().getSeconds();
  minute = new Date().getMinutes();
  
  
  secondDegree = second * 6;
  minuteDegree = minute * 6 + (6 / 60) * second;
  hourDegree = hour * 30 + (30 / 60) * minute + (30 / 3600) * second;

  secondHand.style.rotate = `${secondDegree}deg`;
  minuteHand.style.rotate = `${minuteDegree}deg`;
  hourHand.style.rotate = `${hourDegree}deg`;
}, 1000);
