const clientId = '48b2d5daf54440aeb83b88d15c027136'; //Variable containing client ID of the Application
const redirectUri = 'http://jamming-cc.surge.sh'; //Variable containing hite-listed addresses to redirect to after authentication success OR failure
let accessToken; //Variable containing user's access token

const Spotify = { //Object stoing the functionality needed to interact with the Spotify API

    getAccessToken() { //Method that check if the user has an Valid Acces Token. If no Access token is present, redirects to Spotify Authorization URI

        if (accessToken) { //Conditional checking for users access token. If it is set, returns the value saved in the access token.
            return accessToken;
        }

        /* If the access token is not already set, check the URL to see if it has just been obtained.
        Uses the .match() method to retriev access token & expiration time from URI
        The match() method retrieves the result of matching a string against a regular expression. */
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); //Variable containing access token value matched against reg ex
        const expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/); //Variable containing expiration time value matched against reg ex

        if (accessTokenMatch && expirationTimeMatch) {//Checks for access token & expiration time in the URL & sets the Access Token Value to an empty string

            accessToken = accessTokenMatch[1]; //Sets the access token value

            const expirationTime = Number(expirationTimeMatch[1]); //When used as a function, Number(value) converts a string or other value to the Number type

            /* Clears the parameters from the URL, so the app doesn’t try grabbing the access token after it has expired 
            The DOM Window object provides access to the browser's session history through the history object.
            The history.pushState() method adds a state to the browser's session history stack */
            window.setTimeout(() => accessToken = '', expirationTime * 1000); // uses the setTimeout Method to set the accessToken to an empty string
            window.history.pushState('Access Token', null, '/');
            return accessToken;

        } else { //If there are not Access Token & Inspiration Time, redirects the user to Spotify authorization URI

            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;

            window.location = accessUrl; //Sets the current page address(URL) & redirects the browser to a new page.
        }
    },

    search(term) { //Method accepting parameter for the user's search term

        const accessToken = Spotify.getAccessToken(); //Givess acces to the Access Token when doing a search

        /* JS Fetch API is used to access & manipulate requests & responses within the HTTP pipeline, fetching resources asynchronously across a network
        A basic fetch() request accepts a URL parameter, sends a request & contain a success & failure promise handler function.
        This can be used to change the request type, headers, specify a request body, and much more */
        return fetch( //Returns a promise that resolves to the list of tracks from the search term
            `https://api.spotify.com/v1/search?type=track&q=${term}`, //Starts the promise chain by returning a GET request  to Spotify endpoint
            {
                headers: { Authorization: `Bearer ${accessToken}` } //Authorization header object with the users Access Token
            }
        ).then(response => {
            return response.json(); //Convert the returned response to JSON
        }).then(jsonResponse => {

            if (!jsonResponse.tracks) { //If the JSON does not contain any tracks, return an empty array.
                return [];
            }

            return jsonResponse.tracks.items.map(track => ({ //Maps the converted JSON to an array of tracks. The mapped array contains a list of track objects
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));

        });

    },

    savePlaylist(name, trackUris) {

        if (!name || !trackUris.length) { //Checks if there are values saved to the method’s two arguments. If not, return
            return;
        }

        const accessToken = Spotify.getAccessToken(); //Givess acces to the Access Token 
        const headers = { Authorization: `Bearer ${accessToken}` } //Variable containing the user’s access token in the implicit grant flow request format
        let userId; //Empty variable for the user’s ID

        //Request returning the user's Spotify username, from the Spotify endpoint and converting it to JSON
        return fetch(`https://api.spotify.com/v1/me`, { headers: headers } //Request to endpoint & headers object
        ).then(response => response.json()).then(jsonResponse => { //Converting response to JSON

            userId = jsonResponse.id; //Saves the response id to the userId variable

            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, //Spotify endpoint for creating a playlist
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ name: name })//JSON.stringify() converts a value to a JSON string.
                }
            ).then(response => response.json()).then(jsonResponse => { //Converts the response to json

                const playlistId = jsonResponse.id; //Converted response to JSON and saved it's id parameter in a variable

                //The returned user ID is used to make a POST request that creates a new playlist in the user’s account and returns a playlist ID.
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, //Spotify endpoint for adding tracks to playlists
                    {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ uris: trackUris }) //Sets the URIs parameter to an array of track URIs passed into the method.
                    }
                );

            });

        });

    }
};

export default Spotify;