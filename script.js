const hardmode = document.querySelector("#hardmode");
const hardmode1 = document.querySelector("#hardmode1");
const body = document.querySelector("body");
const maingame = document.querySelector(".main-game");
const title = document.querySelector(".title");
const character = document.querySelector(".body");
const joystick = document.querySelectorAll(".joy");
const topGrid = document.querySelectorAll(".grid.top");
const startbtnWrap = document.querySelector(".start");
const startbtn = document.querySelector(".start-btn");
const score = document.querySelector('.score');
const highscore = document.querySelector('.high-score');
const highscrvalue = document.querySelector('#highscr');
let dropInterval;
let game = 0;
let mode = 0;
let characterPosition = 1;
let difficulty = 4;
let i = 0;
let randomTopGrid = Math.floor(Math.random() * 4);
const start = () => {
  score.innerHTML = 0;
  score.style.display = "block";
  hardmode1.disabled = true;
  hardmode.disabled = true;
  topGrid.forEach(e => (e.innerHTML = " "));
  randomTopGrid = Math.floor(Math.random() * 4);
  startbtn.innerHTML = "RESTART";
  startbtnWrap.style.display = "none";
  game = 1;
  setTimeout(()=>{dropInterval = setInterval(drop, 0)},500)
};
const checkContact = () => {
  if (randomTopGrid == characterPosition - 1 && i >= 516) {
    hardmode1.disabled = false;
    hardmode.disabled = false;
    clearInterval(dropInterval);
    i = 0;
    game=0;
    // do poprawienia
    startbtnWrap.style.display = "flex";
  }
};
const drop = () => {
  topGrid[randomTopGrid].innerHTML = '<div class="obstacle1 drop0 easy"></div>';
  topGrid[randomTopGrid].style.top = `${i}%`;
  i += difficulty;
  checkContact();
  if (i > 630) {
    i = 0;
    score.innerHTML = parseInt(score.innerHTML) + 1;
    highscrvalue.innerHTML = parseInt(score.innerHTML)> parseInt(highscrvalue.innerHTML) ? score.innerHTML : highscrvalue.innerHTML;
    topGrid[randomTopGrid].innerHTML = "";
    randomTopGrid = Math.floor(Math.random() * 4);
  }
};
hardmode.oninput = () => {
  if (hardmode.checked) {
    highscore.style.color = '#c00000';
    startbtn.style.backgroundColor = "#c00000";
    startbtn.style.borderColor = "#FF9090";
    startbtn.style.color = "#300000";
    difficulty = 6;
    body.style.backgroundColor = "#300000";
    maingame.style.borderColor = "#993030";
    title.style.color = "#500000";
    hardmode1.checked = true;
    character.id = "red";
    mode = 1;
    joystick.forEach(e => {
      e.classList.add("red");
    });
  } else {
    highscore.style.color = '#12FF12';
    startbtn.style.backgroundColor = "#00c000";
    startbtn.style.borderColor = "#90FF90";
    startbtn.style.color = "#007000";
    difficulty = 4;
    title.style.color = "#009000";
    body.style.backgroundColor = "#007000";
    maingame.style.borderColor = "#309930";
    hardmode1.checked = false;
    character.id = "";
    mode = 0;
    joystick.forEach(e => {
      e.classList.remove("red");
    });
  }
};
hardmode1.oninput = () => {
  if (hardmode1.checked) {
    highscore.style.color = '#c00000';
    startbtn.style.backgroundColor = "#c00000";
    startbtn.style.borderColor = "#FF9090";
    startbtn.style.color = "#300000";
    difficulty = 6;
    body.style.backgroundColor = "#300000";
    maingame.style.borderColor = "#993030";
    title.style.color = "#500000";
    hardmode.checked = true;
    character.id = "red";
    mode = 1;
    joystick.forEach((e) => {
      e.classList.add("red");
    });
  } else {
    highscore.style.color = '#12FF12';
    startbtn.style.backgroundColor = "#00c000";
    startbtn.style.borderColor = "#90FF90";
    startbtn.style.color = "#007000";
    difficulty = 4;
    title.style.color = "#009000";
    body.style.backgroundColor = "#007000";
    maingame.style.borderColor = "#309930";
    hardmode.checked = false;
    character.id = "";
    mode = 0;
    joystick.forEach((e) => {
      e.classList.remove("red");
    });
  }
};
const move = (e) => {
  if(game==1){
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
      joystick[0].click();
    }
    if (e.code == "ArrowRight" || e.code == "KeyD") {
      joystick[1].click();
    }
    
  }
};
joystick[0].addEventListener("click", () => {
  if(game==1){
    characterPosition =
      characterPosition > 1 ? characterPosition - 1 : characterPosition;
    character.classList.remove("pos1", "pos2", "pos3", "pos4");
    character.classList.add(`pos${characterPosition}`);
    joystick[0].classList.add('active');
    setTimeout(()=>{joystick[0].classList.remove('active')},0);
  }
});
joystick[1].addEventListener("click", () => {
  if(game==1){
    characterPosition =
      characterPosition < 4 ? characterPosition + 1 : characterPosition;
    character.classList.remove("pos1", "pos2", "pos3", "pos4");
    character.classList.add(`pos${characterPosition}`);
    joystick[1].classList.add('active');
    setTimeout(()=>{joystick[1].classList.remove('active')},0);
  }
});
startbtn.addEventListener("click", start);
addEventListener("keydown", move);
