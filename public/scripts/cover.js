// for the cover page only
const APIController = (function () {

    // get the related album, to display the album cover image
    const _getCover = async (token, album_name) => {        
        const result = await fetch(`https://api.spotify.com/v1/search?q=${album_name}&type=track`, {
            method: 'GET', headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        // console.log('track item data:', data.tracks.items);
        console.log('album cover? data:', data.tracks.items[0]); // .album[0].name
        return data.tracks.items;
    }

    return {
        getCover(t, a) {
            return _getCover(t, a);
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
            const html = `<img src="${img}" alt="">`;

            // should hopefully add an image of the album cover to the div here
            document.querySelector(DOMElements.displayCover).innerHTML = html;
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
    

    DOMInputs.sub_album.addEventListener('click', async () => {
        const token = UiCtrl.getStoredToken().token;
        console.log("what is this", DOMInputs.in_album.value);
        const album = await ApiCtrl.getCover(token, DOMInputs.in_album.value); // should have input of the album
        console.log("album info: ",album.images.url);
        UiCtrl.displayCover(album.images.url); // album image
    });


    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);

// APPController.init(); // what will this do for me?



