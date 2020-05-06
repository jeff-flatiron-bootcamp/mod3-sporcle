//*************create HTML elements*************************************************************************************
let mainElm = document.querySelector('main');
let btnDiv = document.createElement("div")
//artists selection
let artistBtnDiv = document.createElement("div")
let artistSelect = document.createElement("select")
//song selection
// let songBtnDiv = document.createElement("div")
// let songSelect = document.createElement("select")
//start
let startDiv = document.createElement("div")
let startGame = document.createElement("button")
//input box
let inputDiv = document.createElement("div")
//hint button
let hintDiv = document.createElement("div")
let hintBtn = document.createElement("button")
//hint content
let hintContentDiv = document.createElement("div")
let contentP = document.createElement("p")
//score
let scoreDiv = document.createElement("div")
let score = document.createElement("span")
let lyricsCountNumber = 0
//countdown timer
//let count
let timerDiv = document.createElement("div")
let countdown = document.createElement("p")
countdown.id = "timer"
//count down from 12 minutes
let countDownMinutes = 60 * 12
//pause button
let pauseDiv = document.createElement("div")
let pauseBtn = document.createElement("button")
//give up button
let giveUpDiv = document.createElement("div")
let giveUpBtn = document.createElement("button")
giveUpBtn.id = "giveUp"
//lyric box
let lyricsDiv = document.createElement("table")

let artistId
//*************build HTML elements*************************************************************************************
//countdown timer
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
       count =  setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.innerText = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

//build artists selection drop down
function buildArtistsSelection(artists){
    artistSelect.className = "artists-select"
    artistBtnDiv.innerText = "Select an artist:"
    let opOne = document.createElement("option")
    opOne.innerText = "Random"
    randArtist = Math.floor(Math.random() * artists.length)
    opOne.id = artists[randArtist].id
    artistSelect.appendChild(opOne)
    artists.forEach(artist=>{
        let op = document.createElement("option")
        op.id = artist.id
        op.innerText = artist.name
        artistSelect.appendChild(op)
    })
    // artistSelect.addEventListener("change", selectArtistHandler)
    artistBtnDiv.appendChild(artistSelect)
    btnDiv.appendChild(artistBtnDiv)
}

// function selectArtistHandler(event){
//     debugger
//     artistId = event.target.selectedOptions[0].id
    
//     //fetchArtistSongs(artistId, buildSongs)
// }
//build song
// function buildSongs(songs){
//     songBtnDiv.innerText = "Select an song:"
//     songSelect.className = "songs-select"
//     songSelect.innerHTML=''
//     let opOne = document.createElement("option")
//     opOne.innerText = "Select one ..."
//     songSelect.appendChild(opOne)
//     songs.forEach(song=>{
//         let op = document.createElement("option")
//         op.id = song.id
//         op.innerText = song.title
//         songSelect.appendChild(op)
//     })
//     songSelect.addEventListener("change",()=>selectSongHandler(songs))
//     songBtnDiv.appendChild(songSelect)
//     btnDiv.appendChild(songBtnDiv)
// }

// function selectSongHandler(songs){
//     let songName = event.target.value
//     let songId = event.target.selectedOptions[0].id

// }
//build start game button
function buildStartGameBtn(){
    startGame.innerText = "Start the game"
    startGame.addEventListener("click",()=>{
        //start to see all other buttons

        artistId = artistSelect.selectedOptions[0].id
        
        startDiv.style.display = "none"
        inputDiv.style.display = "block"
        hintDiv.style.display = "block"
        pauseDiv.style.display = "block"
        giveUpDiv.style.display = "block"
        artistSelect.style.display = "none"
        //start timer
        let countdown = document.getElementById("timer")
        startTimer(countDownMinutes, countdown)
        fetchLyrics(artistId,buildLyricBox)
    })
    
    startDiv.appendChild(startGame)
    btnDiv.appendChild(startDiv)

}

//build input box
function buildInputBox(){
    inputDiv.innerHTML = `
    <span>
    Enter lyric: <input type="text" id="inputByUser" name="lyricInput">
    </span>`
    //hide at the beginning
    inputDiv.style.display = "none"
    btnDiv.appendChild(inputDiv)
    let input = document.getElementById("inputByUser")
    input.addEventListener("keydown", function(e){  
        if (e.keyCode === 13){ 
            fetchWord(e.target.value, guessParse)
            e.target.value=""
            } 
        })
}

