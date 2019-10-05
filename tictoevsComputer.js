//generate a random number from 1 to 9
// Player 1 choose X 
// Player 2 is a computer O
//Generate a winning combination of number
// variable: 
    //player1Move
    //computerMove
    //combineMove
    //winningMove
    //randomNumber

// 1- 1: Player 1 moves first : 
  // store a moved into player1Move = [5]
// 2 -1 : Player 2 moves next: random number generated, any but the one that is already occupied
  // store a moved into computerMove = [4]
// 1 -2 : Player 2 moves second: random number generated expcet 5 and 4 
  // store a moved into player1MOve = [5,2]
// 2 - 2: Player 2 moves next: need to check if player 1 has the two number combines 
  //that exist in the winning combiniation [5,2] , then it will fill in the next number which is 8
  //computerMove = [4,8]
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
let computer = [];
let players = [];
let game_end = 0;
let turn = 0;
let result;
let move = 10; // store result

let body = document.querySelector('body');
let position = ''; // use to get the position of each box

//markers
let player1Sign = 'X';
let computerSign = 'O'

body.addEventListener('click', play )

function play (e) {
    console.log('game starts')
    position = e.target.id; // use this to trigger the following events when the mouse click on anything under body
    
    let index = Number(position[position.length-1]) // get last digit of an ID, string => number

    if ( game_end == 0) {
        if (turn % 2 == 0) {  // both player 1 and computer in one move
            if (!players.includes(index)) {
                
                let sign = document.getElementById(`id${index}`);
                sign.innerHTML = player1Sign;
                player1.push(index);
                players.push(index);
                turn = turn +2 ;
                console.log('player 1 moves')
                
                if (players.length < 9){
                    computerMove();
                }

                checkWinning(); // if game end = 1; stop the game
                
                // check for winning
            } else {
                alert ('Choose some place else');
            }
        }

    } else {
        body.removeEventListener('click', play)
    }
/*     if (players.length == 9){
        game_end = 1
    }     */
}

//check for winning both

function checkWinning () {
    console.log('check winning function')   
    if (winning(player1) == true || winning(computer) == true  || players.length == 9) {
        return game_end = 1;
    } else {
        return game_end = 0;
    }   
}


//check for winning

/* function winning (array) {
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
            let check = array.filter(item => winningCombination[i].includes(item));
            if (check.length == 3) {
                result = true;
                // formating the boxes
                for(i=0; i<= 2; i++) {
                    document.getElementById(`id${check[i]}`).style.backgroundColor = 'green';};
                    body.removeEventListener("click", play); // remove function
                                                            
            } else {
                result = false
            }
    }
    return result;
} */


function winning (array) {
    console.log('check winning for each player')
    
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array
            let check = array.filter(item => winningCombination[i].includes(item));
            if (check.length == 3) {
                return result = true;
            } else {
                return result = false;
            }                                                       
        }
    }

//check for tie
function tie (array1, array2) {
    console.log('checking tie');
    
    let tie;
    if (players.length == 9) { // all moves done
        if ( winning(array1) == false) {
            if(winning(array2) == false) {
                tie = true;
            }           
        }
    }
    return tie
}



function random () {
    console.log('random number for computerMove')
    return Math.ceil(Math.random()*9);
}

//fill in function
function fillIn (x) {
    console.log('fill in for computerMove')
    document.getElementById(`id${x}`).innerHTML = computerSign;
    computer.push(x);
    players.push(x);
    /* console.log(`computer array ${computer}`) */
}


function computerMove() {


    //check winning combination for the computer
    let winningMoveComputer = nextMove(computer) //=> should return the position to fill in block
    let winningMoveCompetitor = nextMove(player1)
    console.log('a');

    if (winningMoveComputer < 10 && !computer.includes(winningMoveComputer)) {
        console.log('b');
        console.log(winningMoveComputer)
        fillIn(winningMoveComputer)
        /* console.log(`winningmovecomputer ${winningMoveComputer}`) */

    } else if (winningMoveCompetitor < 10 && !computer.includes(winningMoveCompetitor)) {
        console.log('c');
        fillIn(winningMoveCompetitor)
        /* console.log(`winningmovecompetitor${winningMoveCompetitor}`) */

    } else {
        //if no winning combination found, do the move based on random
        let randomNumber = random();
        console.log('d')
        console.log(`${randomNumber}`)

        while (players.includes(randomNumber)) {
            randomNumber = random();
            console.log(`${randomNumber} generated again`)
        }


        fillIn(randomNumber);


    }
    /* console.log(`random number for computer ${randomNumber}`) */
    console.log('computer forgot to move')


}
    

//check for next move of computer 

let winningCombination = [
    [1,2,3], //3
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8], //8
    [3,6,9],
    [1,5,9],
    [3,5,7],
] 

//check next move based on winning combination
function nextMove (array) {
    console.log('next move for computerMove')
    
    for (let i = 0; i < winningCombination.length; i++) { // to get the element in winning array

            let thirdWinningPosition = winningCombination[i].filter(item => !array.includes(item));

            if (thirdWinningPosition.length == 1) {
                if(!players.includes(thirdWinningPosition[0])) {
                    console.log(`${players}`)
                    move = thirdWinningPosition[0];
                    break                     
                }
            }                  
    }
    return move;
}

