// Stats = [hp, tp, str, int, agi]
// Classes = [archer, cleric, magician, warrior]
// Races = [aven, breken, kyrek, rokoll, silmaeri]
// Elements = [air, earth, fire, water]

// 
// Data
// 

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

// Starts when data loads
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
    const charName = charChoices[0];
    const charClass = capitalize(charChoices[1]);
    const race = capitalize(charChoices[2]);
    const classIndex = getClassIndex(charChoices[1]);
    const raceIndex = getRaceIndex(charChoices[2]);
    const element = capitalize(charChoices[3]);
    const elementIndex = getElementIndex(charChoices[3]);
    const csf = getCsf(gameData, classIndex);
    const csfName = `${csf[0]} - 10 charges`;
    const csfDesc = csf[1];
    const rsf = getRsf(gameData, raceIndex);
    const rsfName = `${rsf[0]} - 5 charges`;
    const rsfDesc = rsf[1];

    // Unused vars
    // const startWeapon = gameData.startWeapons[classIndex];
    // const charges = gameData.startChargeCount;
    // const wisdom = gameData.levels[0].wisdom;

    // Char Stats
    const stats = getCombinedStats(gameData, classIndex, raceIndex);
    let maxHp, maxTp, str, int, agi;
    [maxHp, maxTp, str, int, agi] = stats;

    // Display character data
    display(nameEl, charName);
    display(classEl, charClass);
    display(raceEl, race);
    display(elementEl, element);
    display(csfNameEl, csfName);
    display(csfDescEl, csfDesc);
    display(rsfNameEl, rsfName);
    display(rsfDescEl, rsfDesc);
    display(maxHpEl, maxHp);
    display(maxTpEl, maxTp);
    display(strEl, str);
    display(intEl, int);
    display(agiEl, agi);

    displayWeapons(gameData, classIndex);
    displayTechniques(gameData, classIndex, elementIndex)
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
        display(mNameEl, mWeaponName)
    }
    
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

    let titleContent = `${charClass} Techniques`
    display(techTitle, titleContent)

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
    }

    // Display generated content to the modal
    display(techModal, content);
}