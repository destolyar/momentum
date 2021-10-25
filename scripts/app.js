let randomNum
let isPlay = false
let playNum = 0
let currentPlayTime = 0
let oldQuoteNum

const trackList = {
    0: "River Flows In You.mp3",
    1: "Ennio Morricone.mp3",
    2: "Summer Wind.mp3",
    3: "Aqua Caelestis.mp3"
}


function showTime() {
    const time = document.querySelector('.time')

    const date = new Date()
    time.textContent = date.toLocaleTimeString()
    setTimeout(showTime, 1000)

    showDate()
    showGreeting()
}

function showDate() {
    const date = new Date()
    const options = {month: 'long', day: 'numeric', weekday: "long", timeZone: 'UTC'}
    const currentDate = date.toLocaleDateString('en-En', options)

    const time = document.querySelector('.date')
    time.textContent = currentDate
}

function getTimeOfDay() {
    const date = new Date()
    const hours = date.getHours()
    
    if(hours >= 6 & hours < 12) {
        return "morning"
    } else if(hours >= 12 & hours < 18) {
        return "afternoon"
    } else if(hours >= 18 & hours < 24) {
        return "evening"
    } else if(hours >= 0 & hours < 6) {
        return "night"
    }
}

function showGreeting() {
    const greeting = document.querySelector(".greeting")
    greeting.textContent = `Good ${getTimeOfDay()}`
}

function setLocalStorage() {
    const name = document.querySelector(".name")
    localStorage.setItem('name', name.value);

    const city = document.querySelector(".city")
    localStorage.setItem('city', city.value)
}

function getLocalStorage() {
    let name = document.querySelector(".name")
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }

    let city = document.querySelector(".city")
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } 
}

function getRandomNum(value=20) {
    let num = Math.floor(Math.random() * value) + 1

    randomNum = num
}

function setBg(){
    const img = new Image();
    let timeOfDay = getTimeOfDay()
    let bgNum = randomNum

    bgNum = bgNum.toString()

    if(bgNum.length === 1) {
        bgNum = "0" + bgNum
    }

    img.src = `./assets/img/${timeOfDay}/${bgNum}.jpg`
    img.onload = () => {      
      document.body.style.backgroundImage = `url('./assets/img/${timeOfDay}/${bgNum}.jpg')`
    }
}

function getSlideNext() {
    randomNum++
    if(randomNum > 20) {
        randomNum = 1
    }
    setBg()
}

function getSlidePrev() {
    randomNum--
    if(randomNum < 1) {
        randomNum = 20
    }
    setBg()
}

async function getWeather(city="Minsk") {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0cec7ed5f7b4f43ef5cc88ebf3352e56`
    const res = await fetch(url);
    const data = await res.json();

    const weatherIcon = document.querySelector('.weather-icon')
    const temperature = document.querySelector('.temperature')
    const weatherDescription = document.querySelector('.weather-description')
    const wind = document.querySelector('.wind')
    const humidity = document.querySelector('.humidity')

    let description =  data.weather[0].description
    description = description[0].toUpperCase() + description.slice(1);

    let temperatureInfo = Number(data.main.temp)
    temperatureInfo = Math.round(temperatureInfo)

    let windSpeed = Number(data.wind.speed)
    windSpeed = Math.round(windSpeed)

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${temperatureInfo}°C`;
    weatherDescription.textContent = description;
    wind.textContent = `Wind speed: ${windSpeed} m/s`
    humidity.textContent = `Humidity: ${data.main.humidity}%`
}

function search(ele) {
    if(event.key === 'Enter') {
        getWeather(ele.value)        
    }
}


window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

let slideNext = document.querySelector(".slide-next")
let slidePrev = document.querySelector(".slide-prev")

slideNext.addEventListener("click", getSlideNext)
slidePrev.addEventListener("click", getSlidePrev)

const audio = new Audio();
const play = document.querySelector(".play")
play.addEventListener('click', playAudio)

let nextTrack = document.querySelector(".play-next")
let prevTrack = document.querySelector(".play-prev")

nextTrack.addEventListener("click", playNextTrack)
prevTrack.addEventListener("click", playPrevTreack)

let quoteUpdateElement = document.querySelector(".change-quote")
quoteUpdateElement.addEventListener("click", getQuotes)

function playAudio() {
    if(!isPlay){
        play.classList.add('pause')
        audio.src = `./assets/sounds/${trackList[playNum]}`
        if(currentPlayTime !== 0) {
            audio.currentTime = currentPlayTime
        } else {
        audio.currentTime = 0;
        }
        audio.play();
        isPlay = true     
    } else {
        play.classList.remove('pause')
        currentPlayTime = audio.currentTime
        audio.pause()
        isPlay = false
    }
}

function playNextTrack() {
    audio.pause()
    playNum++
    if(playNum > 3) playNum = 0
    audio.src = `./assets/sounds/${trackList[playNum]}`
    audio.play();
    isPlay = true 
}

function playPrevTreack() {
    audio.pause()
    playNum--
    if(playNum < 0) playNum = 3
    audio.src = `./assets/sounds/${trackList[playNum]}`
    audio.play()
    isPlay = true
}

function createTrackList(){
    let audioListElement = document.querySelector(".play-list")
    
    for(let i = 0; i < 4; i++) {
        li = document.createElement('li')
        li.classList.add("play-item")

        let trackName = trackList[i]
        trackName = trackName.substr(0, trackName.length - 4)

        li.textContent = trackName
        audioListElement.append(li)
    }
}

function getNumForQuote(){
    let num = Math.floor(Math.random() * 9)
    return num
}

async function getQuotes() {  
    const quotes = './assets/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    
    const quoteElement = document.querySelector(".quote")
    const quoteAuthorElement = document.querySelector(".author")
    let num = getNumForQuote()
    if(num === oldQuoteNum) {
        num = getNumForQuote()
    }
    quoteElement.textContent = data[num].text
    quoteAuthorElement.textContent = data[num].author
    oldQuoteNum = num
}

function secondFunctions() {
    getWeather()
    getRandomNum()
    setBg()
    showTime()
    createTrackList()
    getQuotes();
}
secondFunctions()

if(audio.currentTime === audio.duration) {
    playNextTrack()
}
