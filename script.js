const gameArea=document.getElementById('gameArea');
const car=document.getElementById('car');
const leftButton=document.getElementById('leftButton');
const rightButton=document.getElementById('rightButton');
const levelDisplay=document.getElementById('levelDisplay');
const timeDisplay=document.getElementById('timeDisplay');
const coinsDisplay=document.getElementById('coinsDisplay');
const gameOverScreen=document.getElementById('gameOver');

let currentLevel=1;
const maxLevels=5;
const levelWidths=[300,500,700,900,1100];
const coinsPerLevel=10;
const timePerLevel=10; // in seconds
let remainingTime=timePerLevel;
let coinsCollected=0;
let timerInterval;

function setLevel(level){
    if (level > maxLevels) {
        gameOver();
        return;
    }
    gameArea.style.width=levelWidths[level-1]+'px'; //Sets the width of gameArea based on the level.
    car.style.left='0px';
    remainingTime=timePerLevel;
    coinsDisplay.textContent=`Coins: ${coinsCollected}`;
    levelDisplay.textContent=`Level: ${level}`;
    startTimer();
}
function moveCar(direction){
    if (currentLevel > maxLevels || remainingTime <= 0) {
        return; // Don't move if the game is over or time is up
    }
    const carRect=car.getBoundingClientRect();   //Retrieves the current position of the car (carRect)
    const gameAreaRect=gameArea.getBoundingClientRect();  //Retrieves the current boundaries of the game area (gameAreaRect).
    const step=10;
    if (direction==='right'&&carRect.right<gameAreaRect.right){
        car.style.left=car.offsetLeft+step+'px';
    }
    if (direction==='left'&&carRect.left>gameAreaRect.left){
        car.style.left=car.offsetLeft-step+'px';
    }
    if (carRect.right>=gameAreaRect.right){
        currentLevel++;
        collectCoins();
        setLevel(currentLevel);
    }
}
function collectCoins(){
    coinsCollected+=coinsPerLevel;
    coinsDisplay.textContent=`Coins:${coinsCollected}`;
}
function startTimer(){
    clearInterval(timerInterval);
    timerInterval=setInterval(()=>{
        remainingTime--;
        timeDisplay.textContent=`Time:${remainingTime}s`;
        if (remainingTime<=0) {
            gameOver();
        }
    },1000); // Update timer every second
}
function gameOver(){
    clearInterval(timerInterval);
    gameOverScreen.style.display='block';
}
//Event Listener for keyboard control
document.addEventListener('keydown',(event)=>{
    if (event.key==='ArrowRight') {
        moveCar('right');
    }
    if (event.key==='ArrowLeft') {
        moveCar('left');
    }
});
leftButton.addEventListener('click',()=>moveCar('left'));
rightButton.addEventListener('click',()=>moveCar('right'));
setLevel(currentLevel);