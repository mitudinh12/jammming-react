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
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },

    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.tracks) {
                return jsonResponse.tracks.items.map(track => ({
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri
                    
                }));
            }
            return []; 
        });
    },

    savePlaylist(name, trackUri) {
        if (!name || !trackUri.length) {
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;
        //GET request that returns user's Spotify username
        return fetch('https://api.spotify.com/v1/me', {headers : headers}).then(response => {
            return response.json();
        }).then(jsonResponse => {
                userId = jsonResponse.id;
                //POST request to create a new playlist
                return fetch(`https://api.spotify.com/v1//users/${userId}/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({name: name})
                }). then(response => response.json
                    ).then(jsonResponse => {
                    const playlistID = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({uri: trackUri})
                    });
                });
        });
    }
};

export default Spotify;