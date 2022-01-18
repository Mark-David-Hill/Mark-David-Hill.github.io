
let mmData;
let content;

// Change based on hash
// Push State
// https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

// https://stackoverflow.com/questions/35549130/simple-spa-single-page-application-implementation-with-hash-change

// https://tutorialzine.com/2015/02/single-page-app-without-a-framework 



// Get data from JSON file.
let xhr = new XMLHttpRequest();
xhr.open('GET', "megaman.json", true);
xhr.responseType = 'text';
xhr.send();

xhr.onload = function() {
    if(xhr.status === 200) {
        mmData = JSON.parse(xhr.responseText);
        console.log(mmData);
        displayGames();
    }
} // end onload

// let state;
// let title = '';
// let url;

// Display all games
function displayGames() {
    content = "";

    // loop through each game
    for (let i in mmData.games) {
         //i is is the key for each game
        let game = mmData.games[i];
        // Generate HTML content for each game card
        content += 
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
    
    // Display all games to the screen.
    document.getElementById('gamesContainer').innerHTML = content;

    // state = {'page_id': 'games'};
    // url = 'megaman.html/games';

    // history.pushState(state, title, url)

    // Add click events to game buttons
    let gameBtns = document.getElementsByClassName('gameBtn');
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", function() {
            displayGame(gameBtns[i]);
        });
    }
}

// Games button click event
document.getElementById('gamesBtn').addEventListener("click", function() {
    let album = document.getElementById('gamesAlbum');
    if (album.style.display === 'none') {
        album.style.display = 'block';
        document.getElementById('gameContainer').innerHTML = "";
        document.getElementById('gameContainer').style.display = none;
        // Change text of the games button
        document.getElementById('gamesBtn').innerHTML = "Games"
        console.log("Games")
    }
});


// Display info about a single game
function displayGame(btn) {
    let content = "";
    
    // returns the id of the game to be displayed (e.g. 'mm1')
    let gameId = btn.id.slice(0, -3);
    let game = mmData.games[gameId];

    console.log(game.id)

    let consoles;

    if (game.consoles) {
        consoles = game.consoles;
    }
    else {
        consoles = game.console;
    }
    
    content +=
        `<div class="container py-3 my-3">

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

    // Hide games
    document.getElementById('gamesAlbum').style.display = "none";
    // document.getElementById('gamesAlbum').innerHTML = "";
    // Display game info
    document.getElementById('gameContainer').innerHTML = content;
    document.getElementById('gameContainer').style.display = 'block';
    // Change text of the games button
    document.getElementById('gamesBtn').innerHTML = "&crarr; Games";
}

// Display Robot Masters for specific game
function displayGameRobMas(game) {
    content = "";
    for (let i in mmData.games.game) {
         //i is is the key for each game
        let robMas = mmData.games[i];
        let ref = robMas.reference;
        let name = robMas.name;
        // Generate HTML content for each game card
        content += 
            `<!-- ${name} -->
            <div class="col col-sm-6 col-md-4 col-lg-2">
              <div class="card">
                <img src="images/1/${ref}Face.png" class="card-img-top rounded" alt="...">
                <div class="card-body text-center">
                  <a href="#" class="nav-link active" aria-current="page">${name}</a>
                </div>
              </div>
            </div> <!-- End ${name} -->`
    }
    
    // Display all games to the screen.
    document.getElementById('gameRobMas').innerHTML = content;

    // Add click events to game buttons
    let gameBtns = document.getElementsByClassName('gameBtn');
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", function() {
            displayGame(gameBtns[i]);
        });
    }
}

// displayGame(mm1);

