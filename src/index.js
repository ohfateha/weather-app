function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descElement = document.querySelector("#current-desc");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector(".current-temperature-icon");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="weather-icon">`;
  timeElement.innerHTML = formatDate(date);

  getForcast(response.data.city);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity = searchInputElement.value;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForcast(city) {
  let apiKey = "ade4b83da47e447770f3029co72835bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForcast);
}

function displayForcast(response) {
  let forcastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forcastHTML =
        forcastHTML +
        `<div class="forcast-day">
        <div class="forcast-date">${formatDay(day.time)}</div>

        <img src="${day.condition.icon_url}" class="forcast-icon" />
        <div class="forcast-temp">
          <div class="forcast-temp-max">
            ${Math.round(day.temperature.maximum)}º
          </div>
          <div class="forcast-temp-min">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>`;
    }
  });

  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = forcastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
searchCity("Johor Bahru");
