"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);

  // start ticking
  tick();
}

/* function keyPress(event) {
  if (event.key === "ArrowUp") {
  console.log("↑");
  } if (event.key === "ArrowDown") {
    console.log("↓");
  } if (event.key === "ArrowRight") {
    console.log("→");
  } if (event.key === "ArrowLeft") {
    console.log("←");
  }
} */

function tick() {
  // setup next tick
  setTimeout(tick, 500);

  writeToCell(player.row, player.col, 0);

  if (controls.right) {
    direction = "right";
  } else if (controls.left) {
    direction = "left";
  } else if (controls.up) {
    direction = "up";
  } else if (controls.down) {
    direction = "down";
  }

   switch(direction) {
    case "right":
    player.col++ 
    if (player.col > 9) {
      player.col = 0;
    } break;
    case "left": 
    player.col--;
    if (player.col < 0) {
      player.col = 9;
    } break;
    case "up":
      player.row--
      if (player.row < 0) {
        player.row = 9;
      } break;  
    case "down":
      player.row++
      if (player.row > 9) {
        player.row = 0;
      } break;
  } 

  writeToCell(player.row, player.col, 1);

  // display the model in full
  displayBoard();
}

// ******** MODEL ********
const model = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

let direction = "left";

const player = {
  row: 5,
  col: 5,
}

function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

// ******** VIEW ********

function keyDown(event) {
  switch(event.key) {
    case "d":
    case "ArrowRight": controls.right = true; break;
    case "a":
    case "ArrowLeft": controls.left = true; break;
    case "w":
    case "ArrowUp": controls.up = true; break;
    case "s":
    case "ArrowDown": controls.down = true; break;
  }
}

function keyUp(event) {
  switch(event.key) {
    case "d":
    case "ArrowRight": controls.right = false; break;
    case "a":
    case "ArrowLeft": controls.left = false; break;
    case "w":
    case "ArrowUp": controls.up = false; break;
    case "s":
    case "ArrowDown": controls.down = false; break;
  }
}

const controls = {
  right: false,
  left: false,
  up: false,
  down: false
}

function displayBoard() {
  const cells = document.querySelectorAll("#grid .cell");
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const index = row * 10 + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}
