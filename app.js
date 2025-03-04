let gameSequence = [];
let userSequence = [];
let level = 0;
const colors = ["yellow", "red", "green", "purple"];
const startButton = document.getElementById("start-game");
const modal = document.getElementById("instruction-modal");
const levelText = document.getElementById("level");

// Hide Modal & Start Game
startButton.addEventListener("click", function() {
    modal.style.display = "none"; // Hide instruction popup
    startGame();
});

// Start Game Function
function startGame() {
    level = 1;
    gameSequence = [];
    userSequence = [];
    nextLevel();
}

// Next Level Function
function nextLevel() {
    userSequence = [];
    levelText.innerText = level;

    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(randomColor);

    flashSequence();
}

// Flashing Sequence Function
function flashSequence() {
    let i = 0;
    const interval = setInterval(() => {
        let btn = document.getElementById(gameSequence[i]);
        btn.classList.add("flash");

        setTimeout(() => {
            btn.classList.remove("flash");
        }, 110);

        i++;
        if (i >= gameSequence.length) {
            clearInterval(interval);
        }
    }, 150);
}

// Button Click Event
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function() {
        let clickedColor = this.id;
        userSequence.push(clickedColor);
        userFlashButton(clickedColor);
        checkAnswer(userSequence.length - 1);
    });
});

// Flash Clicked Button
function flashButton(color) {
    let btn = document.getElementById(color);
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 110);
}

function userFlashButton(color) {
    let btn = document.getElementById(color);
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 110);
}

function wrongAns() {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    }, 150);
};

// Check User Input
function checkAnswer(currentIndex) {
    if (userSequence[currentIndex] !== gameSequence[currentIndex]) { 
        levelText.innerHTML = `Game Over!<br> <br> Your Score : <b> **${level}**<b> <br> <br> Take a breath, GAME will restart in 4 Sec`;
        wrongAns();
        setTimeout(function () {
            modal.style.display = "block";  // Show modal again
            levelText.innerText = "1";
        }, 4000);
        return;
    }

    if (userSequence.length === gameSequence.length) {
        setTimeout(() => {
            level++;
            nextLevel();
        }, 800);
    }
}
