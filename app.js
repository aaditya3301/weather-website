let isCelsius = true;

async function fetchWeather(location) {
  const apiKey = 'd04ab0f2f3bbc9b4545fcaf293d5b9d5';
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");
  const weatherInfo = document.getElementById("weather-info");

  const searchLocation = location || document.getElementById("location-input").value;

  document.getElementById("location-input").value = searchLocation;

  loading.style.display = 'block';
  weatherInfo.style.display = 'none';
  error.style.display = 'none';

  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=metric`);
    if (!response.ok) throw new Error("Location not found.");
    const data = await response.json();
    console.log(data);  

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
    document.getElementById("description").textContent = capitalize(data.weather[0].description);
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    updateBackground(data.weather[0].main);

    loading.style.display = 'none';
    weatherInfo.style.display = 'block';
  } catch (err) {
    error.style.display = 'block';
    error.textContent = err.message;
    loading.style.display = 'none';
  }
}

function toggleUnit() {
  const tempElement = document.getElementById("temperature");
  let currentTemp = parseFloat(tempElement.textContent);
  
  if (isCelsius) {
    currentTemp = (currentTemp * 9/5) + 32;
    tempElement.textContent = `${currentTemp.toFixed(1)}°F`;
    document.getElementById("toggle-btn").textContent = "Switch to °C";
  } else {
    currentTemp = (currentTemp - 32) * 5/9;
    tempElement.textContent = `${currentTemp.toFixed(1)}°C`;
    document.getElementById("toggle-btn").textContent = "Switch to °F";
  }
  isCelsius = !isCelsius;
}

function updateBackground(weather) {
  const body = document.body;
  switch (weather) {
    case 'Clear':
      body.style.background = 'url("clear.jpg") no-repeat center center/cover';
      break;
    case 'Clouds':
      body.style.background = 'url("cloud.jpg") no-repeat center center/cover';
      break;
    case 'Rain':
      body.style.background = 'url("rain.png") no-repeat center center/cover';
      break;
    case 'Snow':
      body.style.background = 'url("snow.jpg") no-repeat center center/cover';
      break;
    case 'Thunderstorm':
      body.style.background = 'url("thunderstorm.jpg") no-repeat center center/cover';
      break;
    default:
      body.style.background = 'url("default.jpg") no-repeat center center/cover';
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

window.onload = function() {
  fetchWeather("Delhi");
};

document.getElementById("search-btn").addEventListener("click", function() {
  fetchWeather();
});

