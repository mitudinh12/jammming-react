const clientId = 'f834ffbeea324847ba2655639c7e965d';
const redirectURI = 'http://localhost:3000/';
let accessToken;
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        // check for access token match, use regex to access the access token and expiration time
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //clear the parameters, allowing us to grab a new access token when it expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }


    }
};

export default Spotify;