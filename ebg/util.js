function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// 
// //
// Data Retrieval
// //
// 

// 
// Retrieve Local Storage
// 

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
// Get JSON Data
// 

// Variable for storing returned JSON data
let gameData;

function getData(fileName, endFunction, charChoices) {
    
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

// 
// //
// Display
// //
// 

let display = function(target, ...contents) {
    let content = "";
    contents.forEach(el => {
        content += el;
    });
    target.innerHTML = content;
}

// 
// //
// Game Data Util
// //
// 

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
    // console.log('finished get combined stats');
    return combinedStats;
}

// 
// Get Soul Forces
// 

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
    let rsf = [name, desc];
    return rsf;
}