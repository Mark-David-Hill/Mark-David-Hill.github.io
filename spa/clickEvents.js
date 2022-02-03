// Add click event to HTML element (*try bind() instead of setting to variable)
function createClickEvent(elementId, event) {
    let element = document.getElementById(elementId);
    element.addEventListener('click', event);
}

function printMe(toPrint) {
    console.log(toPrint);
}

