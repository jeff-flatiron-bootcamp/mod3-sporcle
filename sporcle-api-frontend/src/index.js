// const BASE_URL = "http://localhost:3000"
// const ARTISTS_URL = `${BASE_URL}/artists`
// const SONG_URL = `${BASE_URL}/songs`

// let mainElm = document.querySelector('main');
// let artistSelect = document.querySelector('.artists-select');
// let songSelect = document.querySelector('.song-select');
// let songlyrics = document.querySelector('#song-lyrics');
// let artistMaintainer = {};

// function clearAllFields()
// {
//     artistSelect.innerHTML = ''   
//     songSelect.innerHTML = ''  
//     songlyrics.innerHTML = ''
// }

// function clearSpecificElement(elementToClear)
// {
//     elementToClear.innerHTML = ''
// }

// function fetchAllArtists()
// {    
//     fetch(ARTISTS_URL)
//     .then(res => res.json())
//     .then(data => artistsAllHandler(data))
// }

// function artistsAllHandler(artistsData)
// {
//     clearAllFields()    
//     artistsData.forEach(artist => {
//         let option = document.createElement("option")
//         option.text = artist.name;
//         option.value = artist.id;
//         artistSelect.append(option);
//     })    
//     artistSelect.addEventListener('change', changedArtist);
//     artistSelect.selectedIndex = -1
// }

// function changedArtist(e)
// {    
//     clearSpecificElement(songlyrics);
//     fetchOneArtist(e.target.value);
// }

// function fetchOneArtist(artistId)
// {    
//     let artistURL = `${ARTISTS_URL}/${artistId}`
//     fetch(artistURL)
//     .then(res => res.json())
//     .then(data => artistsOneHandler(data))
// }

// function artistsOneHandler(artistData)
// {    
//     artistData.songs.forEach(song => {
//         let option = document.createElement("option")
//         option.text = song.title;
//         option.value = song.id;
//         songSelect.append(option);
//     })    
//     debugger
//     songSelect.addEventListener('change', changedSong);
//     songSelect.selectedIndex = -1
// }

// function changedSong(e)
// {    
//     debugger
//     fetchOneSong(e.target.value)
// }

// function fetchOneSong(songId)
// {    
//     let songURL = `${SONG_URL}/${songId}`
//     fetch(songURL)
//     .then(res => res.json())
//     .then(songJSON => songContentHandler(songJSON))
// }

// function songContentHandler(songData)
// {    
//     songlyrics.innerText = songData.lyric
// }

// fetchAllArtists()



fetchAllArtists()
fetchLyrics(1)
