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
    } catch (error) {
        console.log(error); 
    } finally {
        hideLoading();
        searchBtn.disabled = false;
    }
}

searchWeather('Nairobi');