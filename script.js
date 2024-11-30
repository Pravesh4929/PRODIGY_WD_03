let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let player1Name = "";
let player2Name = "";

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    player1Name = document.getElementById("player1").value || "Player 1";
    player2Name = document.getElementById("player2").value || "Player 2";
    currentPlayer = "X";
    gameActive = true;
    document.getElementById("status").textContent = `${player1Name} (X)'s turn`;
}

function makeMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = currentPlayer;
        const cell = document.getElementsByClassName("cell")[index];
        cell.textContent = currentPlayer;
        cell.classList.add("filled"); // Add filled class to control color
        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            const currentPlayerName = currentPlayer === "X" ? player1Name : player2Name;
            document.getElementById("status").textContent = `${currentPlayerName} (${currentPlayer})'s turn`;
        }
    }
}

function checkWinner() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            const winnerName = board[a] === "X" ? player1Name : player2Name;
            document.getElementById("status").textContent = `${winnerName} (${board[a]}) wins!`;
            return;
        }
    }
    if (!board.includes("")) {
        gameActive = false;
        document.getElementById("status").textContent = "It's a draw!";
    }
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = false;
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("filled");
    });
    document.getElementById("status").textContent = "Enter player names and start the game.";
}

function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    const themeIcon = document.getElementById("theme-icon");
    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☀️"; // Sun icon for dark theme
    } else {
        themeIcon.textContent = "🌙"; // Moon icon for light theme
    }
}
