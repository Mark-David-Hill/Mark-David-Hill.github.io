// document.getElementsByTagName('main')[0].innerHTML = '<h1>Test</h1>';


// if (main.hasChildNodes) {

// }




// 
// Loop through DOM
// 


// 
// 
// Get DOM
// 
// 



// 
// 
// Modify DOM
// 
// 

function displayMain(tag, text, id, event) {
    let main = getMain();
    main.innerHTML = createContent(tag, text, id);
    createClickEvent(id, event);
}

function createButton(button, event) {
    
}

function buttonPrint (toPrint) {
    console.log(toPrint)
}

// Get current DOM
function getMain() {
    return document.getElementsByTagName('main')[0];
}

