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
    } else if(hours >= 12 & hours < 17) {
        return "afternoon"
    } else if(hours >= 17 & hours < 20) {
        return "evening"
    } else if(hours >= 20) {
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
}

function getLocalStorage() {
    let name = document.querySelector(".name")
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}

window.addEventListener('beforeunload', setLocalStorage)
window.addEventListener('load', getLocalStorage)

showTime()