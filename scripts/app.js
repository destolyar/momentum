function showTime() {
    const time = document.querySelector('.time')

    const date = new Date()
    time.textContent = date.toLocaleTimeString()
    setTimeout(showTime, 1000)

    showDate()
}

function showDate() {
    const date = new Date()
    const options = {month: 'long', day: 'numeric', weekday: "long", timeZone: 'UTC'}
    const currentDate = date.toLocaleDateString('en-En', options)

    const time = document.querySelector('.date')
    time.textContent = currentDate
}

showTime()

