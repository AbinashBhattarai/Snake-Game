const gameBoard = document.querySelector(".game-board");
const context = gameBoard.getContext("2d");

const newScoreVal = document.querySelector(".new-score");
const banner = document.querySelector(".banner");
const restart = document.querySelector(".restart-btn");
const currentScoreBoard = document.querySelector(".current-score");
const lastScoreBoard = document.querySelector(".last-score");
const highScoreBoard = document.querySelector(".high-score");

const blockSize = 25;
let rows = 20;
let cols = 20;
gameBoard.width = cols * blockSize;
gameBoard.height = rows * blockSize;
let snakeX = blockSize * 3;
let snakeY = blockSize * 3;
let snakeBody = [];
let preyX;
let preyY;

let velocityX = 0;
let velocityY = 0;

let currentScore = 0;
let lastScore = 0;
let highScore = 0;
let timerId = null;

function start(){
  currentScoreBoard.textContent = currentScore;
  lastScoreBoard.textContent = lastScore;
  highScoreBoard.textContent = highScore;
  restart.style.display = "none"
  banner.style.display = "block";
  setTimeout(() => {
    banner.style.display = "none";
  }, 1000);

  createPrey();
  document.addEventListener("keydown", changeDirection);
  timerId = setInterval(update, 100);
}

function update(){
  context.fillStyle = "rgb(186, 185, 184)";
  context.fillRect(0, 0, gameBoard.width, gameBoard.height);

  context.fillStyle="red";
  context.fillRect(preyX, preyY, blockSize, blockSize);

  
  if (snakeX == preyX && snakeY == preyY) {
    currentScore++;
    currentScoreBoard.textContent = currentScore;
    snakeBody.push([preyX, preyY]);
    createPrey();
  }

  for(let i = snakeBody.length-1; i>0; i--){
    snakeBody[i] = snakeBody[i-1];
  }
  if(snakeBody.length){
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "brown";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for(let i = 0; i<snakeBody.length; i++){
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  if(snakeX < 0 || snakeX >= gameBoard.width || snakeY < 0 || snakeY >= gameBoard.height){
    gameOver();
  }
  for(let i = 0; i < snakeBody.length; i++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
      gameOver();
    }
  }
}

function createPrey() {
  preyX = Math.floor(Math.random() * cols) * blockSize;
  preyY = Math.floor(Math.random() * rows) * blockSize;
}
function changeDirection(e){
  if(e.key == "ArrowRight" && velocityX != -1){
    velocityX = 1;
    velocityY = 0;
  }
  else if(e.key == "ArrowLeft" && velocityX != 1){
    velocityX = -1;
    velocityY = 0;
  }
  else if(e.key == "ArrowUp" && velocityY != 1){
    velocityX = 0;
    velocityY = -1;
  }
  else if(e.key == "ArrowDown" && velocityY != -1){
    velocityX = 0;
    velocityY = 1;
  }

}

function gameOver(){
  context.fillStyle = "rgb(186, 185, 184)";
  context.fillRect(0, 0, gameBoard.width, gameBoard.height);
  context.font = "35px MV Boli";
  context.fillStyle = "black";
  context.textAlign = "center";
  context.fillText("Game Over! Please Wait!!", blockSize*10, blockSize*5);
  restart.style.display = "block";
  clearInterval(timerId);

  lastScore = currentScore;
  if(lastScore > highScore){
    highScore = lastScore;
  }
  currentScore = 0;
  snakeX = blockSize * 3;
  snakeY = blockSize * 3;
  snakeBody = [];

  velocityX = 0;
  velocityY = 0;

  restart.addEventListener("click", start);
}

start();