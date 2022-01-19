'use strict';

// 
// //
// Initialize
// //
// 

let mmData;
let content;
let target;

// 
// Create Section Classes
// 

let state = ['games'];

// !!!! Try having the Section objects be tied specifically to different HTML elements?

// Section Class
class Section {
    constructor(targetID, visible) {
        this.targetID = targetID;
        this.visible = visible;
        this.body = 'content body';
        this.open = 'content open';
        this.close = 'content close';
        this.target = document.getElementById(targetID);
    }
    get combined() {
        return this.open + this.body + this.close;
    }
    display () {
        console.log('Display')
        this.target.innerHTML = this.combined;
        // this.target.style.display = 'block';
    }
    hide () {
        console.log('Hide')
        // this.target.style.display = 'none';
    }
}

//  Nav Class
class Nav extends Section {
    constructor(targetID, visible, sections) {
        // Calls constructor of parent class (Section)
        super(targetID, visible);
        this.sections = sections;
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
    }
    generateButtons() {
        let cont = '';
        for (let i = 0; i < this.sections.length; i++) {
            cont += `<li class="nav-item"><a href="#" class="nav-link active" aria-current="page">${this.sections[i]}</a></li>`
        }
        return cont;
    }
}

// 
// //
// Set up Section Objects
// //
//

// 
// Section objects
// 

// Main Nav
let mainNav = new Nav('mainNav', true, ['Games', 'Characters', 'this is a test']);
console.log(mainNav);
// mainNav.body = mainNav.generateButtons();


let gameNav = new Section(false, ['More Info', 'Robot Masters'])
let games = new Section(true);
let game = new Section (false);
let moreInfo = new Section (false);
let robMas = new Section (false);

const mainButtons = ['Games', 'Characters'];
const gamesButtons = ['More Info', 'Robot Masters', 'Power Ups']

// // Function for generating HTML for different sections. Calls appropriate HTML generator functions based on 'section' and 'id'.
// function generateHTML(section, id) {
//     switch (section) {
//         case games:
//             generateGamesHTML();
//             break;
    
//         case game:
//             generateGameHTML(id);
//             break;

//         case robMas:
//             generateRobMasHTML(id);

//         // default:
//         //     break;
//     }
// }

// function generateGamesHTML() {
//     let content = '';
//     const open = 'Games Content Open';
//     const close = 'Games Content Open';
//     let body = '';

//     for (let i in mmData.games) {
//         //i is is the key for each game
//         let game = mmData.games[i];
//         contentBody += game.title;
//     }

//     content = contentCombine(body, open, close);
//     return content;
// }

// function generategameHTML(id) {
//     const gameContent;
// }

// 
// //
// Display 
// //
//

function display(target, section, id) {

}


// 
// Get data from JSON file.
// 

let xhr = new XMLHttpRequest();
xhr.open('GET', "megaman.json", true);
xhr.responseType = 'text';
xhr.send();

xhr.onload = function() {
    if(xhr.status === 200) {
        mmData = JSON.parse(xhr.responseText);
        console.log(mmData);
        mainNav.display();
    }
} // end onload