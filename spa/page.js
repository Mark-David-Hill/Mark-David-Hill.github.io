let myData;

// This part is tricky- it's AJAX which I haven't really learned yet.
let dataLoaded = function (data) {
    console.log('dataLoaded function execute!');
    let myData = data;
} 

// *Isn't currently returning the actual data. (ah, because it's AJAX)
getData('data.json', dataLoaded);