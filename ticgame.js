// Selecting DOM elements
let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Variable to track whose turn it is (O or X)
let turnO = true;

// Winning patterns for Tic-Tac-Toe
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [6, 7, 8],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [1, 4, 7]
];

// Function to reset the game
const resetGame = () => {
  turnO = true;

  // Reset game state
  enableBoxes();
  msgcontainer.classList.add("hide");
};

// Event listeners for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("clicked");
    
    // Alternate between O and X turns
    if (turnO) {
      box.innerHTML = "O";
      turnO = false;
    } else {
      box.innerHTML = "X";
      turnO = true;
    }
    
    // Disable the clicked box and check for a winner
    box.disabled = true;
    checkWinner();
  });
});

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes and reset their content
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `${winner} won the game`;
  msgcontainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner or draw
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    
    // Check if three positions are not empty and have the same value
    if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        console.log("winner");
        showWinner(pos1val);
        return; // Exit the function if a winner is found
      }
    }
  }

  // Check for a draw if all boxes are filled
  if (Array.from(boxes).every((box) => box.innerText !== "")) {
    msg.innerText = "It's a draw!";
    msgcontainer.classList.remove("hide");
  }
};

// Event listeners for reset and new game buttons
newbtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
