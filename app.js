console.log(..."Simon Says Game Console");
let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;

let btn = document.querySelectorAll(".btn");
let displayText = document.querySelector("h2");

document.addEventListener("click", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("Flash");
    console.log("Adding Flash");
    setTimeout(function () {
        btn.classList.remove("Flash");
        console.log("Removing Flash");
    }, 80);

};

function userBtnFlash(btn) {
    btn.classList.add("userFlash");
    console.log("Adding User Flash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
        console.log("Removing User Flash");
    }, 150);

};

function levelUp() {
    userSeq = [];
    level++;
    displayText.innerText = `Level ${level}`;
    //random btn choose
    let randIndx = Math.floor(Math.random() * 4);
    // console.log(randIndx);
    let randCol = btns[randIndx];
    // console.log(randCol);
    let randBtn = document.querySelector(`.${randCol}`)
    // console.log(randBtn);
    btnFlash(randBtn);
    gameSeq.push(randCol);
    console.log(gameSeq);

};

function wrongAns() {
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
        document.querySelector("body").style.backgroundColor = "white";
    }, 150);
};

function checkAns() {
    let idx = userSeq.length - 1;  // Compare based on current input index

    if (userSeq[idx] !== gameSeq[idx]) {  
        displayText.innerHTML = `Game Over!<br> Your Score : <b> **${level}**<b> <br> Press any key to START again`;
        wrongAns();
        reset();
        return;  // Exit early to prevent further execution
    }

    // If user sequence matches completely, move to next level
    if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
    }
};


function btnPressed(event) {
    let btn = event.target;

    userBtnFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length - 1);
};

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPressed);
};

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
};




