
let now = new Date();
let currentDate = document.querySelector("#current-date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];


let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

currentDate.innerHTML = `${day}  ${hours}:${minutes}`;



function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

return days[day];

}

function displayForecast(response) {
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`; 
forecast.forEach(function(forecastDay, index) {
 if (index < 6) {
forecastHTML = forecastHTML + 
`
<div class="col-2">
        <div class="card border-info mb-3" style="max-width: 18rem;">
            <div class="card-header">
                ${formatDay(forecastDay.dt)}
            </div>
            <div class="card-body">
                <h5 class="card-title">
                    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
                    alt="" width="36" </h5>
                    <p class="card-text">
                        <span class="card-text-temp-max">${Math.round(forecastDay.temp.max)}°</span>
                        <span class="card-text-temp-min">${Math.round(forecastDay.temp.min)}°</span>
                    </p>
            </div>
        </div>
        </div>
        `;
  }
})

forecastHTML = forecastHTML +`</div>`;
forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ab16c38b122d10abe8b3cbd5ce9558c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  
  axios.get(apiUrl).then(displayForecast);
}



function showTemp(response) {
  //console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#temperature");
  degree.innerHTML = `${temp}`;
  
  fahrenheitTemperature = response.data.main.temp;

  let description = document.querySelector("#conditions");
  description.innerHTML = response.data.weather[0].description;
    
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let city = response.data.name;
  let currentyCity = document.querySelector("#city");
  currentyCity.innerHTML = `${city}`;

  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 

  getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${searchCityInput.value}`;

let apiKey = "ab16c38b122d10abe8b3cbd5ce9558c2";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let unit = "imperial";
let apiUrl = `${apiEndpoint}?q=${searchCityInput.value}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showTemp);
}

function searchLocation(position) {
let apiKey = "ab16c38b122d10abe8b3cbd5ce9558c2";
let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
let unit = "imperial";
let lat = "position.coords.latitude";
let lon = "position.coords.longitude";
let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showTemp);
 }

function displayCurrentLocation(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(searchLocation);

}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5/9);  
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
console.log(searchForm);

let currentLocationButton = document.querySelector("#city-input");
currentLocationButton.addEventListener("submit", searchLocation);
console.log(currentLocationButton);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

