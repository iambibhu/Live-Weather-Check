const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');


async function checkWeather(city) {
    const api_key = "2c5b586278f33e89e08750eb1e368050";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if(weather_data.cod === '404'){
        location_not_found.style.display = 'flex';
        weather_body.style.display = 'none';
        console.log("error");
        return;
    }
    weather_body.style.display = 'flex';
    location_not_found.style.display = 'none';
    temp.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    windSpeed.innerHTML = `${weather_data.wind.speed}km/H`;

    switch (weather_data.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "/assets/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "/assets/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "/assets/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "/assets/mist.png";
            break;
        case 'Snow':
            weatherImg.src = "/assets/snow.png";
            break;
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});