document.addEventListener("DOMContentLoaded", () => {
    let button = document.querySelector("#submit");
    let container = document.querySelector(".container");

    button.addEventListener("click", () => {
        let player1 = document.querySelector("#player1").value.trim();
        let player2 = document.querySelector("#player2").value.trim();

        if (!player1 || !player2) {
            alert("Please enter both player names!");
            return;
        }

        let currentPlayer = player1;
        let currentSymbol = "X";
        let board = ["", "", "", "", "", "", "", "", ""];

    
       

    
        container.innerHTML = `
            <h1 style="color: white;">Tic Tac Toe</h1>
            <div class="message" style="color: white;">${player1}, you're up</div>
            <div class="board" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px;">
                ${Array(9).fill().map((_, i) => `<button class="cell" id="${i}" style="width:100px;height:100px;font-size:2em;"></button>`).join('')}
            </div>
        `;

        let message = document.querySelector(".message");
        let cells = document.querySelectorAll(".cell");

        cells.forEach((cell, index) => {
            cell.addEventListener("click", () => {
                if (board[index] !== "") return;

                cell.innerText = currentSymbol;
                cell.disabled = true; 
                board[index] = currentSymbol;

                if (checkWinner(board)) {
                    message.innerHTML = `<b>${currentPlayer}, congratulations! You won! 🎉</b>`;
                    disableBoard();
                    return;
                }

                if (board.every(cell => cell !== "")) {
                    message.innerHTML = `<b>It's a draw! 🤝</b>`;
                    return;
                }

                currentSymbol = currentSymbol === "X" ? "O" : "X";
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                message.innerHTML = `${currentPlayer}, you're up`;
            });
        });

        function checkWinner(board) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]             
            ];
            return winPatterns.some(pattern => {
                let [a, b, c] = pattern;
                return board[a] && board[a] === board[b] && board[b] === board[c];
            });
        }

        function disableBoard() {
            cells.forEach(cell => cell.disabled = true);
        }
    });
});
