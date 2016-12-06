"use strict";
$(function () {

  //
  // Event handlers
  //

  $("#clear").click(function () {
    clearBoard();
  });

  $(".board-cell")
  // Handle tic-tac-toe cell click event handlers
    .click(function () {
      var cellId = $(this).attr("id");
      handleCellClicked(cellId);
    })
    // board-cell hoover event handler
    .hover(
      function () {
        $(this).css("background-color", "rgba(192,192,192,0.5)");
      },
      function () {
        $(this).css("background-color", "transparent");
      }
    );

  //
  // Game logic
  //
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var player = 1;
  var winner = "";
  var gameover = false;

  function checkCells(x, y, z) {
    winner = "";

    var sum = board[x] + board[y] + board[z];
    if (sum === 3) {
      winner = "X";
      return true;
    } else if (sum === -3) {
      winner = "O";
      return true;
    }
    return false;
  }

  function allCellsFilled() {
    var i;
    for (i = 0; i < board.length; i += 1) {
      if (board[i] === 0) {
        return false;
      }
    }
    return true;
  }

  function checkForWin() {
    // Check rows
    if (checkCells(0, 1, 2)) {
      return true;
    }
    if (checkCells(3, 4, 5)) {
      return true;
    }
    if (checkCells(6, 7, 8)) {
      return true;
    }

    // Check columns
    if (checkCells(0, 3, 6)) {
      return true;
    }
    if (checkCells(1, 4, 7)) {
      return true;
    }
    if (checkCells(2, 5, 8)) {
      return true;
    }

    // Check diagonals
    if (checkCells(0, 4, 8)) {
      return true;
    }
    //noinspection RedundantIfStatementJS
    if (checkCells(2, 4, 6)) {
      return true;
    }
    return false;
  }

  function updateBoard() {
    for (var i = 0; i < board.length; i += 1) {
      var cell = document.getElementById(i.toString());
      if (board[i] === 1) {
        cell.innerHTML = "X";
      } else if (board[i] === -1) {
        cell.innerHTML = "O";
      } else {
        cell.innerHTML = "";
      }
    }
  }

  function clearBoard() {
    gameover = false;
    var i;
    for (i = 0; i < board.length; i += 1) {
      board[i] = 0;
    }
    updateBoard();

    player = 1;
    winner = "";

    $("#gameover").css("display", "none");
  }

  function handleCellClicked(cellId) {

    // Check if the game is over.
    if (gameover) {
      return;
    }

    // Check if the cell has already been played.
    if (board[cellId] !== 0) {
      $("#messageBoxText").text("Cell already taken");
      $("#messageBox").modal();
      return;
    }

    // Assign the player to the cell (X=1, O=-1)
    board[cellId] = player;

    if (player === 1) {
      player = -1;
    } else {
      player = 1;
    }

    // Refresh the board
    updateBoard();

    // Check for a win
    var isWin = checkForWin();

    // If all cells have been played, but no win, then it is a tie.
    if (!isWin && allCellsFilled()) {
      winner = "";
      gameover = true;
      // We have a winner!
      $("#gameovertext").text("Game over. It's a tie.");
      $("#gameover").css("display", "block");
      return;
    }

    // We have a winner!
    if (isWin) {
      gameover = true;
      $("#gameovertext").text("Game over. " + winner + " is the winner!");
      $("#gameover").css("display", "block");
    }
  }
});
