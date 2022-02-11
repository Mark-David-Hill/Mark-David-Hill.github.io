// To Do
// -Add animations?

// 
// Initialize
// 

let initialize = function(...options) {
    console.log('rps.js start');
    options.forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            console.log(evaluate(id, cpuThrow()));
        })
    });
}

// 
// CPU Throw Randomizer
// 
let cpuThrow = function() {
    int = Math.floor(Math.random() * 3);
    switch (int) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
        default:
            console.log('invalid number generated')
            break;
    }
}

// 
// Evaluation and Scores
// 

// Evaluation
let evaluate = function(player, cpu) {
    let winner = '';
    console.log('Player threw ' + player)
    console.log('cpu threw ' + cpu)
    displayThrows(player, cpu);
    // Tie
    if(player === cpu) {
        winner = 'tie';
        updateScore(winner);
        return 'tie';
    }
    else if(player === 'rock') {
        if(cpu === 'paper') {
            winner = 'cpu'
            updateScore(winner);
            return 'cpu wins'
        }
        else {
            winner = 'player'
            updateScore(winner);
            return 'player wins'
        }
    }
    else if(player === 'paper') {
        if(cpu === 'scissors') {
            winner = 'cpu'
            updateScore(winner);
            return 'cpu wins'
        }
        else {
            winner = 'player'
            updateScore(winner);
            return 'player wins'
        }
    }
    else if(player === 'scissors') {
        if(cpu === 'rock') {
            winner = 'cpu'
            updateScore(winner);
            return 'cpu wins'
        }
        else {
            winner = 'player'
            updateScore(winner);
            return 'player wins'
        }
    }
}

// Score
let pScore = 0;
let cScore = 0;
let ties = 0;

// *Make a closure for the score s

// Update Score
function updateScore(winner) {
    if (winner === 'player') {
        pScore += 1;
        document.getElementById("pWin").classList.add("win");
        document.getElementById("pWin").classList.remove("lose");
        document.getElementById("pWin").classList.remove("tie");
        document.getElementById("cWin").classList.add("lose");
        document.getElementById("cWin").classList.remove("win");
        document.getElementById("cWin").classList.remove("tie");
        
    }
    else if (winner === 'cpu') {
        cScore += 1;
        document.getElementById("pWin").classList.add("lose");
        document.getElementById("pWin").classList.remove("win");
        document.getElementById("pWin").classList.remove("tie");
        document.getElementById("cWin").classList.add("win");
        document.getElementById("cWin").classList.remove("lose");
        document.getElementById("cWin").classList.remove("tie");
    }
    else {
        ties += 1;
        document.getElementById("pWin").classList.remove("lose");
        document.getElementById("pWin").classList.remove("win");
        document.getElementById("pWin").classList.add("tie");
        document.getElementById("cWin").classList.remove("win");
        document.getElementById("cWin").classList.remove("lose");
        document.getElementById("cWin").classList.add("tie");
    }
    updateScoreDisplay(pScore, cScore, ties);
}

// 
// Display
// 

// Display Throws
function displayThrows(player, cpu) {
    const playerHand = document.getElementById('pHand');
    const cpuHand = document.getElementById('cHand');

    const rockImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Rock-paper-scissors_%28rock%29.png/240px-Rock-paper-scissors_%28rock%29.png';
    const paperImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rock-paper-scissors_%28paper%29.png/240px-Rock-paper-scissors_%28paper%29.png';
    const scissorsImg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rock-paper-scissors_%28scissors%29.png/240px-Rock-paper-scissors_%28scissors%29.png';
    let playerImg = '';
    let cpuImg = '';

    // Set up throw image for either player or cpu (side = player or cpu)
    let setImg = function(hand, element) {
        let link = '';
        if(hand === 'rock') {
            link = rockImg;
        }
        else if(hand === 'paper') {
            link = paperImg;
        }
        else if(hand === 'scissors') {
            link = scissorsImg;
        }
        element.src = `${link}`;
    }

    setImg(player, playerHand);
    setImg(cpu, cpuHand);
}

// Display Scores
function updateScoreDisplay(pScore, cScore, ties) {
    const scores = document.getElementsByClassName('score');
    for (let i = 0; i < scores.length; i++) {
        let newScore = 0;
        if(scores[i].classList.contains('player')) {
            newScore = pScore;
        }
        else if(scores[i].classList.contains('cpu')){
            newScore = cScore;
        }
        else if(scores[i].classList.contains('ties')){
            newScore = ties;
        }
        scores[i].textContent = newScore;
    }
}

// 
// Initialize Game
// 

initialize('rock', 'paper', 'scissors');


// for testing
// for (let i = 0; i < 2000; i++) {
//     evaluate('rock', cpuThrow())
// }
