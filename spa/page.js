// let data;

// // Gets called once data is successfully loaded.
// let loadData = function (data) {
//     data = data;
//     asyncPrint(data);
// } 

// // from data.js. Pass in json filename and function to execute when loaded.
// getData('datad.json', loadData);

// function asyncPrint(toPrint) {
//     console.log('async Print')
//     console.log(toPrint);
// }



// let main = document.getElementsByTagName('main')[0]
// main.innerHTML = '<h1>Test</h1>';
// // console.log(main);
// console.log('Display Main:')
// console.log(getMain());


// console.log(getMain());

// (element type, Content, id, click event, variable)

const printer = printMe.bind(module);
let printer = printMe('You clicked me')

displayMain('button', 'Its a button', 'myButton');
// createClickEvent(main, printer)