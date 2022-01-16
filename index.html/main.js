const city = document.querySelector(".location .city")
const date = document.querySelector(".location .date")
const temp = document.querySelector(".weather__app .temp")
const body = document.querySelector("body")
const weather_main = document.querySelector(".weather__app .weather")
const hightLowWeather = document.querySelector(".weather__app .min__max-temp")
const presure = document.querySelector(".weather__app .presure")
const searchbox = document.querySelector('.search');

console.log(body);
const api = {
 
    key: "d8d53059d6781061dd2f7a6c22bec292",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  

  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(weather => {
        return weather.json();
      }).then(displayResults)
       .catch(errorDisplay)
  }
  function errorDisplay(){
      city.innerText = "Can't Find City"
      date.innerText = ""
      temp.innerText = ""
      weather_main.innerText = ""
      hightLowWeather.innerText = ""
      presure.innerText = ""
  }
  function displayResults(weather){
      city.innerText = `${weather.name}, ${weather.sys.country}`
      const today = new Date()
      date.innerText = buildDate(today)
      temp.innerText = `${Math.round(weather.main.temp)}°c`
      weather_main.innerText = weather.weather[0].main
      hightLowWeather.innerText = `${Math.round(weather.main.temp_min)}°c  /  ${Math.round(weather.main.temp_max)}°c`
      presure.innerHTML = `<i class="fas fa-tint"></i> ${Math.round(weather.main.pressure)}`
    } 
  

  function buildDate(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
     
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear()
    return `${day} ${date} ${month} ${year}`
}
