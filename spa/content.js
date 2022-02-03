// Album Class

// Card Class
// function makeCard(title, image, description)

// Called from DOM Manager. Creates content for an HTML element
function createContent(tag, text, id) {
    let content = '';
    content += `<${tag} id="${id}">`;
    content += text;
    content += `</${tag}>`
    return content;
}