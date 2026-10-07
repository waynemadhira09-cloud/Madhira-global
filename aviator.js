/* =================================
   MADHIRA AVIATOR
   VIRTUAL CREDITS ONLY
================================= */

let balance = 1000;

let gameState = "waiting";

let currentBet = 0;

let currentMultiplier = 1.00;

let crashPoint = 0;

let gameTimer = null;

let mode = "manual";


/* =================================
   ELEMENTS
================================= */

const balanceElement =
    document.getElementById("balance");

const multiplierElement =
    document.getElementById("multiplier");

const gameArea =
    document.getElementById("game-area");

const liveLabel =
    document.getElementById("live-label");

const gameMessage =
    document.getElementById("game-message");

const crashedText =
    document.getElementById("crashed-text");

const betInput =
    document.getElementById("bet-amount");

const betButton =
    document.getElementById("bet-button");

const cashoutButton =
    document.getElementById("cashout-button");

const currentBetElement =
    document.getElementById("current-bet");

const potentialWinElement =
    document.getElementById("potential-win");

const resultElement =
    document.getElementById("result");

const playersList =
    document.getElementById("players-list");

const playersCount =
    document.getElementById("players-count");

const historyList =
    document.getElementById("game-history-list");


/* =================================
   INITIALIZE
================================= */

updateBalance();

showWaiting();


/* =================================
   BALANCE
================================= */

function updateBalance() {

    balanceElement.textContent =
        balance.toFixed(2);

}


/* =================================
   BET AMOUNT
================================= */

function setBet(amount) {

    betInput.value = amount;

}


function changeBet(amount) {

    let value =
        Number(betInput.value) || 0;

    value += amount;

    if (value < 1) {
        value = 1;
    }

    betInput.value = value;

}


/* =================================
   MODE
================================= */

function setMode(selectedMode) {

    mode = selectedMode;

    const manualTab =
        document.getElementById("manual-tab");

    const autoTab =
        document.getElementById("auto-tab");

    if (mode === "manual") {

        manualTab.classList.add("active");
        autoTab.classList.remove("active");

    } else {

        autoTab.classList.add("active");
        manualTab.classList.remove("active");

    }

}


/* =================================
   PLACE BET
================================= */

function placeBet() {

    if (gameState === "flying") {

        resultElement.textContent =
            "A round is already running.";

        return;
    }

    const amount =
        Number(betInput.value);

    if (!amount || amount <= 0) {

        resultElement.textContent =
            "Enter a valid bet amount.";

        return;
    }

    if (amount > balance) {

        resultElement.textContent =
            "Not enough virtual credits.";

        return;
    }


    /* TAKE BET */

    balance -= amount;

    currentBet = amount;

    updateBalance();

    currentBetElement.textContent =
        amount.toFixed(2);

    potentialWinElement.textContent =
        amount.toFixed(2);


    /* START ROUND */

    startRound();

}


/* =================================
   START ROUND
================================= */

function startRound() {

    clearInterval(gameTimer);

    gameState = "flying";

    currentMultiplier = 1.00;

    /*
       Random crash point.

       This is only a virtual
       demonstration.
    */

    crashPoint =
        generateCrashPoint();


    gameArea.classList.remove("flying");

    void gameArea.offsetWidth;

    gameArea.classList.add("flying");


    multiplierElement.textContent =
        "1.00x";

    crashedText.style.display =
        "none";

    liveLabel.textContent =
        "FLYING";

    gameMessage.textContent =
        "Cash out before the crash!";

    cashoutButton.disabled =
        false;

    betButton.disabled =
        true;


    /*
       Update multiplier
    */

    gameTimer = setInterval(
        updateGame,
        100
    );

}


/* =================================
   GAME UPDATE
================================= */

function updateGame() {

    if (gameState !== "flying") {
        return;
    }


    /*
       Increase multiplier
    */

    currentMultiplier +=
        0.01 +
        (currentMultiplier * 0.004);


    currentMultiplier =
        Number(
            currentMultiplier.toFixed(2)
        );


    multiplierElement.textContent =
        currentMultiplier.toFixed(2) +
        "x";


    /*
       Potential win
    */

    const potential =
        currentBet *
        currentMultiplier;

    potentialWinElement.textContent =
        potential.toFixed(2);


    /*
       AUTO CASH OUT
    */

    const autoCheck =
        document.getElementById(
            "auto-cashout-check"
        );

    const autoValue =
        Number(
            document.getElementById(
                "auto-value"
            ).value
        );


    if (
        autoCheck.checked &&
        autoValue > 1 &&
        currentMultiplier >= autoValue
    ) {

        cashOut();

        return;
    }


    /*
       CRASH
    */

    if (
        currentMultiplier >=
        crashPoint
    ) {

        crashGame();

    }

}


/* =================================
   CRASH POINT
================================= */

function generateCrashPoint() {

    /*
       Produces a random virtual
       crash multiplier.

       Minimum: 1.10x
       Maximum: about 10x
    */

    const random =
        Math.random();

    let point;


    if (random < 0.50) {

        point =
            1.10 +
            Math.random() * 0.90;

    } else if (random < 0.80) {

        point =
            2.00 +
            Math.random() * 2.00;

    } else if (random < 0.95) {

        point =
            4.00 +
            Math.random() * 3.00;

    } else {

        point =
            7.00 +
            Math.random() * 3.00;

    }


    return Number(
        point.toFixed(2)
    );

}


/* =================================
   CASH OUT
================================= */

