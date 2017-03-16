
$(function() {

  var $cells = $('.boarder li');
  var gridWidth = 7;
  var gridHeight = 6;
  var player = "player1";
  var $resetButton = $("#resetGame");
  var scorePlayer1 = 0;
  var scorePlayer2 = 0;
  var playing = true;
  var $winner = $("#winner");
  var $slots = $('.slots');
  var $player1score = $("#player1score");
  var $player2score = $("#player2score");


  function checkCells(indexesToCheck) {
    var $cellsToCheck = indexesToCheck.map(function(index) {
      return $cells.eq(index);
    });
    return $cellsToCheck.every(function($cell) {
      return $cell.hasClass(player);
    });
  }

  function checkForWin() {
    // check rows
    var rowWin =
    //check the combination inrow 35 -->
    checkCells([35,36,37,38]) || checkCells([36,37,38,39]) || checkCells([37,38,39,40]) || checkCells([38,39,40,41]) ||
    // --> 41 and backword

    //check the combination inrow 28
    checkCells([28,29,30,31]) || checkCells([29,30,31,32]) || checkCells([30,31,32,33]) || checkCells([31,32,33,34]) ||
    // --> 41 and backword

    //check the combination inrow 21
    checkCells([21,22,23,24]) || checkCells([22,23,24,25]) || checkCells([23,24,25,26]) || checkCells([24,25,26,27]) ||
    // --> 27 and backword

    //check the combination inrow 14
    checkCells([14,15,16,17]) || checkCells([15,16,17,18]) || checkCells([16,17,18,19]) || checkCells([17,18,19,20]) ||
    // --> 20 and backword

    //check the combination inrow 7
    checkCells([7,8,9,10]) || checkCells([8,9,10,11]) || checkCells([9,10,11,12]) || checkCells([10,11,12,13])||
    // --> 13 and backword

    //check the combination inrow 0
    checkCells([0,1,2,3]) || checkCells([1,2,3,4]) || checkCells([2,3,4,5]) || checkCells([3,4,5,6]);
    // --> 6 and backword

    // check columns
    var colWin =

    //check the combination incol 35 -->
    checkCells([35,28,21,14]) || checkCells([28,21,14,7]) || checkCells([21,14,7,0]) ||
    // --> 1 and backword

    //check the combination incol 36
    checkCells([36,29,22,15]) || checkCells([29,22,15,8]) || checkCells([22,15,8,1]) ||
    // --> 1 and backword

    //check the combination incol 37
    checkCells([37,30,23,16]) || checkCells([30,23,16,9]) || checkCells([23,16,9,2]) ||
    // --> 2 and backword

    //check the combination incol 38
    checkCells([38,31,24,17]) || checkCells([31,24,17,10]) || checkCells([24,17,10,3]) ||
    // --> 3 and backword

    //check the combination incol 39
    checkCells([39,32,25,18]) || checkCells([32,25,18,11]) || checkCells([25,18,11,4]) ||
    // --> 4 and backword

    //check the combination incol 40
    checkCells([40,33,26,19]) || checkCells([33,26,19,12]) || checkCells([26,19,12,5]) ||
    // --> 5 and backword

    //check the combination incol 41
    checkCells([41,34,27,20]) || checkCells([34,27,20,13]) || checkCells([27,20,13,6]);
    // --> 6 and backword

    // check diags
    var diagWin =

    //check diags Left -> Right

    //check the combination indiags 21
    checkCells([21,15,9,3]) ||
    // --> 3 and backword

    //check the combination indiags 28
    checkCells([28,22,16,10]) || checkCells([22,16,10,4]) ||
    //check --> 4 and backword

    //check the combination indiags 35
    checkCells([35,29,23,17]) || checkCells([29,23,17,11]) || checkCells([23,17,11,5]) ||
    //check --> 5 and backword

    //check the combination indiags 36
    checkCells([36,30,24,18]) || checkCells([30,24,18,6]) || checkCells([24,18,12,6]) ||
    //check --> 6 and backword

    //check the combination indiags 37
    checkCells([37,31,25,19]) || checkCells([31,25,19,13]) ||
    //check --> 13 and backword

    //check the combination indiags 38
    checkCells([38,31,26,20]) ||
    //check --> 20 and backword

    //check diags Right -> Left
    //check the combination indiags 38
    checkCells([38,30,22,14]) ||
    //check --> 14 and backword

    //check the combination indiags 39
    checkCells([39,31,23,15]) || checkCells([31,23,15,7]) ||
    //check --> 7 and backword

    //check the combination indiags 40
    checkCells([40,32,24,16]) || checkCells([32,24,16,8]) || checkCells([24,16,8,0]) ||
    //check --> 0 and backword

    //check the combination indiags 41
    checkCells([41,33,25,17]) || checkCells([33,25,17,9]) || checkCells([25,17,9,1]) ||
    //check --> 1 and backword

    //check the combination indiags 34
    checkCells([34,26,18,10]) || checkCells([26,18,10,2]) ||
    //check --> 2 and backword

    //check the combination indiags 27
    checkCells([27,19,11,3]);
    //check --> 3 and backword

    return rowWin || colWin || diagWin;
  }

  function reset() {
    // reset all the occupied chells from player1 player2
    $cells.removeClass('occupied player1 player2');
    // sets the players to true so they will be able to play again
    playing = true;
    player = "player1";
    $winner.text("");
    $slots.removeClass('grey');
  }
  //reset button for reset the scores
  function resetAll() {
    reset();
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    $player1score.text(scorePlayer1);
    $player2score.text(scorePlayer2);
  }

  $resetButton.on('click', resetAll);

  $('.slots li').on('click', function() {

    if(!playing) return;
    //colIndex store the index that has been clicked
    var colIndex = $(this).index();
    //currentIndex store the calculate of gridWidth and gridHeight-1
    var currentIndex = colIndex + (gridWidth * (gridHeight-1));

    var $currentCell = $cells.eq(currentIndex);

    while($currentCell.hasClass('occupied') && $currentCell.length > 0) {
      currentIndex -= gridWidth;
      $currentCell = $cells.eq(currentIndex);
    }

    if($currentCell.length === 1) {
      $currentCell.addClass('occupied').addClass(player);
      $slots.toggleClass('grey');

      if ($cells.filter('.occupied').length === $cells.length) {
        $winner.text("Is a Draw..");
      } else if(checkForWin()){
        if (player === "player1") {
          $winner.text("Player 1 " + "has won!");
          scorePlayer1++;
          $player1score.text(scorePlayer1);
        }
        if (player === "player2") {
          $winner.text("Player 2 " + "has won!");
          scorePlayer2++;
          $player2score.text(scorePlayer2);
        }
        playing = false;
        setTimeout(reset, 2000);
      } else {
        player = (player === "player1") ? "player2" : "player1";
      }
    }
  });
});
