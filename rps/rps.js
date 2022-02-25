// To Do
// -Have tooltip for win percentages? 
// -Change background color of results text based on result?

// 
// Initialize
// 



let initialize = function(...options) {
    console.log('rps.js start');
    options.forEach(id => {
        document.getElementById(id).addEventListener('click', function() {
            // start(id, cpuThrow);
            console.log(evaluate(id, cpuThrow()));
            let results = document.getElementById('winMessage');
            results.classList.add('results')
            stop(results, 'results', 3000);
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

// Animation
let start = function(id, cpuThrow) {
    let pCard = document.getElementById('pWin');
    let cCard = document.getElementById('cWin');
    let results = document.getElementById('winMessage');

    pCard.classList.add('pStart');
    cCard.classList.add('cStart');
    results.classList.add('results')

    stop(pCard, 'pStart', 300);
    stop(cCard, 'cStart', 300);
    stop(results, 'results', 3000);
    startEval(id, cpuThrow)
    
}

// Stop animation
let stop = function(element, className, time) {
    setTimeout(function(){ 
        element.classList.remove(className);
    }, 300);
}

let startEval = function(id, cpuThrow) {
    setTimeout(function() {
        console.log(evaluate(id, cpuThrow()));
    }, 300)
}

// 
// Evaluation and Scores
// 

// Evaluation
let evaluate = function(player, cpu) {
    let winner = '';
    let winMessage = document.getElementById('winMessage');
    console.log('Player threw ' + player);
    let messages = ['You Win!', 'You Lose', 'Tie']
    console.log('cpu threw ' + cpu)
    displayThrows(player, cpu);
    // Tie
    if(player === cpu) {
        winner = 'tie';
        winMessage.innerText = messages[2];
        updateScore(winner);
        return 'tie';
    }
    else if(player === 'rock') {
        if(cpu === 'paper') {
            winner = 'cpu'
            winMessage.innerText = messages[1];
            updateScore(winner);
            return 'cpu wins'
        }
        else {
            winner = 'player'
            winMessage.innerText = messages[0];
            updateScore(winner);
            return 'player wins'
        }
    }
    else if(player === 'paper') {
        if(cpu === 'scissors') {
            winner = 'cpu'
            winMessage.innerText = messages[1];
            updateScore(winner);
            return 'cpu wins'
        }
        else {
            winner = 'player'
            winMessage.innerText = messages[0];
            updateScore(winner);
            return 'player wins'
        }
    }
    else if(player === 'scissors') {
        if(cpu === 'rock') {
            winner = 'cpu'
            winMessage.innerText = messages[1];
            updateScore(winner);
            return 'cpu wins'
        }
        else {
            winner = 'player'
            winMessage.innerText = messages[0];
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
    let pCard = document.getElementById('pWin');
    let cCard = document.getElementById('cWin');
    let pScoreDiv = document.getElementById('pScore');
    let cScoreDiv = document.getElementById('cScore');

    // addClass() adds the class of the result and removes other result classes.
    // Result is 0, 1, or 2, corresponding to 'win', 'lose', and 'tie'
    let addClass = function(element, result) {
        let results = ['win', 'lose', 'tie']
        for (let i = 0; i < results.length; i++) {
            if (i === result) {
                element.classList.add(results[i]);
            }
            else {
                element.classList.remove(results[i]);
            }
        }
    }

    if (winner === 'player') {
        pScore += 1;
        addClass(pCard, 0)
        addClass(cCard, 1)
        addClass(pScoreDiv, 0)
        addClass(cScoreDiv, 1)
    }
    else if (winner === 'cpu') {
        cScore += 1;
        addClass(cCard, 0)
        addClass(pCard, 1)
        addClass(cScoreDiv, 0)
        addClass(pScoreDiv, 1)
    }
    else {
        ties += 1;
        addClass(cCard, 2)
        addClass(pCard, 2)
        addClass(cScoreDiv, 2)
        addClass(pScoreDiv, 2)
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