//build hint button
function buildHintBtn(){
    hintBtn.id = "hint"
    hintBtn.innerText = "Hint"
    hintDiv.style.display = "none"
    
    hintBtn.addEventListener("click", function(e){
        hintDiv.style.display = "none"
        hintContentDiv.style.display = "block"
        fetchHint(findHint(),showHintWord)
    //only show hint for 5 seconds, deal with it! 
        setTimeout(function(){
            hintDiv.style.display = "block"
            hintContentDiv.style.display = "none"
        }, 5000)
    })
    
    hintDiv.appendChild(hintBtn)
    btnDiv.appendChild(hintDiv) 
    //hint content
    function showHintWord(data){
        contentP.innerText = data
    }
    hintContentDiv.style.display = "none"

    hintContentDiv.appendChild(contentP)
    btnDiv.appendChild(hintContentDiv)
}
//
function findHint(){
    let numberOfWords = lyricsDiv.childNodes
    let i
    for (i = 0; i != parseInt(numberOfWords[i].innerText); i++) {
      
    }
    return i
}
//build score
function buildScore(){
    scoreDiv.innerText = "Score: "
    score.innerText = "0"
    
    scoreDiv.appendChild(score)
    btnDiv.appendChild(scoreDiv)

}
//build pause button
function buildPauseBtn(){
    pauseBtn.innerText = "pause"
    pauseDiv.style.display = "none"
    
    pauseBtn.addEventListener("click",function(e){
        let inputBox = document.getElementById("inputByUser")
        let hint = document.getElementById("hint")
        let giveUp = document.getElementById("giveUp")
    
        if(e.target.innerText === "pause"){
            e.target.innerText = "resume"
            //pause timer
            clearInterval(count)
            //disable input box and buttons
            inputBox.disabled = true
            hint.disabled = true
            giveUp.disabled = true
        }
        else{
            e.target.innerText = "pause"
            //resume timer
            let display = document.getElementById("timer")
            let timerCount = display.innerText
            let arrTime = timerCount.split(":")
            let time = parseInt(arrTime[0])*60 + parseInt(arrTime[1])
            startTimer(time, display)
            //resume buttons
            inputBox.disabled = false
            hint.disabled = false
            giveUp.disabled = false
        }
    })
    
    pauseDiv.appendChild(pauseBtn)
    btnDiv.appendChild(pauseDiv)
}
//build countdown timer
function buildCountDownTimer(){
    timerDiv.appendChild(countdown)
    btnDiv.appendChild(timerDiv)
}
//build give up button
function buildGiveUpBtn(){
    giveUpBtn.innerText = "Give up!!!"
    giveUpDiv.style.display = "none"
    
    giveUpBtn.addEventListener("click", showAllAnswers)
    
    giveUpDiv.appendChild(giveUpBtn)
    btnDiv.appendChild(giveUpDiv)
}
//build lyric box
function buildLyricBox(lyricsCount){  
    lyricsCountNumber = lyricsCount
    lyricsDiv.className = "parent"
    for(let i =0; i <lyricsCount;i++){
        let td = document.createElement("td")
        td.id = "box_" + i
        td.innerText = i
        lyricsDiv.appendChild(td)
    }
    mainElm.appendChild(lyricsDiv)
    scoreDiv.innerText = `0/${lyricsCount}`
}

// // Temporary guess button
// let guess = {guess:"you",score: 2, indices: [4, 9, 17, 21, 34] }
// let correctDiv = document.createElement("div")
// let correctBtn = document.createElement("button")
// correctBtn.innerText = "testing"
// correctBtn.addEventListener("click", function(event) {
//     // console.log(guess.indices)
//     guessParse(guess);
// })
// correctDiv.appendChild(correctBtn)
// btnDiv.appendChild(correctDiv)


//parse data from fetch into individual arrays for correct guess handler
function guessParse(guess){
    let arrLength = guess.indices.length
    for (let i = 0; i<arrLength; i++ ){
        const array = []
        array[0]=guess.guess
        array[1]=(guess.indices[i])
        correctGuessHandler(array)
    }


    scoreDiv.innerText = guess.score + "/"+ lyricsCountNumber
}

//replace squares in lyric box with guessed words
function correctGuessHandler(guess){
    const location = (guess[1])
    const guessBox = document.getElementById(`box_${location}`)
    guessBox.innerHTML=guess[0]
}

//*************put all HTML elements together *************************************************************************************
//call all the build
function btnForm(){
mainElm.appendChild(btnDiv)
//select artists
fetchAllArtists(buildArtistsSelection)
//start
buildStartGameBtn()
//input box
buildInputBox()
//hint button with hint content
buildHintBtn()
//score
buildScore()
//countdown timer
buildCountDownTimer()
//pause button
buildPauseBtn()
//give up
buildGiveUpBtn()


}

//giveUp to see all answers
function showAllAnswers(e){
    fetchAllLyrics(handleComplete)
}

// function indexTest(objectJson){
//     console.log(objectJson)
//    }

btnForm()
//fetchLyrics(1)

function handleComplete(completionData) {
    // get everything off of the screen
    // create a new card
    // populate that card with the completionData
    mainElm.innerHTML = ""

    mainElm.style = "text-align: center; border: solid;"

    completionCard = document.createElement("div")
    artistP = document.createElement("p")
    songP = document.createElement("p")
    lyricsP = document.createElement("p")
    scoreP = document.createElement("p")
    timeP = document.createElement("p")

    artistP.innerText = "Artist: " + completionData.artist
    songP.innerText = "Song Title: " + completionData.song_title
    lyricsP.innerText = "Lyrics: " + completionData.lyrics
    scoreP.innerText = "Score: " + completionData.total_score + "/" + completionData.lyrics.split(" ").length
    timeP.innerText = "Time: " + completionData.time

    completionCard.append(artistP, songP, lyricsP, scoreP, timeP)

    mainElm.appendChild(completionCard)
}