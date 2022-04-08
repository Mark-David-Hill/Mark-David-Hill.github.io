// https://medium.com/@richard.jones/getting-rid-of-radar-chart-ticks-in-chartjs-dda06bef2711

// Scales
// https://www.chartjs.org/docs/latest/axes/radial/


// Ticks

// Stats = [hp, tp, str, int, agi]

// 
// Data
// 

let gameData;

// Get data from JSON file.
function getData(fileName, endFunction) {
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
            endFunction(gameData);
        }
        else {
            console.log('XMLHttp Request status: ' + xhr.status);
            console.log('JSON data could not be loaded')
            return (null);
        }
    } // end onload
}

// Starts after data is loaded
let onLoaded = function (gameData) {
    setChartData(gameData, checkClass(), checkRace())
}

// Begins the process of requesting the JSON data.
getData('gameData.json', onLoaded)

// 
// Stats Chart
// 

//   Chart Setup
const radarData = {
    labels: [
        'Max HP',
        'Max TP',
        'STR',
        'INT',
        'AGI',
    ],
    datasets: [{
        label: 'Class Stats',
        data: [10, 10, 10, 10, 10],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: '+ Race Modifiers',
        data: [11, 11, 11, 11, 11],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
};

// Chart Config
const config = {
    type: 'radar',
    data: radarData,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                pointLabels: {
                    display: true,
                    font: {
                        size: 18
                    }
                },
                ticks: {
                    display: false
                },
                suggestedMin: 5,
                suggestedMax: 130
            }
        },
        plugins: {
            tooltip: {
                // Disable the on-canvas tooltip
                enabled: false
            }
        }
    }
};

// Display Chart
const myChart = new Chart(
    document.getElementById('statsChart'),
    config
);

// 
// //
// Chart Data Management
// //
// 

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
// Stat High Calculation
// 

