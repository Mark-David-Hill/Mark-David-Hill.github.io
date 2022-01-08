
let mmData;
let content;

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
                                    <small class="text-muted">${game.console}</small>
                                </div>
                            </div>
                        </div>
            </div>`
    }
    
    // Display all games to the screen.
    document.getElementById('gamesContainer').innerHTML = content;

    // Add click events to game buttons
    let gameBtns = document.getElementsByClassName('gameBtn');
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].addEventListener("click", function() {
            displayGame(gameBtns[i]);
        });
    }
}


// Display info about a single game
function displayGame(btn) {
    let content = "";
    
    // returns the id of the game to be displayed (e.g. 'mm1')
    let gameId = btn.id.slice(0, -3);
    let game = mmData.games[gameId];

    console.log(game.id)
    
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

            <button type="button" class="btn btn-sm btn-secondary">Original Release Date: 1987</button>
            <button type="button" class="btn btn-sm btn-secondary">Console: NES</button>
          </div>
        </div>
      </div> <!-- End MM1 Section -->`

    // Hide games
    document.getElementById('gamesAlbum').style.display = "none";
    // Display game info
    document.getElementById('gameContainer').innerHTML = content;
}

// displayGame(mm1);

