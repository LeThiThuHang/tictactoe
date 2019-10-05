//generate a random number from 1 to 9
// Player 1 choose X 
// Player 2 is a computer O
//Generate a winning combination of number
// variable: 
    //player1Move
    //player2Move
    //combineMove
    //winningMove
    //randomNumber

// 1- 1: Player 1 moves first : random number generated => 5
  // store a moved into player1Move = [5]
// 2 -1 : Player 2 moves next: random number generated, any but the one that is already occupied
  // store a moved into player2Move = [4]
// 1 -2 : Player 2 moves second: random number generated expcet 5 and 4 
  // store a moved into player1MOve = [5,2]
// 2 - 2: Player 2 moves next: need to check if player 1 has the two number combines 
  //that exist in the winning combiniation [5,2] , then it will fill in the next number which is 8
  //player2Move = [4,8]
// 1 - 3: Player 1 moves next, check the winning combination for the competititor, not exist, 
  // check the combination for winning from its own, not exist ( priority)
  //generate random, except all the position occuipied 1
  // [5,2,1]
// 2 -3 : Player 2 moves next, check the winning combination for the competititor 
  //=> exist 1,2 so it fill in 3
  // [4,8,3]
// 1-4: Player 1 moves next, check the combination for itself first, 
        //find [5,2] => so fill in 8 (not possible)
        //find [1,2] => so fill in 3 (not possible)
        //find [1,5] => so fill in 9 (possible)
    //=>winning the game

//rule1 : when the move combination has from two numbers above, then check !
//rule2 : when the players move, check the combination from itself first !
//rule3: even find the winning combination, need to check if the position is available

//CODE SECTION 


let player1 = [];
let player2 = [];
let players = [];
//winning combination
let winningCombination = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
] 

let body = document.querySelector('body');
let position = '';
let turn = 0;

//marker function
function marker (x) {
    if(x % 2 !== 0) {
        return 'X'; //odd, second player
    } else {
        return 'O'; // even, first player
    }

}

function game_play (e) {
    position = e.target.id;
    console.log(e.target)
    let index = Number(position[position.length-1]) // get last digit of an ID, string => number

    if (turn % 2 !== 0 && turn <= 9) { //odd number 2nd player
        //check if the player 1 is winning
        //if the index is includes in the players array, need to prevent it from clicking
        // and do the turn again
        if(!players.includes(index)) {
            let sign = document.getElementById(`id${index}`);
            sign.innerHTML = marker(turn);
            player1.push(index);
            players.push(index); 
            turn++;  // only turn to next player when the player already makes a move        
        } 
      
    } else { // even number 1st player
        //check if the player 2 is winning        
        if(!players.includes(index)) {           
            document.getElementById(`id${index}`).innerHTML = marker(turn);
            player2.push(index);
            players.push(index);
            turn++;
        }
    }

    winning(player1);
    winning(player2);

    if (tie(player1, player2)) {
        alert('you are tied');
        document.body.innerHTML = `<p>End the game</p>`;
    } 

}

//check for winning
function winning (array) {
    let result; // store result
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
            let check = array.filter(item => winningCombination[i].includes(item));
            if (check.length == 3) {
                result = true;
                // formating the boxes
                for(i=0; i<= 2; i++) {
                    document.getElementById(`id${check[i]}`).style.backgroundColor = 'green';
                };

                alert('You are winning');
                body.removeEventListener("click", game_play); // remove function
                
                return                              
            } else {
                result = false;
            }                       
        }
        return result;
}

//check for tie
function tie (array1, array2) {
    let tie;
    if (players.length == 9) { // all moves done
        if ( winning(array1) == false) {
            if(winning(array2) == false) {
                tie = true;
            }           
        }
    }
    return tie;
}


body.addEventListener('click', game_play )






   



