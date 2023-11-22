// for the song page only
const APIController = (function () {

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
    return {
        getTrack(t, q) { // token and query
            return _getTrack(t, q);
        },
    }

})();

const UIController = (function () {
    const DOMElements = {
        trackSubmit: '#sub_track', // button for getting random track   
        displayTrack: '#random_track', // div for displaying the returned song       
        hfToken: '#hidden_token'
    }

    return {
        // not really sure what theses return to quite yet, obviously are the selected fields.
        inputField() {
            return {
                sub_track: document.querySelector(DOMElements.trackSubmit),
                dis_ran_track: document.querySelector(DOMElements.displayTrack),
            }
        },
        randTrack(name, artist, album) {
            const html = `Title: <span class="green">${name}</span>; Artist: <span class="green">${artist}</span>; Album: <span class="green">${album}</span>`;
            document.querySelector(DOMElements.displayTrack).innerHTML = html; // or ${} idk
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

    // random track - for now not random?
    DOMInputs.sub_track.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;

        const query = "Chlorine";
        const track = await ApiCtrl.getTrack(token, query);
        console.log("APP track: ", track);
        UiCtrl.randTrack(track[0].name, track[0].artists[0].name, track[0].album.name ); // hopefully sends the name to the track to be displayed?
    });

    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);





