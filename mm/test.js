'use strict';
let mmData; 
let state = ['mainNav', 'games'];
let gameSections = [];


// 
// Section Classes
// 


// Section Class
class Section {
    constructor(targetID, visible, level) {
        this.targetID = targetID;
        this.visible = visible;
        this.body = '';
        this.open = '';
        this.close = '';
        this.level = 0;
        this.target = document.getElementById(targetID);
    }
    get combined() {
        return this.open + this.body + this.close;
    }
    
    display () {
        console.log('Display ' + this.targetID)
        // this.target.innerHTML = this.combined;
        this.target.style.display = 'block';
    }
    hide () {
        console.log('Hide')
        // this.target.style.display = 'none';
    }
}

//  Nav Class
class Nav extends Section {
    constructor(targetID, visible, level, sections, sectionIDs, defaultActive) {
        // Calls constructor of parent class (Section)
        super(targetID, visible, level);
        this.sections = sections;
        this.sectionIDs = sectionIDs;
        this.active = defaultActive;
        this.open = `
        <!-- Nav -->
        <div class="container">
            <header class="d-flex justify-content-center py-3">
                <ul class="nav nav-pills">`
        this.close = `
        </ul>
        </header>
        </div> <!-- End Nav -->`
        this.body = this.generateButtons();
        this.target.innerHTML = this.combined;
        this.bindClick();
    }
    // Generate HTML for the body of the Nav buttons
    generateButtons() {
        let cont = '';
        
        for (let i = 0; i < this.sections.length; i++) {
            let sectionID = this.sectionIDs[i];
            let section = this.sections[i];
            if (this.sections[i] === this.active) {
                cont += `<li class="nav-item"><a id="${sectionID}Btn" href="#" class="nav-link active" aria-current="page">${section}</a></li>`
            }
            else {
                cont += `<li class="nav-item"><a id="${sectionID}Btn" href="#" class="nav-link" aria-current="page">${section}</a></li>`
            }
        }
        return cont;
    }
    // Set up click events (Not working yet)
    bindClick() {
        for (let i = 0; i < this.sections.length; i++) {
            // Create click events
            let sectionID = this.sectionIDs[i];
            let btnID = sectionID + 'Btn'
            document.getElementById(btnID).addEventListener("click", function() {
                console.log('clicked a button');
                displayByID(sectionID);
            });
            console.log('set up click event')
        }
        
    }
}

//  Album Class
class Album extends Section {
    constructor(targetID, visible, level) {
        // Calls constructor of parent class (Section)
        super(targetID, visible, level);
        this.open = `
            <div id="${targetID}" class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`
        this.close = `
                    </div>
                </div>
            </div>`
    }
}


// 
// Section objects
// 


// Main Nav
let mainNav = new Nav('mainNav', true, 0, ['Games', 'Characters', 'this is a test'], ['games', 'characters', 'test'], 'Games');
// Game Nav
let gameNav = new Nav('gameNav', true, 2, ['More Info', 'Robot Masters'], ['info', 'robMas'], 'More Info')
// game
// let game = new Section ('game', false, 1);
let moreInfo = new Section (false);
let robMas = new Section (false);
let characters = new Section('characters', false, 0);
characters.open = 'Mega Man, Proto Man, etc.'
characters.target.innerHTML = characters.combined;

// 
// games section
// 

let games = new Album('games', true, 1);
// Display all games
function generateGamesHTML() {
    let cont = "";

    // loop through each game
    for (let i in mmData.games) {
         //i is is the key for each game
        let game = mmData.games[i];
        // Generate HTML content for each game card
        cont += 
            `<div class="col">
                <div class="card shadow-sm"> 
                    <img src="images/${game.id}.png" class="img-fluid" alt="${game} box-art"> <div class="card-body">
                    <p class="card-text">${game.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary gameBtn" id="${game.id}Btn">${game.title}</button>
                        </div>
                        <small class="text-muted">${game.releaseYear}, ${game.console}</small>
                    </div>
                </div>
            </div>
        </div>`
    }
    games.body = cont;
    games.target.innerHTML = games.combined;

    // Add click events to game buttons
    let gameBtns = document.getElementsByClassName('gameBtn');
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", function() {
            displayGame(gameBtns[i]);
        });
    }
}

// Create Game containers and cards
function createGameContainers() {
    let gameContainer = document.getElementById('game');
    let cont = '';
    let gameIDs = [];

    // Create game containers/cards
    for (let i in mmData.games) {
        //i is is the key for each game
       let game = mmData.games[i];
       gameIDs.push(game.id);
       cont += `<!-- ${game.title} -->
       <div class="container" id="${game.id}">${game.title}</div> 
       <!-- End Header/Nav -->`
    }
    // Set HTML for game containers
    gameContainer.innerHTML = cont;

    for (let i = 0; i < gameIDs.length; i++) {
        let cont = ''
        let gameId = gameIDs[i];
        let game = mmData.games[gameId];
        let consoles;
        if (game.consoles) {
            consoles = game.consoles;
        }
        else {
            consoles = game.console;
        }
        let newGame = new Section(gameId, false, 0);
        console.log(gameId)
        cont += `<div class="container py-3 my-3">

        <div class="row g-5 align-items-center justify-content-center">
          <!-- ${gameId} Image -->
          <div class="col-12 col-md-6">
            <div class="card shadow-sm">
              <img src="images/${gameId}.png" class="img-fluid" alt="...">
            </div>
          </div>
          <!-- ${gameId} Header/Description -->
          
          
          <div class="col-12 col-md-6">
            <h1 class="display-4 fw-normal">${game.title}</h1>
            <p class="lead fw-normal">${game.description}</p>

            <button type="button" class="btn btn-sm btn-secondary">Original Release Date: ${game.releaseYear}</button>
            <button type="button" class="btn btn-sm btn-secondary">Platform: ${consoles}</button>
          </div>
        </div>
      </div> <!-- End MM1 Section -->`
        
      newGame.body = cont;
      newGame.target.innerHTML = newGame.combined;
      document.getElementById(gameId).innerHTML = cont;
      gameSections.push(newGame);
    }
    console.log(gameSections)
    
}

function createGameCards() {
    
}


function displayGame(gameBtn) {
    // returns the id of the game to be displayed (e.g. 'mm1')
    let gameId = gameBtn.id.slice(0, -3);
    let game = mmData.games[gameId];
    console.log(game);
}

// 
// //
// Display 
// //
//

function displayByID(id) {
    switch (id) {
        // case 'mainNav':
        //     mainNav.display();
        //     break;
        case 'games':
            games.target.innerHTML = games.combined;
            games.display();
            console.log('display games')
            break;
    
        default:
            break;
    }
}





let xhr = new XMLHttpRequest();
xhr.open('GET', "megaman.json", true);
xhr.responseType = 'text';
xhr.send();

xhr.onload = function() {
    if(xhr.status === 200) {
        mmData = JSON.parse(xhr.responseText);
        generateGamesHTML();
        mainNav.display();
        createGameContainers()
    }
} // end onload