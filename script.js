// script.js

const API_KEY = 'd473f14bb98aba87b793c760e80b960b'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const searchHistoryContainer = document.getElementById('search-history');
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const errorTextEl = document.getElementById('error-text');
const weatherDisplay = document.getElementById('weather-display');
const cityNameEl = document.getElementById('city-name');
const temperatureEl = document.getElementById('temperature');
const weatherIconEl = document.getElementById('weather-icon');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsLikeEl = document.getElementById('feels-like');
const forecastCardsEl = document.getElementById('forecast-cards');

function showLoading() {
    loadingEl.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    errorMessageEl.classList.add('hidden');
}

function hideLoading() {
    loadingEl.classList.add('hidden');
}

function showWeather() {
    weatherDisplay.classList.remove('hidden');
    errorMessageEl.classList.add('hidden');
}

function showError(message) {
    errorTextEl.textContent = message;
    errorMessageEl.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
}

// takes the raw API data and writes it into the DOM
function displayCurrentWeather(data) {
    const { name } = data;
    const { temp, feels_like, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    cityNameEl.textContent = name;
    temperatureEl.textContent = `${Math.round(temp)}°C`;
    descriptionEl.textContent = description;
    weatherIconEl.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIconEl.alt = description;
    humidityEl.textContent = `${humidity}%`;
    windEl.textContent = `${speed} m/s`;
    feelsLikeEl.textContent = `${Math.round(feels_like)}°C`;
}

async function searchWeather(city) {
    showLoading();
    searchBtn.disabled = true;

    try {
        const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (response.status === 404) {
            throw new Error('City not found');
        }
        if (!response.ok) {
            throw new Error('API error');
        }

        const data = await response.json();
        displayCurrentWeather(data); 
        showWeather();  
        // fetch and display the 5-day forecast
        const forecastUrl = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
            throw new Error('Forecast API error');
        }
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);             
    } catch (error) {
        if (error.message === 'City not found') {
            showError('City not found. Please check the spelling and try again.');
        } else if (error instanceof TypeError) {
            showError('Unable to connect. Check your internet connection and try again.');
        } else {
            showError('Something went wrong. Please try again later.');
        }
    } finally {
        hideLoading();
        searchBtn.disabled = false;
    }
}

function filterDailyForecast(list) {
    const days = {};

    list.forEach(function(item) {
        const date = new Date(item.dt * 1000).toLocaleDateString();

        if (!days[date]) {
            days[date] = item;
        }
    });

    const allDays = Object.values(days);
    return allDays.slice(1, 6);
}

function displayForecast(data) {
    forecastCardsEl.innerHTML = '';

    const dailyData = filterDailyForecast(data.list);

    dailyData.forEach(function(day) {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const { icon, description } = day.weather[0];
        const tempHigh = Math.round(day.main.temp_max);
        const tempLow = Math.round(day.main.temp_min);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <div class="temp-high">${tempHigh}°C</div>
            <div class="temp-low">${tempLow}°C</div>
        `;

        forecastCardsEl.appendChild(card);
    });
}

searchBtn.addEventListener('click', function() {
    const city = cityInput.value.trim();
    if (city !== '') {
        searchWeather(city);
    }
});

cityInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city !== '') {
            searchWeather(city);
        }
    }
});