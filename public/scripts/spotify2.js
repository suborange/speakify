// grab secret data from file
const file_io = require('fs'); // for file input and output
// read static secrets and parse them into an object -> obj.field
let secretdata = file_io.readFileSync('.secret.json');
const secret = JSON.parse(secretdata);
const APIController = (function () {

    const clientId = secret.ID;
    const clientSecret = secret.SECRET;

    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.acess_token;
    }


    const query = 'chlorine'; // have to call this function multiple times, based off the string entered by user. 
    // just get a returned track, fuck it if it doesnt work correctly/match the word
    const _getTrack = async (token, query) => {

        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        console.log('track data:', data);
        console.log('song name? data:', data.tracks.items.album.name);
        return data.tracks.items;
    }

    return {
        getTrack() {
            return _getTrack(t, q);
        }
    }

})();


const UIController = (function () {
    const DOMElements = {
        getAlbum: '#get_album',
        getSentence: '#get_sentence',
        albumSubmit: '#sub_album',
        playlistSubmit: '#sub_sentence',
        displayTrack: '#random_song',
        displayAlbum: '#random_album',
        displayCover: '#display_cover',
        displayList: '#playlist'
    }

    return {

        inputField() {
            return {
                album: document.querySelector(DOMElements.getAlbum),
                sentence: document.querySelector(DOMElements.getSentence),
                asubmit: document.querySelector(DOMElements.albumSubmit),
                ssubmit: document.querySelector(DOMElements.playlistSubmit)
            }
        },

        randTrack(name) {
            const html = `Random song: ${name}`;
            document.querySelector().innerHTML = html; // or ${} idk
        },

        // call once to display the cover
        displayCover(img) {
            const html = 
            `<div class="row col-sm-12 px-0">
                <img src="${img}" alt="">        
            </div>`;

            // should hopefully add an image of the album cover to the div here
            const albumCover = document.querySelector(DOMElements.displayList).innerHTML = html;
        },

        // need to be called multiple times? on how many words in strings
        createPlaylist(id, name) {
            const html = ``; // figure out the html display for the playlists.. follow createTrack
            document.querySelector(DOMElements.displayList).innerHTML+= `${name}&nbsp;`; // display the name? to create a sentence?
        },



    }


})();