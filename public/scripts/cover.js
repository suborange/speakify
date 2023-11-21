// client side code for input?
const acover_button = "#balbum_cover";
const acover_id = "#album_cover";
// document.querySelector(playlist_id).addEventListener('click', () => {
//     getInput(playlist_id);
// });
// // using bind?
// document.querySelector(acover_id).addEventListener('click', () => {
//     getInput(acover_id);
// });


document.querySelector(acover_button).addEventListener('click',getInput);

function getInput(){
    // console.log("something happens".concat(this));
    let input = document.querySelector(acover_id).value;
    console.log(input);    
    }