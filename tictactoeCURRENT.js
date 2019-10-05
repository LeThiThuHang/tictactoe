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
            $(this).css('background-color',"rgb(113, 145, 146)") // change to this color
        }
    })

    player1 = [];
    player2 = [];
    players = [];
    position = '';
    turn = 0;
    $('#inform_user').html(`<h1>Start the game. You are the first player!</h1>`);
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
    console.log("game_play")
    position = e.target.id;
    let index = Number(position[position.length - 1]) // get last digit of an ID, string => number
    console.log(index)
    console.log(!isNaN(index))

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
                console.log(document.getElementById(`id${index}`))
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
    console.log('winning function runs')
    let result; // store result
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
        let check = array.filter(item => winningCombination[i].includes(item));
        if (check.length == 3) {
            result = true;
            // formating the boxes
            for (i = 0; i <= 2; i++) {
                document.getElementById(`id${check[i]}`).style.backgroundColor = 'green';
            };
            result = true
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