function cashOut() {

    if (gameState !== "flying") {
        return;
    }

    if (currentBet <= 0) {
        return;
    }


    const multiplier =
        currentMultiplier;


    const winnings =
        currentBet *
        multiplier;


    balance += winnings;

    updateBalance();


    resultElement.textContent =
        "Cashed out at " +
        multiplier.toFixed(2) +
        "x — +" +
        winnings.toFixed(2) +
        " credits.";


    addGameHistory(
        multiplier,
        true
    );


    currentBet = 0;

    currentBetElement.textContent =
        "0.00";

    potentialWinElement.textContent =
        "0.00";


    cashoutButton.disabled =
        true;


    /*
       The round continues after
       the player cashes out.
    */

}


/* =================================
   CRASH
================================= */

function crashGame() {

    clearInterval(gameTimer);

    gameState = "crashed";

    gameArea.classList.remove("flying");

    multiplierElement.textContent =
        crashPoint.toFixed(2) +
        "x";


    crashedText.style.display =
        "block";

    liveLabel.textContent =
        "ROUND CRASHED";

    gameMessage.textContent =
        "Crashed at " +
        crashPoint.toFixed(2) +
        "x";


    cashoutButton.disabled =
        true;

    betButton.disabled =
        false;


    /*
       If player still had an
       active bet, it is lost.
    */

    if (currentBet > 0) {

        resultElement.textContent =
            "Crashed at " +
            crashPoint.toFixed(2) +
            "x — Bet lost.";

        addGameHistory(
            crashPoint,
            false
        );

    }


    currentBet = 0;

    currentBetElement.textContent =
        "0.00";

    potentialWinElement.textContent =
        "0.00";


    /*
       Add crash multiplier
       to top history.
    */

    addMultiplierHistory(
        crashPoint
    );


    /*
       Start another round
       after a short delay.
    */

    setTimeout(
        showWaiting,
        3000
    );

}


/* =================================
   WAITING
================================= */

function showWaiting() {

    clearInterval(gameTimer);

    gameState = "waiting";

    currentMultiplier = 1.00;

    multiplierElement.textContent =
        "1.00x";

    crashedText.style.display =
        "none";

    gameArea.classList.remove("flying");

    liveLabel.textContent =
        "WAITING FOR NEXT ROUND";

    gameMessage.textContent =
        "Place your bet";

    betButton.disabled =
        false;

    cashoutButton.disabled =
        true;

    /*
       Automatically start a new
       round after 2 seconds if
       there is no active bet.
    */

    setTimeout(
        startDemoRound,
        2000
    );

}


/* =================================
   DEMO ROUND
================================= */

function startDemoRound() {

    if (gameState !== "waiting") {
        return;
    }

    /*
       A demo round runs even if
       the player hasn't bet.
    */

    gameState = "flying";

    currentMultiplier = 1.00;

    crashPoint =
        generateCrashPoint();


    gameArea.classList.remove("flying");

    void gameArea.offsetWidth;

    gameArea.classList.add("flying");


    liveLabel.textContent =
        "FLYING";

    gameMessage.textContent =
        currentBet > 0
            ? "Cash out before the crash!"
            : "Round in progress";


    gameTimer = setInterval(
        updateGame,
        100
    );


    betButton.disabled =
        currentBet > 0;


    cashoutButton.disabled =
        currentBet <= 0;

}


/* =================================
   MULTIPLIER HISTORY
================================= */

function addMultiplierHistory(
    multiplier
) {

    const bar =
        document.getElementById(
            "multiplier-history"
        );


    const item =
        document.createElement("span");


    item.textContent =
        multiplier.toFixed(2) +
        "x";


    bar.prepend(item);


    while (bar.children.length > 8) {

        bar.removeChild(
            bar.lastChild
        );

    }

}


/* =================================
   GAME HISTORY
================================= */

function addGameHistory(
    multiplier,
    won
) {

    if (
        historyList.textContent.includes(
            "No completed games yet."
        )
    ) {

        historyList.innerHTML = "";

    }


    const row =
        document.createElement("div");

    row.className =
        "history-row";


    const text =
        document.createElement("span");


    text.textContent =
        won
            ? "Cashed out"
            : "Crashed";


    const value =
        document.createElement("strong");


    value.textContent =
        multiplier.toFixed(2) +
        "x";


    row.appendChild(text);

    row.appendChild(value);

    historyList.prepend(row);


    while (
        historyList.children.length > 10
    ) {

        historyList.removeChild(
            historyList.lastChild
        );

    }

}


/* =================================
   DEMO PLAYERS
================================= */

function createDemoPlayers() {

    const names = [
        "Player_21",
        "MadhiraUser",
        "Player_88",
        "Guest_42",
        "Player_07"
    ];


    playersList.innerHTML = "";


    const number =
        Math.floor(
            Math.random() * 5
        ) + 1;


    for (
        let i = 0;
        i < number;
        i++
    ) {

        const row =
            document.createElement("div");

        row.className =
            "player-row";


        const name =
            document.createElement("span");

        name.className =
            "player-name";

        name.textContent =
            names[i];


        const amount =
            document.createElement("span");

        amount.className =
            "player-amount";

        amount.textContent =
            Math.floor(
                Math.random() * 450
            ) + 10;


        row.appendChild(name);

        row.appendChild(amount);

        playersList.appendChild(row);

    }


    playersCount.textContent =
        number +
        " Players";

}


createDemoPlayers();


setInterval(
    createDemoPlayers,
    5000
);
