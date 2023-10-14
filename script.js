let currentPlayer = "X";
let isAiMode = false;
let isPlay = false;
let board = ["", "", "", "", "", "", "", "", ""];
const toggle = document.querySelector('.switch input');

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function toggleMode() {
    if(!isPlay){
        isAiMode = !isAiMode;
        const button = document.querySelector('.options button');
        button.textContent = isAiMode ? "Play with AI" : "Play with Human";
        resetBoard();
    }
}

function disableToggle() {
    if(isPlay){
        toggle.disabled = true;
    }
}

function handleClick(event) {
    isPlay = true;
    disableToggle();
    const index = Array.from(event.target.parentNode.children).indexOf(event.target);
    if (board[index] === "") {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            resetBoard();
        } else if (checkDraw()) {
            alert("It's a draw!");
            resetBoard();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (isAiMode && currentPlayer === "O") {
                aiMove();
            }
        }
    }
}

function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function checkDraw() {
    return board.every(cell => cell !== "");
}

function resetBoard() {
    isPlay = false;
    toggle.disabled = false;
    board = ["", "", "", "", "", "", "", "", ""];
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = "";
    });
}

function aiMove() {
    const availableMoves = board.reduce((acc, cell, index) => (cell === "" ? acc.concat(index) : acc), []);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const move = availableMoves[randomIndex];
    board[move] = currentPlayer;
    document.getElementById("board").children[move].textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        alert(`${currentPlayer} wins!`);
        resetBoard();
    } else if (checkDraw()) {
        alert("It's a draw!");
        resetBoard();
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}