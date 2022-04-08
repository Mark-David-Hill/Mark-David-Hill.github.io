// Stats = [hp, tp, str, int, agi]

// 
// Data
// 

let gameData;

let playerChar = {
    "name": "",
    "race": "",
    "class": "",
    "element": "",
    "level": 1,
    "wisdom": 0,
    "charges": 0,
    "money": 0,
    "weapon": "",
    "armor": "",
    "stats": []
}

// Get data from JSON file.
function getData(fileName, endFunction, charChoices) {
    // Variable for storing returned JSON data
    // let gameData;
    // Get data from JSON file.
    let xhr = new XMLHttpRequest();
    xhr.open('GET', fileName, true);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onload = function() {
        if(xhr.status === 200) {
            gameData = JSON.parse(xhr.responseText);
            // When the data is successfully loaded, execute the specified function with the data as a parameter.
            endFunction(gameData, charChoices);
        }
        else {
            console.log('XMLHttp Request status: ' + xhr.status);
            console.log('JSON data could not be loaded')
            return (null);
        }
    } // end onload
}

// Starts after data is loaded
let onLoaded = function (gameData, charChoices) {
    charDataDisplay(gameData, charChoices);
}

// 
// Generate Character Page
// 

let charDataDisplay = function(gameData, charChoices) {
    // HTML Element variables
    const nameEl = document.getElementById('charName');
    const classEl = document.getElementById('charClass');
    const raceEl = document.getElementById('charRace');
    const elementEl = document.getElementById('charElement');
    const csfNameEl = document.getElementById('csfName');
    const csfDescEl = document.getElementById('csfDesc');
    const rsfNameEl = document.getElementById('rsfName');
    const rsfDescEl = document.getElementById('rsfDesc');
    const maxHpEl = document.getElementById('charMaxHp');
    const maxTpEl = document.getElementById('charMaxTp');
    const strEl = document.getElementById('charStr');
    const intEl = document.getElementById('charInt');
    const agiEl = document.getElementById('charAgi');
    
    // Character variables
    let charName = charChoices[0];
    let charClass = capitalize(charChoices[1]);
    let race = capitalize(charChoices[2]);
    let classIndex = getClassIndex(charChoices[1]);
    let raceIndex = getRaceIndex(charChoices[2]);
    let element = capitalize(charChoices[3]);
    let elementIndex = getElementIndex(charChoices[3]);
    let stats = getCombinedStats(gameData, classIndex, raceIndex);
    let startWeapon = gameData.startWeapons[classIndex];
    let charges = gameData.startChargeCount;
    let wisdom = gameData.levels[0].wisdom;
    let csf = getCsf(gameData, classIndex);
    let rsf = getRsf(gameData, raceIndex);

    // Display character data
    nameEl.innerText = charName;
    classEl.innerText = charClass;
    raceEl.innerText = race;
    elementEl.innerText = element;
    csfNameEl.innerText = `${csf[0]} - 10 charges`;
    csfDescEl.innerText = csf[1];
    rsfNameEl.innerText = `${rsf[0]} - 5 charges`;
    rsfDescEl.innerText = rsf[1];
    maxHpEl.innerText = stats[0]
    maxTpEl.innerText = stats[1]
    strEl.innerText = stats[2]
    intEl.innerText = stats[3]
    agiEl.innerText = stats[4]

    displayWeapons(gameData, classIndex);
    displayTechniques(gameData, classIndex, elementIndex)
}

// Get Class Soul Force

let getCsf = function(gameData, classIndex) {
    let name = gameData.classSoulForces[classIndex].name;
    let desc = gameData.classSoulForces[classIndex].description;
    let csf = [name, desc];
    return csf;
}

// Get Race Soul Force

let getRsf = function(gameData, raceIndex) {
    let name = gameData.raceSoulForces[raceIndex].name;
    let desc = gameData.raceSoulForces[raceIndex].description;
    let csf = [name, desc];
    return csf;
}

// 
// Get Unaltered Stats
// 

let getClassStats = function(gameData, classIndex) {
    // console.log('start get class stats')
    // console.log(classIndex)
    let classStats = gameData.baseStats[classIndex];
    // console.log('finish get class stats')
    return classStats;
}
let getRaceStats = function(gameData, raceIndex) {
    let raceStats = gameData.statMods[raceIndex];
    // console.log('finish get race stats')
    return raceStats;
}

