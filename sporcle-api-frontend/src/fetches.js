const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const SONG_URL = `${BASE_URL}/songs`
const GAMES_URL = `${BASE_URL}/games`

function fetchLyrics(artistID, callBackFunction) {
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
    .then(json => {
        localStorage.setItem("game_id", json.game_id);
        callBackFunction(json.lyric_length)
    }) // this should just be an integer as a length - will we populate the score denominator and the word li's/tr's using a for loop
};

function fetchAllArtists(populateArtists){    
    fetch(ARTISTS_URL)
    .then(res => res.json())
    .then(data => populateArtists(data))
};

function fetchHint(hintNumber,callBackFunction) {
    fetch(GAMES_URL + '/hint', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            game_id: localStorage.getItem("game_id"),
            hintNumber: hintNumber
        })
    })
    .then(res => res.json())
    .then(json => callBackFunction(json.hint))
}

function fetchWord(word, callBackFunction) {
    fetch(GAMES_URL + `/guess`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            game_id: localStorage.getItem("game_id"),
            guess: word
        })
    })
    .then(res => res.json())
    .then(json => callBackFunction(json))
}

function fetchAllLyrics(callBackFunction, message)
{
    fetch(GAMES_URL + `/finish`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            game_id: localStorage.getItem("game_id")           
        })
    })
    .then(res => res.json())
    .then(json => {
        callBackFunction(json, message)
    })
}


// For testing sessions

// function practiceFetch() {
//     fetch(GAMES_URL, {
//     credentials: "same-origin"
// })
// }
