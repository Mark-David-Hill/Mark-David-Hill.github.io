// 
// Works (only prints error to console, doesn't display anything)
// 

// Get data from JSON file.
function getData(fileName, endFunction) {
    // Variable for storing returned JSON data
    let data;
    // Get data from JSON file.
    let xhr = new XMLHttpRequest();
    xhr.open('GET', fileName, true);
    xhr.responseType = 'text';
    xhr.send();

    xhr.onload = function() {
        if(xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
            // When the data is successfully loaded, execute the specified function with the data as a parameter.
            endFunction(data);
        }
        else {
            console.log('XMLHttp Request status: ' + xhr.status);
            console.log('JSON data could not be loaded')
            return (null);
        }
    } // end onload
}