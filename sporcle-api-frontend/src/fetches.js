function fetchLyrics() {
    fetch('http://127.0.0.1:3000/games/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({artist_id: 1}) //this will have to change to dynamic routing
    }) // should go to games#create ----- therefore, this should be a post request when built out
    .then(res => res.json())
    .then(json => console.log(json)) // this should just be an integer as a length - will we populate the score denominator and the word li's/tr's using a for loop
}

function fetchArtists() { // fetches all artists - called at the beginning to populate dropdown box
    // some sort of code goes here
}

