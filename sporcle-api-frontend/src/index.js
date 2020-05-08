 function runGame(){
 //*************create HTML elements*************************************************************************************
    let mainElm = document.querySelector('main');
    let btnDiv = document.createElement("div")
    btnDiv.id="btnDiv"
    //artists selection
    let artistBtnDiv = document.createElement("div")
    let artistSelect = document.createElement("select")
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
    scoreDiv.id="scoreDiv"
    scoreDiv.style.display = "none"
    let score = document.createElement("span")
    let lyricsCountNumber = 0
    //countdown timer
    let timerDiv = document.createElement("div")
    let countdown = document.createElement("p")
    countdown.id = "timer"
    //count down from 5 minutes
    let countDownMinutes = 60*5
    //give up button
    let giveUpDiv = document.createElement("div")
    let giveUpBtn = document.createElement("button")
    giveUpBtn.id = "giveUp"
    //lyric box
    let lyricsDiv = document.createElement("table")
    //songTitle
    let songTitleDiv = document.createElement("div")
    let songTitle = document.createElement("p")
    let artistId
    let currentHint
    //*************build HTML elements*************************************************************************************
    //countdown timer
    function startTimer(duration, display) {
        let timer = duration, minutes, seconds;
        timer.id=timer
        count =  setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

           // minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.innerText = minutes + ":" + seconds;

            if (--timer < 0) {
                showAllAnswers("Time ran out!")
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
        randArtistName = artists[randArtist].name
        // artistSelect.addEventListener("change", selectArtistHandler)
        artistBtnDiv.appendChild(artistSelect)
       // btnDiv.appendChild(artistBtnDiv)
    }

    //build start game button
    function buildStartGameBtn(){
        startGame.innerText = "Start the game"
        startGame.addEventListener("click",()=>{
            //start to see all other buttons

            artistId = artistSelect.selectedOptions[0].id
            artistName = artistSelect.selectedOptions[0].value    
            if(artistName == "Random")    
            {
                artistName = randArtistName
            }
            startDiv.style.display = "none"
            inputDiv.style.display = "block"
            hintDiv.style.display = "block"        
            giveUpDiv.style.display = "block"
            artistSelect.style.display = "none"
            scoreDiv.style.display = "block"
            artistBtnDiv.innerHTML = "Artist: "+ artistName
            songTitle.style.display = "block"
            //start timer
            let countdown = document.getElementById("timer")
            startTimer(countDownMinutes, countdown)
            fetchLyrics(artistId,buildLyricBox)
        })
        
        startDiv.appendChild(startGame)
        btnDiv.appendChild(startDiv)

    }

        //build title
        titleDiv=document.createElement('div')
        titleDiv.id="titleDiv"
        appTitle=document.createElement('p')
        appTitle.innerText="Sporcle Distancing"
        titleDiv.appendChild(appTitle)
        btnDiv.appendChild(titleDiv)

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
            hintDiv.style.visibility = "hidden"
            fetchHint(findHint(),showHintWord)
            setTimeout(function(){
                hintDiv.style.visibility = "visible"
                currentHint.classList.toggle("current_hint")
                if ((currentHint.innerText == "Very short word") || (currentHint.innerText[1] == "*")) {
                    currentHint.innerText = currentHint.id.split("_")[1]
                } 
            }, 5000)
        })
        
        hintDiv.appendChild(hintBtn)
        btnDiv.appendChild(hintDiv) 
        //hint content
        function showHintWord(data){
            currentHint.classList.toggle("current_hint")
            currentHint.innerText = data.hint
            scoreDiv.innerText = "Score: "+data.total + "/" + scoreDiv.innerText.split("/")[1]
        }
        hintContentDiv.style.display = "none"

        hintContentDiv.appendChild(contentP)
        btnDiv.appendChild(hintContentDiv)
    }
    //
    function findHint(){
        numberOfWords = lyricsDiv.childNodes
        let i
        for (i = 0; i != parseInt(numberOfWords[i].innerText - 1); i++) {
        
        }
        currentHint = document.getElementById(`box_${i}`)
        return i
    }
    //build score
    function buildScore(){
        scoreDiv.innerText = "Score: "
        score.innerText = "0"
        
        scoreDiv.appendChild(score)
        btnDiv.appendChild(scoreDiv)

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
        
        giveUpBtn.addEventListener("click", giveUpHandler)
        
        giveUpDiv.appendChild(giveUpBtn)
        btnDiv.appendChild(giveUpDiv)
    }
    //build lyric box
    function buildLyricBox(lyricsCount){  
        lyricsCountNumber = lyricsCount
        lyricsDiv.className = "parent"
        lyricsDiv.id = "lyricsBox"
        for(let i =0; i <lyricsCount;i++){
            let td = document.createElement("td")
            td.id = "box_" + i
            td.style = "background-color:white"
            td.innerText = i + 1
            lyricsDiv.appendChild(td)
        }
        mainElm.appendChild(lyricsDiv)
        scoreDiv.innerText = "Score: " +`0/${lyricsCount}`
    }

    //custom message based on timeout
    function displayMessageWithTimeout(input)
    { 
        infoBox = document.createElement('div')    
        mainElm.append(infoBox);
        infoBox.innerText = input;
        setTimeout(function(){ infoBox.remove() }, 2000);
    }

    //parse data from fetch into individual arrays for correct guess handler
    function guessParse(guess){
        if(guess.error)
        {
            displayMessageWithTimeout(guess.error)
            return false
        }

        let arrLength = guess.indices.length    
        for (let i = 0; i<arrLength; i++ ){
            const array = []
            array[0]=guess.guess
            array[1]=(guess.indices[i])
            correctGuessHandler(array)
        }
        scoreDiv.innerText = guess.score + "/"+ lyricsCountNumber
        gameEnded() ? showAllAnswers("Great job!") : null
    }

    //replace squares in lyric box with guessed words
    function correctGuessHandler(guess){
        const location = (guess[1])
        const guessBox = document.getElementById(`box_${location}`)
        guessBox.style.color="white"
        guessBox.style.backgroundColor="black"
        guessBox.style.borderColor="white"
        guessBox.innerHTML=guess[0]
    }
    //give out song name
    function buildSongTitleHint(){

        songTitle.innerText = "Song Title?"
        songTitle.style.display = "none"
        songTitle.addEventListener("click", function(){
            fetchSongTitle(showSongTitle)

        })
        songTitleDiv.appendChild(songTitle)
        btnDiv.appendChild(artistBtnDiv)
        btnDiv.appendChild(songTitleDiv)
    }

    function showSongTitle(data){
        songTitle.innerText = "Song: " + data.song_title
        scoreDiv.innerText = "Score: "+data.total + "/" + scoreDiv.innerText.split("/")[1]

    }
    //*************put all HTML elements together *************************************************************************************
    //call all the build
    function btnForm(){
     
    mainElm.appendChild(btnDiv)
    //select artists
    fetchAllArtists(buildArtistsSelection)
    buildSongTitleHint()
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
    //give up
    buildGiveUpBtn()


    }

    //giveUp to see all answers
    function showAllAnswers(message){
        fetchAllLyrics(handleComplete, message)
    }

    btnForm()

    function handleComplete(completionData, message) {
        // get everything off of the screen
        // create a new card
        // populate that card with the completionData
        time = countdown.innerText

        mainElm.innerHTML = ""

        clearInterval(count)

        completionCard = document.createElement("div")
        completionCard.id = "completionCard"
        
        messageP = document.createElement("p")
        artistP = document.createElement("p")
        songP = document.createElement("p")
        lyricsP = document.createElement("p")
        scoreP = document.createElement("p")
        timeP = document.createElement("p")
        let nexSongBtn = document.createElement("button")

        let totalLyrics = completionData.lyrics.split(/\n/).map(word => {
            return word.split(" ")
        }).flat()
        
        artistP.innerText = "Artist: " + completionData.artist
        songP.innerText = "Song Title: " + completionData.song_title
        lyricsP.innerText = "Lyrics: " + completionData.lyrics
        scoreP.innerText = "Score: " + completionData.total_score + "/" + totalLyrics.length
        timeP.innerText = "Time Remaining: " + completionData.time
        messageP.innerText = message
        nexSongBtn.innerText = "Next Song"
        nexSongBtn.addEventListener("click", handleNextSong)

        completionCard.append(messageP, artistP, songP, lyricsP, scoreP, timeP,nexSongBtn)
        mainElm.appendChild(completionCard)
    }

    function gameEnded() {
        let numberOfWords = lyricsDiv.childNodes
        let i 
        for (i = 0; i < numberOfWords.length; i++) {
            if (numberOfWords[i].innerText == i + 1) {
                return false;
            }
        }
        return true
    }

    function giveUpHandler() {
        showAllAnswers("You gave up")
    }
}
function handleNextSong(){
    let mainElm = document.querySelector('main');
    mainElm.innerHTML = ""
    mainElm.style = ''
    runGame()

}
runGame()