let getCombinedStats = function(gameData, classIndex, raceIndex) {
    let classStats = getClassStats(gameData, classIndex);
    let raceStats = getRaceStats(gameData, raceIndex);
    let combinedStats = classStats.map(function (num, idx) {
        return num + raceStats[idx];
    });
    return combinedStats;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



window.addEventListener("DOMContentLoaded", function(e) {
    let charName = localStorage.getItem("characterName");
    let charClass = localStorage.getItem("characterClass");
    let charRace = localStorage.getItem("characterRace");
    let charElement = localStorage.getItem("characterElement");

    let charChoices = [charName, charClass, charRace, charElement];
    
    console.log(charName);
    console.log(charClass);
    console.log(charRace);
    console.log(charElement);

    // Begins the process of requesting the JSON data.
    getData('gameData.json', onLoaded, charChoices)
    
})

// 
// Get gameData Indexes
// 

// Return the class index based on class name
let getClassIndex = function(className) {
    switch (className) {
        case 'archer':
            return 0
        case 'cleric':
            return 1
        case 'magician':
            return 2
        case 'warrior':
            return 3
    }
}

// Return the race index based on race name
let getRaceIndex = function(raceName) {
    switch (raceName) {
        case 'aven':
            return 0
        case 'breken':
            return 1
        case 'kyrek':
            return 2
        case 'rokoll':
            return 3
        case 'silmaeri':
            return 4
    }
}

// Return the element index based on element name
let getElementIndex = function(elementName) {
    switch (elementName) {
        case 'air':
            return 0
        case 'earth':
            return 1
        case 'fire':
            return 2
        case 'water':
            return 3
    }
}

// 
// Display Weapons
// 

function displayWeapons(gameData, classIndex) {
    const rWeaponEl = document.getElementById('archWeapons');
    const mWeaponEl = document.getElementById('meleeWeapon');
    // Only display ranged weapon if Archer was chosen
    if (classIndex === 0) {
        rWeaponEl.classList.remove('hidden');
        mWeaponEl.classList.add('hidden');
    }
    // Display Name of Melee Weapon
    else {
        const mNameEl = document.getElementById('mWeaponName')
        const mWeaponName = gameData.startWeapons[classIndex];
        mNameEl.innerText = mWeaponName;
    }
    
}

// Capitalize String Function
function capitalizeString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 
// Display Techniques
// 

// Display the techniques of the specified class
function displayTechniques(gameData, classIndex, elementIndex) {
    // Set for specific element index if Magician.
    if (classIndex === 2) {
        classTech = gameData.techniques[classIndex][elementIndex];
    }
    else {
        classTech = gameData.techniques[classIndex];
    }

    console.log('class tech: ');
    console.log(classTech);

    const charClass = capitalize(gameData.charClasses[classIndex]);
    const techModal = document.getElementById('techModal');
    content = "";

    const techTitle = document.getElementById('techTitle')

    techTitle.innerHTML = `${charClass} Techniques`

    for (i = 0; i < classTech.length; i++) {
        let tech = classTech[i]
        let cooldownText = ''
        if(tech.cooldown) {
            cooldownText = `<div class="col">
                <p class="fw-normal tech-footer p-2">Cooldown: ${tech.cooldown}</p>
            </div>`;
            
        }
        content += `<div class="col-12 col-lg-6 my-3">
        <!-- ${tech.name} Card -->
        <div class="card shadow">
          <div class="card-body py-0">
            <!-- Name TP Row -->
            <div class="row tech-header">
              <div class="col">
                <h5 class="card-text py-2 text-start">
                    ${tech.name}
                </h5>
              </div>
              <div class="col">
                <p class="card-text text-end p-2">${tech.tp} TP</p>
              </div>
            </div>
            <div class="row">
              <p class="p-3">${classTech[i].description}</p>
            </div>
            <!-- Wisdom Range Cooldown Row -->
            <div class="row">
              <div class="col">
                <p class="fw-normal tech-footer p-2">Wisdom: ${tech.wisdom}</p>
              </div>
              <div class="col">
                <p class="fw-normal tech-footer p-2">Range: ${tech.range}</p>
              </div>
              
              ${cooldownText}

            </div>
          </div>
        </div> <!-- End Technique Card -->
      </div> <!-- End Column -->`

        
        
        
        // `<p>${tech.name}. wisdom- ${tech.wisdom}. TP- ${tech.tp}. Range- ${tech.range}. ${cooldownText}${classTech[i].description}</p>`
    }

    // Display generated content to the modal
    techModal.innerHTML = content;
}