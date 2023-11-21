// grab secret data from file
const file_io = require('fs'); // for file input and output
// read static secrets and parse them into an object -> obj.field
let secretdata = file_io.readFileSync('.secret.json');
const secret = JSON.parse(secretdata);

const SpotifyWebApi = require('spotify-web-api-node');
const token = secret.TOKEN;

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

function getSomething() {
    (async () => {
        const data = await spotifyApi.getMe();
        console.log(data.body);
        // getUserPlaylists(me.body.id);
    })().catch(e=> {
        console.error(e);
    });
}

getSomething();