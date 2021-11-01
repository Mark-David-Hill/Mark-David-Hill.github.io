let data;
let content;

// Get data from JSON file.
let xhr = new XMLHttpRequest();
xhr.open('GET', "./json/portfolioData.json", true);
xhr.responseType = 'text';
xhr.send();

xhr.onload = function() {
    if(xhr.status === 200) {
        data = JSON.parse(xhr.responseText);
        console.log(data);
        displayProjects();
    }
} // end onload

// Display project cards
function displayProjects() {
    content = "";
    // Loop through project data to create html for cards
    for (i = 0; i < data.length; i++) {
        // Create html for a project's tag list items
        let tagContent = "<ul>"
        for (j = 0; j < data[i].tags.length; j++) {
            tagContent += `<li>${data[i].tags[j]}</li>`
        }
        tagContent += `</ul>`;
        
        // Create HTML content for project card
        content += `<div class="project-card">
        <img src="${data[i].image}" alt="${data[i].imageAlt}">
        <div>
            <p>${data[i].description}</p>
            ${tagContent}
        </div>
        <div class="flex-spacing">
            <a href="${data[i].site}" target="blank">Site</a>
            <a href="${data[i].gitHub}" target="blank">Code</a>
        </div>
        </div> <!-- End Project Card -->`;
    }
    // Write new HTML content to page.
    document.getElementById('projects').innerHTML = content;
}



