const board = document.getElementById("box-container");
const currentUserMessage = document.getElementById("player-indication");
const winner = document.getElementById("winner");
const draw = document.getElementById("draw");
let currentPlayer = "X";
let boxes = Array(9).fill("");
currentUserMessage.textContent = `Player ${currentPlayer}'s Turn`;
let gameActive = true;

const renderBoard = () => {
  board.innerHTML = "";
  boxes.forEach((box, index) => {
    let element = document.createElement("div");
    element.classList.add("box");
    element.textContent = box;
    element.addEventListener("click", () => handleBoxClick(index));
    board.appendChild(element);
  });
};

const setMessage = (currentPlayer, winnerFlag = false, drawFlag = false) => {
  if (winnerFlag) {
    winner.textContent = `Player ${currentPlayer} Win!`;
    currentUserMessage.style.display = "none";
  } else if (drawFlag) {
    draw.textContent = `Its Draw`;
    currentUserMessage.style.display = "none";
  } else {
    currentUserMessage.textContent = `Player ${currentPlayer}'s Turn`;
  }
};

const handleBoxClick = (index) => {
  if (!gameActive || boxes[index] !== "") return;
  boxes[index] = currentPlayer;
  renderBoard();
  checkGameStatus();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  setMessage(currentPlayer);
};

const checkGameStatus = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      setMessage(currentPlayer, true);
      gameActive = false;
      setWinnerCombo(combo);
      return;
    }
  }
  if (!boxes.includes("")) {
    setMessage(currentPlayer, false, true);
    gameActive = false;
    return;
  }
};
function setWinnerCombo(combo) {
  combo.forEach((index) => {
    board.children[index].classList.add("winner-box")
  });
}
const reset = () => {
  currentPlayer = "X";
  boxes = Array(9).fill("");
  draw.textContent = "";
  winner.textContent = "";
  gameActive = true;
  currentUserMessage.textContent = `Player ${currentPlayer}'s Turn`;
  currentUserMessage.style.display = "";
  renderBoard();
};
renderBoard();
