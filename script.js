document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "de2b8808d2a979fbfc5d3f0c36481cb5"; // I know I can hide this api_key :)

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      alert("Enter a city name to see weather report!");
      return;
    }

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
      cityInput.value = "";
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      showError();
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    /*
    When we will fetch the data from the api and convert it in json then we can use these to see the data...
    // console.log(weatherData);
    // console.log(weatherData.name);
    // console.log(weatherData.main.temp);
    // console.log(weatherData.weather[0].description);
    */
    cityNameDisplay.textContent = weatherData.name;
    temperatureDisplay.textContent = `Temperature : ${weatherData.main.temp}`;
    descriptionDisplay.textContent = `Description : ${weatherData.weather[0].description}`;

    //hiding the `hidden` property in the paragraph.
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
