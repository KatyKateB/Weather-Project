
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
let minutes = now.getMinutes();
let year = now.getFullYear();

currentDate.innerHTML = `${day}  ${hours}:${minutes}`;

function showTemp(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let degree = document.querySelector("#temperature");
  degree.innerHTML = `${temp}`;

  let description = document.querySelector("#conditions");
  description.innerHTML = response.data.weather[0].main;
    
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;

  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;

  let city = response.data.name;
  let currentyCity = document.querySelector("#city");
  currentyCity.innerHTML = `${city}`;

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
console.log(searchForm);

let currentLocationButton = document.querySelector("#city-input");
currentLocationButton.addEventListener("submit", searchLocation);
console.log(currentLocationButton);
