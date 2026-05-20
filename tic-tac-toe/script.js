// Keep track of the game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;

// DOM Elements
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.querySelector("#status");
const resetButton = document.querySelector("#reset-btn");

// All possible winning combinations (indexes in the 3x3 grid)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to handle a cell being clicked
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    // Check if the cell is already played or if the game is over
    if (board[clickedCellIndex] !== "" || !isGameActive) {
        return;
    }

    // Update the board array and the screen
    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    // Check if anyone won or if it's a draw
    checkResult();
}

// Function to check the game results
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} Wins! 🎉`;
        isGameActive = false;
        return;
    }

    // If no one won and there are no empty spaces, it's a tie
    let roundDraw = !board.includes("");
    if (roundDraw) {
        statusDisplay.innerText = "Game is a Draw! 🤝";
        isGameActive = false;
        return;
    }

    // Switch players if nobody won yet
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Player ${currentPlayer}'s turn`;
}

// Function to reset the game back to the start
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    statusDisplay.innerText = "Player X's turn";
    cells.forEach(cell => cell.innerText = "");
}

// Attach event listeners to the cells and reset button
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);