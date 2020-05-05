const BASE_URL = "http://localhost:3000"
const ARTISTS_URL = `${BASE_URL}/artists`
const SONG_URL = `${BASE_URL}/songs`
let countDownMinutes = 60 * 12

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

function btnForm(){

let mainElm = document.querySelector('main');
let btnDiv = document.createElement("div")
mainElm.appendChild(btnDiv)
//select artists
let artistBtnDiv = document.createElement("div")
let artistSelect = document.createElement("select")
artistSelect.className = "artists-select"
artistBtnDiv.innerText = "Select an artist:"
artistBtnDiv.appendChild(artistSelect)
btnDiv.appendChild(artistBtnDiv)

//start
let startDiv = document.createElement("div")
let startGame = document.createElement("button")
startGame.innerText = "Start the game"

startGame.addEventListener("click",()=>{
    //start to see all other buttons
    startDiv.style.display = "none"
    formDiv.style.display = "block"
    hintDiv.style.display = "block"
    pauseDiv.style.display = "block"
    giveUpDiv.style.display = "block"
    //start timer
    let countdown = document.getElementById("timer")
    startTimer(countDownMinutes, countdown)
})

startDiv.appendChild(startGame)
btnDiv.appendChild(startDiv)

//form
let formDiv = document.createElement("div")
formDiv.innerHTML = `
                    <form>
                    <input type="text" id="inputA">
                    <input type="submit" id="submit">
                    </form>`

//hide at the beginning

formDiv.style.display = "none"
btnDiv.appendChild(formDiv)

let input = document.getElementById("inputA")
input.addEventListener("keyup", function(e){
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("submit").click();
       }
})

// formDiv.addEventListener("submit",function(e){
//     e.preventDefault()
//     console.log(e.target.input.value)
// })


//hint button
let hintDiv = document.createElement("div")
let hintBtn = document.createElement("button")
hintBtn.id = "hint"
hintBtn.innerText = "Hint"
hintDiv.style.display = "none"

hintBtn.addEventListener("click", function(e){
    hintDiv.style.display = "none"
    hintContentDiv.style.display = "block"

//only show hint for 5 seconds, deal with it! 
    setTimeout(function(){
        hintDiv.style.display = "block"
        hintContentDiv.style.display = "none"
    }, 5000)
})

hintDiv.appendChild(hintBtn)
btnDiv.appendChild(hintDiv)

//show hint
let hintContentDiv = document.createElement("div")
let contentP = document.createElement("p")
contentP.innerText = "I am the hint"
hintContentDiv.style.display = "none"

hintContentDiv.appendChild(contentP)
btnDiv.appendChild(hintContentDiv)

//score
let scoreDiv = document.createElement("div")
let score = document.createElement("span")
scoreDiv.innerText = "Score: "
score.innerText = "0/100"

scoreDiv.appendChild(score)
btnDiv.appendChild(scoreDiv)

//countdown timer
let timerDiv = document.createElement("div")
let countdown = document.createElement("p")
countdown.id = "timer"

timerDiv.appendChild(countdown)
btnDiv.appendChild(timerDiv)

//pause button
let pauseDiv = document.createElement("div")
let pauseBtn = document.createElement("button")
pauseBtn.innerText = "pause"
pauseDiv.style.display = "none"

pauseBtn.addEventListener("click",function(e){
    let submit = document.getElementById("submit")
    let hint = document.getElementById("hint")
    let giveUp = document.getElementById("giveUp")

    if(e.target.innerText === "pause"){
        e.target.innerText = "resume"
        //pause timer
        clearInterval(count)
        //disable submit button
        submit.disabled = true
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
        submit.disabled = false
        hint.disabled = false
        giveUp.disabled = false
    }
})

pauseDiv.appendChild(pauseBtn)
btnDiv.appendChild(pauseDiv)


//give up
let giveUpDiv = document.createElement("div")
let giveUpBtn = document.createElement("button")
giveUpBtn.id = "giveUp"
giveUpBtn.innerText = "Give up!!!"
giveUpDiv.style.display = "none"

giveUpBtn.addEventListener("click", showAllAnswers)

giveUpDiv.appendChild(giveUpBtn)
btnDiv.appendChild(giveUpDiv)

//lyrics box
let lyricsCount = 50

let lyricsDiv = document.createElement("table")
lyricsDiv.className = "parent"
for(let i =0; i <lyricsCount;i++){
    let td = document.createElement("td")
    td.id = i
    td.innerText = i
    lyricsDiv.appendChild(td)
}


mainElm.appendChild(lyricsDiv)
}
//giveUp to see all answers
function showAllAnswers(e){

}



btnForm()