// Calculate combined stat high for a specific stat.
let getStatHigh = function(gameData, statIndex) {
    if (gameData) {
        let baseStats = gameData.baseStats;
        let statMods = gameData.statMods;
        let classStats = [];
        let raceStats = [];
        // Base Stats class loop
        for (let i = 0; i < baseStats.length; i++) {
            classStats.push(baseStats[i][statIndex]);
        }
        // Stat Mods race loop
        for (let i = 0; i < statMods.length; i++) {
            raceStats.push(statMods[i][statIndex]);
        }
        
        let maxClassStat = Math.max(...classStats);
        let maxRaceStat = Math.max(...raceStats);

        let statHigh = maxClassStat + maxRaceStat;

        return statHigh;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// Calculate and return the highest possible starting stat values
let getStatHighs = function(gameData) {
    if(gameData) {
        // Make array of the highest possible starting stat values
        let highStats = Array.of(getStatHigh(gameData, 0), getStatHigh(gameData, 1), getStatHigh(gameData, 2), getStatHigh(gameData, 3), getStatHigh(gameData, 4));
        return highStats;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// 
// Stat Percent Calculation
// 

//  Calculate the stat percent for a single stat (for a specified class)
let getStatPercent = function(gameData, classIndex, statIndex) {
    if(gameData) {
        let classStat = gameData.baseStats[classIndex][statIndex];
        let statHigh = getStatHigh(gameData, statIndex);
        let statPercent = (classStat / statHigh) * 100;
        return statPercent;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// Calculate all the stat percentages for a specified character class
let getClassStatPercents = function(gameData, classIndex) {
    if(gameData) {
        // Make array of the stat percentages of the current class
        let classStatPercents = Array.of(getStatPercent(gameData, classIndex, 0), getStatPercent(gameData, classIndex, 1), getStatPercent(gameData, classIndex, 2), getStatPercent(gameData, classIndex, 3), getStatPercent(gameData, classIndex, 4));
        console.log(classStatPercents)
        return classStatPercents;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

//  Calculate the combined base stat and stat mod percent for a single stat (for a specified class and race)
let getCombinedPercent = function(gameData, classIndex, raceIndex, statIndex) {
    if(gameData) {
        let classStat = gameData.baseStats[classIndex][statIndex];
        let raceMod = gameData.statMods[raceIndex][statIndex]
        let statHigh = getStatHigh(gameData, statIndex);
        let combinedPercent = ((classStat + raceMod) / statHigh) * 100;
        // console.log('class stat: ' + classStat + ' / stat high: ' + statHigh + ' * 100 === stat percent: ' + statPercent)
        return combinedPercent;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// Create an array of the percents for class base stat + race stat mod.
let getCombinedPercents = function(gameData, classIndex, raceIndex) {
    if(gameData) {
        // Make array of the stat percentages of the current class
        let combinedPercents = Array.of(getCombinedPercent(gameData, classIndex, raceIndex, 0), getCombinedPercent(gameData, classIndex, raceIndex, 1), getCombinedPercent(gameData, classIndex, raceIndex, 2), getCombinedPercent(gameData, classIndex, raceIndex, 3), getCombinedPercent(gameData, classIndex, raceIndex, 4));
        console.log(combinedPercents)
        return combinedPercents;
    }
    else {
        console.log('Error- Game Data is not loaded.')
    }
}

// 
// Set Chart data based on choices
// 

// Check for current selection based on which radio button has been checked (for specified group).
let choiceCheck = function(groupName) {
    let radios = document.getElementsByName(groupName);;
    for( i = 0; i < radios.length; i++ ) {
        if( radios[i].checked ) {
            return radios[i].value;
        }
    }
}

// Check for currently selected class
let checkClass = function() {
    return choiceCheck('classGroup');
}

// Check for currently selected race
let checkRace = function() {
    return choiceCheck('raceGroup');
}

// Check for currently selected element
let checkElement = function() {
    return choiceCheck('elementGroup');
}

// Runs when a radio button is clicked.
let onRadioChoice = function() {
    setChartData(gameData, checkClass(), checkRace())
    // checkElement();
}


// 
// Set chart data for class + race
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

let setChartData = function(gameData, classChoice, raceChoice) {
    if (gameData) {
        if(classChoice) {
            let classIndex = getClassIndex(classChoice);
            let classPercents = getClassStatPercents(gameData, classIndex);
            
            if(raceChoice) {
                let raceIndex = getRaceIndex(raceChoice);
                let combinedStats = getCombinedPercents(gameData, classIndex, raceIndex);
                updateStats(classPercents, combinedStats);
                updateStatsDisplay(gameData, classIndex, raceIndex);
            }
            else {
                updateStats(classPercents);
                updateStatsDisplay(gameData, classIndex, null);
            }
        }
        // This is a little messy. Could stand to be refactored.
        else if(raceChoice) {
            let raceIndex = getRaceIndex(raceChoice);
            let statMods = gameData.statMods[raceIndex];
            const combinedTotal = statMods.map(num => num + 10);
            updateStats(null, null, combinedTotal);
            updateStatsDisplay(gameData, null, raceIndex);
        }
        
        
    }
    else {
        console.log('failed to access gameData')
    }
}

const array = [1, 2, 3, 4];
let sum = 0;

for (let i = 0; i < array.length; i++) {
    sum += array[i];
}
console.log(sum);


// Update Graph Stats
let updateStats = function (classStats, combinedStats, raceStats) {
    radarData.datasets[0].data = classStats;
    if(combinedStats) {
        radarData.datasets[1].data = combinedStats;
    }
    else if(raceStats) {
        radarData.datasets[0].data = [10, 10, 10, 10, 10];
        radarData.datasets[1].data = raceStats;
    }
    // console.log(radarData.datasets[0].data);
    myChart.update();
}

let updateStatsDisplay = function(gameData, classIndex, raceIndex) {
    if(gameData) {
        let classStats = [];
        let raceStats = [];
        
        if(typeof classIndex === "number") {
            classStats = getClassStats(gameData, classIndex);
        }
        else {
            classStats = [0,0,0,0,0]
        }

        if(typeof raceIndex === "number") {
            raceStats = getRaceStats(gameData, raceIndex);
        }
        else {
            raceStats = [0,0,0,0,0]
        }
        let statsDisplay = document.getElementById('statsDisplay');
        statsDisplay.innerHTML = `<strong>Max HP</strong>: 
        <span class="text-danger">${classStats[0]}</span> + 
        <span class="text-primary">${raceStats[0]}</span>, <strong>Max TP</strong>: 
        <span class="text-danger">${classStats[1]}</span> + 
        <span class="text-primary">${raceStats[1]}</span>, <strong>STR</strong>: 
        <span class="text-danger">${classStats[2]}</span> + 
        <span class="text-primary">${raceStats[2]}</span>, <strong>INT</strong>: 
        <span class="text-danger">${classStats[3]}</span> + 
        <span class="text-primary">${raceStats[3]}</span>, <strong>AGI</strong>: 
        <span class="text-danger">${classStats[4]}</span> + 
        <span class="text-primary">${raceStats[4]}</span>`
        console.log('finish update stats display')
    }
    else {
        console.log('failed to access gameData');
    }
}


// 
// Form Submission
// 

// grab reference to form

const formElem = document.querySelector('form');

// submit handler

formElem.addEventListener('submit', (e) => {
// on form submission, prevent default
e.preventDefault();

// construct a FormData object, which fires the formdata event
new FormData(formElem);
});

// formdata handler to retrieve data

formElem.addEventListener('formdata', (e) => {
    console.log('formdata fired');

    // Get the form data from the event object
    let characterFormData = e.formData;
    for (let value of characterFormData.values()) {
        console.log(value);
    };

    //Save character data to local storage.
    localStorage.setItem("characterName", characterFormData.get("heroName"))
    localStorage.setItem("characterClass", characterFormData.get("classGroup"))
    localStorage.setItem("characterRace", characterFormData.get("raceGroup"))
    localStorage.setItem("characterElement", characterFormData.get("elementGroup"))

    console.log("name");

    const url = window.location.href.replace("character.html", "charPage.html");
    window.location.href = url;

});