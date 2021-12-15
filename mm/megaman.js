
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
    // const games = Object.keys(mmData.games);
    content = "";

    for (let i in mmData.games) {
        let game = mmData.games[i];
        // i is is the key for each game
        content += '<div class="col"><div class="card shadow-sm">' + `<img src="${game.boxart}" class="img-fluid" alt="${game} box-art"> <div class="card-body">
        <p class="card-text">${game.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
            <button type="button" class="btn btn-sm btn-outline-secondary">${game.title}</button>
          </div>
          <small class="text-muted">${game.console}</small>
        </div>
      </div>
    </div></div>`
    }
    
    document.getElementById('mainContainer').innerHTML = content;
}