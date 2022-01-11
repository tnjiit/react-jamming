import {CLIENT_ID, REDIRECT_URI} from './Credentials';

const Spotify = {
    accessToken: undefined,
    getAccessToken(){
        if(this.accessToken){
            return this.accessToken;
        } else {
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                this.accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                // clear parameters and allow us to acces  new access access_token
                window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
                window.history.pushState("Access Token", null, "/");
                return this.accessToken;
            } else {
                const accessURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
                window.location = accessURL;
                return undefined;
            }
        }
    },
    async search(term){
        this.accessToken = this.getAccessToken();
        let response = await fetch(
            `https://api.spotify.com/v1/search?type=track&q=${term}`,
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        return jsonResponse.tracks.items.map(
            track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                };
            }
        );
    },
    async savePlaylist(playlistName, tracks){
        this.accessToken = this.getAccessToken();
        let response = await fetch(
            'https://api.spotify.com/v1/me',
            {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        let jsonResponse = await response.json();
        console.log(jsonResponse);
        const userId = jsonResponse.id;

        response = await fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: playlistName,
                })
            }
        );
        jsonResponse = await response.json();
        console.log(jsonResponse);
        let playlistId = jsonResponse.id;

        response = await fetch(
            `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    uris: tracks
                })
            }
        );
        jsonResponse = await response.json();
        console.log(jsonResponse);
    }
};

export default Spotify;
