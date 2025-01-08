// selecting the areas we should update
const temperature = document.querySelector('.temp')
const condition = document.querySelector('.weather_condition span')
const currLocation = document.querySelector('.time_location p')
const currenttime = document.querySelector('.time_location span')
const weatherIcon = document.querySelector('#weather-icon')

// now to get value from the form 
const form = document.querySelector('form')
const searchField = document.querySelector('.searchField')

form.addEventListener('submit', search)

function search(e){
    e.preventDefault() // prevents from reloading the page while clicking on the search button
    let target = searchField.value 
    fetchData(target) // calling the async function to get the values
     searchField.value = null
}

async function fetchData(target){
    try{
        const url = `http://api.weatherapi.com/v1/current.json?key=20c6ec8c38b34a1baa5182722241812&q=${target}&aqi=yes`;// template literals 
        const response = await fetch(url) // this gives the op indirectly inside as an object  
        const data = await response.json() // to convert it to json format and unlock the data then it also converts back to js object
        console.log(data)

        const currentLocation = data.location.name
        const currentTemp = data.current.temp_c
        const cond = data.current.condition.text
        const timeDate = data.location.localtime
        const weatherIconUrl = data.current.condition.icon
        asignValues(cond, timeDate, currentLocation, currentTemp, weatherIconUrl)
    }
    catch{
        console.log('Enter correct location')
    }
}

fetchData('chennai')

function asignValues(cond, time, location, temp, icon){
    // add the values to their respective feilds
    temperature.innerText= temp+' c'
    condition.innerText= cond
    currLocation.innerText = location
    currenttime.innerText = time
    weatherIcon.src = icon

}

