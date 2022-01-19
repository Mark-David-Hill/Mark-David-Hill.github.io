'use strict';

// 
// //
// Initialize
// //
// 

let mmData; 
let state = ['mainNav', 'games'];



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
    constructor(targetID, visible, sections, sectionIDs, defaultActive) {
        // Calls constructor of parent class (Section)
        super(targetID, visible);
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
    constructor(targetID, visible) {
        // Calls constructor of parent class (Section)
        super(targetID, visible);
        this.open = `
            <div id="${targetID}" class="album py-5 bg-light">
                <div class="container">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`
        this.close = `
                    </div>
                </div>
            </div>`
        // this.bindClick();
    }
    // Generate HTML for the body of the Nav buttons
    // generateButtons() {
    //     let cont = '';
        
    //     for (let i = 0; i < this.sections.length; i++) {
    //         let sectionID = this.sectionIDs[i];
    //         let section = this.sections[i];
    //         if (this.sections[i] === this.active) {
    //             cont += `<li class="nav-item"><a id="${sectionID}Btn" href="#" class="nav-link active" aria-current="page">${section}</a></li>`
    //         }
    //         else {
    //             cont += `<li class="nav-item"><a id="${sectionID}Btn" href="#" class="nav-link" aria-current="page">${section}</a></li>`
    //         }
    //     }
    //     return cont;
    // }
    // Set up click events (Not working yet)
    // bindClick() {
    //     for (let i = 0; i < this.sections.length; i++) {
    //         // Create click events
    //         let sectionID = this.sectionIDs[i];
    //         let btnID = sectionID + 'Btn'
    //         document.getElementById(btnID).addEventListener("click", function() {
    //             console.log('clicked a button');
    //             displayByID(sectionID);
    //         });
    //         console.log('set up click event')
    //     }
        
    // }
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
let mainNav = new Nav('mainNav', true, ['Games', 'Characters', 'this is a test'], ['games', 'characters', 'test'], 'Games');

let gameNav = new Section(false, ['More Info', 'Robot Masters'])
let games = new Album('games', true);
let game = new Section (false);
let moreInfo = new Section (false);
let robMas = new Section (false);



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
        // games.display();
    }
} // end onload