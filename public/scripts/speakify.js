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
    // v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}
    const _appendPlaylist = async (token, playlist_id, tracksUri) => {
        console.log("appending: ", tracksUri)
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${tracksUri.join(',')}`, {
            method: 'POST', headers: { 'Authorization': 'Bearer ' + token }
        });
 
    }

    const _deletePlaylist = async (token, playlist_id) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
            method: 'DELETE', headers: { 'Authorization': 'Bearer ' + token }
        });
      

    }

    // // get the playlist to display on the webpage
    // const _getPlaylist = async (token, playlist_id) => {
    //     const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
    //         method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
    //     });
    //     const data = await result.json();
    //     // console.log('track item data:', data.tracks.items);
    //     console.log('playlist? data:', data); // .album[0].name
    //     return data;

    // }

    return {
        // getPlaylist() {
        //     return _getPlaylist;
        // },
        getTrack(t, q) { // token and query
            return _getTrack(t, q);
        },
        appendPlaylist(t, p, u){
            return _appendPlaylist(t, p ,u);
        },
        deletePlaylist(t,p){
            return _deletePlaylist(t,p);
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
                in_sentence: document.querySelector(DOMElements.getSentence),             
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

    
    DOMInputs.sub_sentence.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;
        const playlistid = '61XhLq3wZGTZkWFaTy4WPA';
// loop through and get each of the tracks from the string

        let sentence = DOMInputs.in_sentence.value;        
        sentence = sentence.split(" "); // split the sentence by space
        console.log("sentance here:" + sentence);
        let trackUris = [];
        for (word of sentence){
            // get the track for the word
            const track = await ApiCtrl.getTrack(token, word);
            
            trackUris.push(track[0].uri);
            console.log("word: " + word + "; track: ", track);    
        }
        console.log("uri: " + trackUris + " ");
        // const clear = await ApiCtrl.deletePlaylist(token, playlistid);
        const append = await ApiCtrl.appendPlaylist(token, playlistid, trackUris);
        UiCtrl.displayPlaylist(); // now somehow display the playlist? maybe after adding songs it should display the iframe correctly?
    });

    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);

// APPController.init(); // what will this do for me?



