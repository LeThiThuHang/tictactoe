/* $("#start_button").click(function(){

    $("#tic-tac-toe-board").show();
    $("#setting_game").hide();
})
 */
$("#back_button").click(function () {

    $("#tic-tac-toe-board").hide();
    $("#setting_game").show();
})


//play by yourself code
$("#play_by_yourself").click(function () {
    $("#setting_game").hide();
    $("#tic-tac-toe-board").show();
    body.addEventListener('click', game_play);
})

$("#play_again_button").click(function () {
    restart_game();
    body.addEventListener('click', game_play);

})

//play with computer code 
$("#play_with_computer").click(function () {
    $("#setting_game").hide();
    $("#tic-tac-toe-board").show();
    body.addEventListener('click', play_with_computer);
})




let player1 = [];
let player2 = [];
let players = [];
//winning combination
let winningCombination = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
]
let body = document.querySelector('body');
let position = '';
let turn = 0;


//ading variables for play with computer
let computer = [];
let game_end = 0;
let result;
let move = 10; // store result
let player1Sign = 'X';
let computerSign = 'O'


//PLAY BY YOURSELF SECTION
//restart the game
function restart_game() {
    //clear the board as well
    $("#id1").html("")
    $("#id2").html("")
    $("#id3").html("")
    $("#id4").html("")
    $("#id5").html("")
    $("#id6").html("")
    $("#id7").html("")
    $("#id8").html("")
    $("#id9").html("")

    //change the color of green in the winning area, WIP still need to fix the play again
    $("#board").children('.col').each(function () {
        if ($(this).css('background-color') == "rgb(0, 128, 0)") { //green
            $(this).css('background-color', "rgb(113, 145, 146)") // change to this color
        }
    })

    player1 = [];
    player2 = [];
    players = [];
    position = '';
    turn = 0;
    $('#inform_user').html(`<h1>Start the game. You are the first player!</h1>`);

    //variables for play with computer
    computer = [];
    game_end = 0;
    result;
    move = 10; // store result

}



//marker function
function marker(x) {
    if (x % 2 !== 0) {
        return 'X'; //odd, second player
    } else {
        return 'O'; // even, first player
    }

}

function game_play(e) {

    position = e.target.id;
    let index = Number(position[position.length - 1]) // get last digit of an ID, string => number


    if (!isNaN(index)) {

        if (turn % 2 !== 0 && turn <= 9) { //odd number 2nd player
            //check if the player 1 is winning
            //if the index is includes in the players array, need to prevent it from clicking
            // and do the turn again
            if (!players.includes(index)) {
                let sign = document.getElementById(`id${index}`);
                sign.innerHTML = marker(turn);
                player1.push(index);
                players.push(index);
                turn++;  // only turn to next player when the player already makes a move        
            }

        } else { // even number 1st player
            //check if the player 2 is winning        
            if (!players.includes(index)) {
                document.getElementById(`id${index}`).innerHTML = marker(turn);
                player2.push(index);
                players.push(index);
                turn++;
            }
        }

        if (winning(player1) != false) {
            $('#inform_user').html(`<h1>You lost bitch!</h1>`);
            body.removeEventListener("click", game_play); // remove function
        }

        if (winning(player2) != false) {
            $('#inform_user').html(`<h1>Congratulation you win!</h1>`);
            body.removeEventListener("click", game_play); // remove function
        }

        if (tie(player1, player2)) {
            /* alert('you are tied'); */
            $('#inform_user').html(`<h1>You are tied!</h1>`);
            /* document.body.innerHTML = `<p>End the game</p>`; */
            body.removeEventListener("click", game_play); // remove function
        }
    }

}

//check for winning
function winning(array) {

    let result; // store result
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
        let check = array.filter(item => winningCombination[i].includes(item));
        if (check.length == 3) {
            result = true;
            // formating the boxes
            for (i = 0; i <= 2; i++) {
                document.getElementById(`id${check[i]}`).style.backgroundColor = 'green';
            };
            return
        } else {
            result = false;
        }
    }
    return result
}

//check for tie
function tie(array1, array2) {
    let tie;
    if (players.length == 9) { // all moves done
        if (winning(array1) == false) {
            if (winning(array2) == false) {
                tie = true;
            }
        }
    }
    return tie;
}

//PLAY WITH COMPUTER SECTION
function play_with_computer(e) {
    position = e.target.id; // use this to trigger the following events when the mouse click on anything under body

    let index = Number(position[position.length - 1]) // get last digit of an ID, string => number

    if (!isNaN(index)) {

        if (game_end == 0) {
            if (turn % 2 == 0) {  // both player 1 and computer in one move
                if (!players.includes(index)) {

                    let sign = document.getElementById(`id${index}`);
                    sign.innerHTML = player1Sign;
                    player1.push(index);
                    players.push(index);
                    turn = turn + 2;


                    if (players.length < 9) {
                        computerMove();

                    }

                    checkWinning(); // if game end = 1; stop the game


                } else {
                    alert('Choose some place else');
                }
            }

        } else {
            body.removeEventListener('click', play_with_computer)
        }
    }



}

//check for winning both

function checkWinning() {
    if (winning_play_with_computer(player1)) {
        $('#inform_user').html(`<h1>Congratulation you win bae!</h1>`);
    } else if (winning_play_with_computer(computer)) {

        $('#inform_user').html(`<h1>You lost bitch blab!</h1>`);
    } else if (tie_play_with_computer(player1, computer)) {

        $('#inform_user').html(`<h1>You are tied!</h1>`);
    }

    if (winning_play_with_computer(player1) == true || winning_play_with_computer(computer) == true || players.length == 9) {
        return game_end = 1;
    } else {
        return game_end = 0;
    }
}

function winning_play_with_computer(array) {
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
        let check = array.filter(item => winningCombination[i].includes(item))

        if (check.length == 3) {
            for (i = 0; i <= 2; i++) {
                document.getElementById(`id${check[i]}`).style.backgroundColor = 'green';
            };
            return result = true;
        } else {
            result = false;
        }
    }
    return result
}

//check for tie
function tie_play_with_computer(array1, array2) {

    let tie;
    if (players.length == 9) { // all moves done
        if (winning_play_with_computer(array1) == false) {
            if (winning_play_with_computer(array2) == false) {
                tie = true;
            }
        }
    }
    return tie
}


function random() {
    return Math.ceil(Math.random() * 9);
}

//fill in function
function fillIn(x) {
    document.getElementById(`id${x}`).innerHTML = computerSign;
    computer.push(x);
    players.push(x);
}


function computerMove() {
    //check winning combination for the computer
    let winningMoveComputer = nextMove(computer) //=> should return the position to fill in block
    let winningMoveCompetitor = nextMove(player1)

    if (winningMoveComputer < 10 && !computer.includes(winningMoveComputer)) {
        fillIn(winningMoveComputer)

    } else if (winningMoveCompetitor < 10 && !computer.includes(winningMoveCompetitor)) {
        fillIn(winningMoveCompetitor)

    } else {
        //if no winning combination found, do the move based on random
        let randomNumber = random();

        while (players.includes(randomNumber)) {
            randomNumber = random();
        }
        fillIn(randomNumber);
    }
}

//check for next move of computer 
//check next move based on winning combination
function nextMove(array) {
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array

        let thirdWinningPosition = winningCombination[i].filter(item => !array.includes(item));

        if (thirdWinningPosition.length == 1) {
            if (!players.includes(thirdWinningPosition[0])) {
                move = thirdWinningPosition[0];
                break
            }
        }
    }
    return move;
}














