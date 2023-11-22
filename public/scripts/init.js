
// for the song page only
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
        console.log("token1", data.access_token);
        return data.access_token;
    }

    return {
        getToken() {
            return _getToken();
            // return acces_token;
        }
    }

})();


const UIController = (function () {
    const DOMElements = {     
        hfToken: '#hidden_token'
    }

    return {  
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
    const loadPage = async () => {
        const token = await ApiCtrl.getToken();
        // console.log("on load", token);

        UiCtrl.storeToken(token);

        // const track = await ApiCtrl.getTrack(token, query); // need to figure out query here.
    }
    return {
        init() {
            console.log("App is starting...");
            loadPage();
        }
    }

})(UIController, APIController);

APPController.init(); // initialize the access key for the hour session.



