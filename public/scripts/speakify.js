// for the sentence page only
const APIController = (function () {

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
 
    // get the playlist to append to
    const _appendPlaylist = async (token, playlist_id) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        // console.log('track item data:', data.tracks.items);
        console.log('playlist? data:', data); // .album[0].name
        return data;
    }

    // get the playlist to display on the webpage
    const _getPlaylist = async (token, playlist_id) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        // console.log('track item data:', data.tracks.items);
        console.log('playlist? data:', data); // .album[0].name
        return data;

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
        getSentence: '#get_sentence', // input method for sentence        
        sentanceSubmit: '#sub_sentence', // button for sentence input       
        displayList: '#display_playlist', // div for displaying the playlist filled with songs of sentence
        hfToken: '#hidden_token'
    }

    return {

        // not really sure what theses return to quite yet, obviously are the selected fields.
        inputField() {
            return {              
                in_sentence: document.querySelector(DOMElements.getSentence).value,             
                sub_sentence: document.querySelector(DOMElements.sentanceSubmit),               
                dis_playlist: document.querySelector(DOMElements.displayList),
            }
        },

        displayPlaylist() {
            // 61XhLq3wZGTZkWFaTy4WPA
            const html =`<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/61XhLq3wZGTZkWFaTy4WPA?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
            document.querySelector(DOMElements.displayList).innerHTML = html;
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

    DOMInputs.sub_sentence.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;
// loop through and get each of the tracks from the string

        const sentence = DOMInputs.in_sentence.split(" "); // split the sentence by space
        for (word of sentence){
            // get the track for the word
            const track = await ApiCtrl.getTrack(token, word);
            console.log("word:" + word + "track" + track[0].name);           

        }
        UiCtrl.displayList(); // now somehow display the playlist? maybe after adding songs it should display the iframe correctly?
    });

    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);

// APPController.init(); // what will this do for me?



