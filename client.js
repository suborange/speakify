// client side code for input?
const playlist_id = "#playlist";
const acover_id = "#album_cover";
// document.querySelector(playlist_id).addEventListener('click', () => {
//     getInput(playlist_id);
// });
// // using bind?
// document.querySelector(acover_id).addEventListener('click', () => {
//     getInput(acover_id);
// });

document.querySelector(playlist_id).addEventListener('click',getInput);

function getInput(){
    console.log("something happens".concat(this));
    let input = document.querySelector(this.id).value.toLowerCase();
    console.loog(input);    
    }