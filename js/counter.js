//
//  Currency Object Template
// 
const currency = {
    // currency Properties
    baseValue: 0,
    count: 0,
    // Total cumulative value based on current count
    totalValue: 0,
    countContainer: 0,
    totalValueContainer: 0,

    // currency Methods

    // Update total values for this currency and the overall total.
    updateTotals() {
        // Set this currency's new total value
        this.totalValue = (this.count * this.baseValue);
        // Calculate and set new total value for all currencies combined

        overallTotalValue = 0;
        for (i = 0; i < allCurrencies.length; i++) {
            overallTotalValue = overallTotalValue + allCurrencies[i].totalValue;
        }
    },

    // Display values for this currency and total
    displayTotals() {
        // Display new count value for this currency
        this.countContainer.innerText = this.count;
        // Display new total for this currency
        this.totalValueContainer.innerText = this.totalValue;
        // Display new overall total
        document.getElementById("totalValueContainer").innerText = `Total: ￥${overallTotalValue}`;
    },

    // Increment currency count up by 1
    increment() {
        // Increase by 1
        this.count = this.count + 1;
        // Update and display totals
        this.updateTotals();
        this.displayTotals();
    },

    // Decrement currency count down by 1
    decrement() {
        // Decrease by 1
        this.count = this.count - 1;
        // Make sure it's not below 0
        if(this.count < 0) {
            this.count = 0;
        };
        // Update and display totals
        this.updateTotals();
        this.displayTotals();
    },

    // Clear total values and update display
    clear() {
        // Set to 0
        this.count = 0;
        this.updateTotals();
        this.displayTotals();
    }
};

// 
// Create Currency objects
// 

// Array for all currency values
const currencyValues = [1, 5, 10, 50, 100, 500, 1000, 5000, 10000];

// Initialize array for storing all the currency objects.
let allCurrencies = [];

// Function for creating currency objects
function createCurrency(value) {
    let myString = `Yen${value}`;
    // let newCurrency = eval(myString = Object.create(currency));
    let newCurrency = Object.create(currency);
    newCurrency.baseValue = value;
    newCurrency.count = 0;
    newCurrency.totalValue = 0;
    newCurrency.countContainer = document.getElementById(`yen${value}CountContainer`)
    newCurrency.totalValueContainer = document.getElementById(`yen${value}TotalValueContainer`)
    // Create event listener for the plus button for this currency
    document.getElementById(`yen${value}PlusButton`).addEventListener("click", function() {
        newCurrency.increment();
    });
    // Create event listener for the minus button for this currency
    document.getElementById(`yen${value}MinusButton`).addEventListener("click", function() {
        newCurrency.decrement();
    });
    allCurrencies.push(newCurrency);
}

// Loop for creating all the currencies
for (var i = 0; i < currencyValues.length; i++) {
    let currentValue = currencyValues[i];
    let newCurrency = createCurrency(currentValue);
}

//
// Other Variables/Events
// 

// Total Value for all currency types
let overallTotalValue = 0;

// Clear Button
let clearButton = document.getElementById("clearButton");

// Clear All click event
clearButton.addEventListener("click", function() {
    overallTotalValue = 0;
    for (var i = 0; i < allCurrencies.length; i++) {
        allCurrencies[i].clear();
    }
});