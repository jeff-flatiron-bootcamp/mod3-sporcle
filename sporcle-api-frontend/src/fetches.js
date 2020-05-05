const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const SONG_URL = `${BASE_URL}/songs`
const GAMES_URL = `${BASE_URL}/games`

function fetchLyrics(artistID) {
    fetch(GAMES_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({artist_id: artistID}) //this will have to change to dynamic routing
    }) // should go to games#create ----- therefore, this should be a post request when built out
    .then(res => res.json())
    .then(json => console.log(json)) // this should just be an integer as a length - will we populate the score denominator and the word li's/tr's using a for loop
};

function fetchAllArtists(){    
    fetch(ARTISTS_URL)
    .then(res => res.json())
    .then(data => console.log(data))
};

function fetchHint() {
    
}

function practiceFetch() {
    fetch(GAMES_URL, {
    credentials: "same-origin"
})
}
