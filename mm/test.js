'use strict';

// 
// //
// Initialize
// //
// 

let mmData;
let content;
let target;
let state = ['games'];
// Content class. body, open, close, combine();

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

// 
// //
// Generate HTML
// //
//

// Function for combining sections of HTML
function contentCombine(body, open, close) {
    content = open + body + close;
    return content;
}

const mainButtons = ['Games', 'Characters'];
const gamesButtons = ['More Info', 'Robot Masters', 'Power Ups']
const

// Nav Bar HTML Generator function
function generateNavHTML(section) {
    let content = '';
    const open = 'Games Content Open';
    const close = 'Games Content Open';
    let body = '';

    for (let i in mmData.games) {
        //i is is the key for each game
        let game = mmData.games[i];
        contentBody += game.title;
    }

    content = contentOpen + contentBody + contentClose;
    return content;
    
    let content = 
    `<!-- Nav -->
        <div class="container">
          <header class="d-flex justify-content-center py-3">
            <ul class="nav nav-pills">
              <li class="nav-item"><a id="gamesBtn" href="" class="nav-link active" aria-current="page">Games</a></li>
              <li class="nav-item"><a href="#" class="nav-link">Characters</a></li>
            </ul>
          </header>
        </div> <!-- End Header/Nav -->`
}

// Function for generating HTML for different sections. Calls appropriate HTML generator functions based on 'section' and 'id'.
function generateHTML(section, id) {
    switch (section) {
        case games:
            generateGamesHTML();
            break;
    
        case game:
            generateGameHTML(id);
            break;

        case robMas:
            generateRobMasHTML(id);

        // default:
        //     break;
    }
}

function generateGamesHTML() {
    let content = '';
    const open = 'Games Content Open';
    const close = 'Games Content Open';
    let body = '';

    for (let i in mmData.games) {
        //i is is the key for each game
        let game = mmData.games[i];
        contentBody += game.title;
    }

    content = contentCombine(body, open, close);
    return content;
}

function generategameHTML(id) {
    const gameContent;
}

// 
// //
// Display 
// //
//

function display(target, section, id) {

}