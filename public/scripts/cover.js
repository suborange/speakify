
// for the cover page only
const APIController = (function () {

    // const clientId = secret.ID;
    // const clientSecret = secret.SECRET;
    const clientId = "189cb2c4a3d94b80bc33f50a46322d9d";
    const clientSecret = "af9d281b8ee748a2a97b37063b129886";


    const _getToken = async () => {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        // console.log("token1", data.access_token);
        return data.access_token;
    }


    // const query = 'chlorine'; // have to call this function multiple times, based off the string entered by user. 
    // just get a returned track, fuck it if it doesnt work correctly/match the word
    const _getTrack = async (token, query) => {

        const result = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        // console.log('track item data:', data.tracks.items);
        console.log('random name? data:', data.tracks.items[0].name); // .album[0].name
        return data.tracks.items;
    }
    // return favorites instead of genre?


    const _getFavorite = async (token) => {
        const favorite_song_name = "Wish you were here";

        const result = await fetch(`https://api.spotify.com/v1/search?q=${favorite_song_name}&type=track`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        // console.log('track item data:', data.tracks.items);
        console.log('favorite name? data:', data.tracks.items[0].name); // .album[0].name
        return data.tracks.items;

    }

    return {
        getTrack(t, q) { // token and query
            return _getTrack(t, q);
        },
        getFavorite(t) { // token
            return _getFavorite(t);
        },
        getToken() {
            return _getToken();
            // return acces_token;
        }
    }

})();


const UIController = (function () {
    const DOMElements = {
        getAlbum: '#get_album', // input method for album cover       
        albumSubmit: '#sub_album', // button for album cover input        
        displayCover: '#display_cover', // div for display the album cover using input       
        hfToken: '#hidden_token'
    }

    return {

        // not really sure what theses return to quite yet, obviously are the selected fields.
        inputField() {
            return {
                in_album: document.querySelector(DOMElements.getAlbum),                
                sub_album: document.querySelector(DOMElements.albumSubmit),                
                dis_cover: document.querySelector(DOMElements.displayCover),
            }
        },

        // call once to display the cover
        displayCover(img) {
            const html =
                `<div class="row col-sm-12 px-0">
                <img src="${img}" alt="">        
            </div>`;

            // should hopefully add an image of the album cover to the div here
            const albumCover = document.querySelector(DOMElements.displayCover).innerHTML = html;
        },
        // need to be called multiple times? on how many words in strings
        createPlaylist(id, name) {
            const html = ``; // figure out the html display for the playlists.. follow createTrack
            document.querySelector(DOMElements.displayList).innerHTML += `${name}&nbsp;`; // display the name? to create a sentence?
        },
        storeToken(value) {
            document.querySelector(DOMElements.hfToken).value = value;
        },

        getStoredToken() {
            return {
                token: document.querySelector(DOMElements.hfToken).value
            }
        }

    }

})();

// APP
const APPController = (function (UiCtrl, ApiCtrl) {

    const DOMInputs = UiCtrl.inputField(); // get the objects of input fields?

    const loadPage = async () => {
        const token = await ApiCtrl.getToken();
        // console.log("on load", token);

        UiCtrl.storeToken(token);

        // const track = await ApiCtrl.getTrack(token, query); // need to figure out query here.
    }

    // random track - for now not random?
    DOMInputs.sub_track.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;

        const query = "Chlorine";
        const track = await ApiCtrl.getTrack(token, query);
        console.log("APP track: ", track);
        UiCtrl.randTrack(track[0].name, track[0], track[0].artists[0].name); // hopefully sends the name to the track to be displayed?


    });

    DOMInputs.sub_fav.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;

        const track = await ApiCtrl.getFavorite(token);
        console.log("APP track: ", track);
        UiCtrl.favorite(track[0].name, track[0], track[0].artists[0].name); // hopefully sends the name to the track to be displayed?


    });


    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);

APPController.init(); // what will this do for me?



