// for the favorite page only
const APIController = (function () {

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
        favSubmit: '#sub_fav', // button for getting favorite song        
        displayFavorite: '#display_fav', // div for displaying favorite song       
        hfToken: '#hidden_token'
    }

    return {

        // not really sure what theses return to quite yet, obviously are the selected fields.
        inputField() {
            return {
                sub_fav: document.querySelector(DOMElements.favSubmit),
                dis_favorite: document.querySelector(DOMElements.displayFavorite),
            }
        },

        // maybe change back to album.. 
        favorite(name, artist, album) {
            const html = `Favorite: title:${name}; artist: ${artist}; album:${album}`;
            document.querySelector(DOMElements.displayGenre).innerHTML = html;
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

    // for favorite track info
    DOMInputs.sub_fav.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;

        const track = await ApiCtrl.getFavorite(token);
        console.log("APP track: ", track);
        UiCtrl.favorite(track[0].name, track[0].artists[0].name, track[0].album.name); // hopefully sends the name to the track to be displayed?


    });


    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);

// APPController.init(); // what will this do for me?



