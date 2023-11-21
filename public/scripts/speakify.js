// client side code for input?
const playlist_button = "#bplaylist";
const playlist_id = "#playlist";
// document.querySelector(playlist_id).addEventListener('click', () => {
//     getInput(playlist_id);
// });
// // using bind?
// document.querySelector(acover_id).addEventListener('click', () => {
//     getInput(acover_id);
// });

document.querySelector(playlist_button).addEventListener('click',getInput);


function getInput(){
    // console.log("something happens".concat(this));
    let input = document.querySelector(playlist_id).value;
    console.log(input);    
    }