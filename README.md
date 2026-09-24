# Weather Dashboard

A simple, responsive weather dashboard built with vanilla HTML, CSS, and JavaScript. Search any city to view current weather conditions and a 5-day forecast, powered by the OpenWeatherMap API.

## Overview

This project lets a user search for a city and instantly see the current weather conditions (temperature, description, humidity, wind speed, "feels like" temperature) along with a 5-day forecast. It handles loading states, invalid city names, and network failures gracefully, and remembers the last 5 searched cities using `localStorage` so they can be revisited with a single click.

No frameworks, no build tools, no external JavaScript libraries — just three files: `index.html`, `styles.css`, and `script.js`.

## Technologies Used

- **HTML5** — semantic page structure
- **CSS3** — styling, responsive layout via Flexbox and CSS Grid, media queries for mobile breakpoints
- **JavaScript (ES6+)** — DOM manipulation, `async`/`await`, `fetch`, destructuring, template literals, `localStorage`
- **[OpenWeatherMap API](https://openweathermap.org/api)** — current weather and 5-day/3-hour forecast data
- **GitHub Pages** — static hosting/deployment

## Features

- **City search** — search by typing a city name and clicking the Search button or pressing Enter
- **Current weather display** — city name, temperature (°C), weather description, humidity, wind speed, and "feels like" temperature
- **Weather icons** — visual icons from OpenWeatherMap's icon set for current and forecasted conditions
- **5-day forecast** — a row of cards showing day of week, icon, high, and low temperature for each of the next 5 days
- **Loading state** — a loading indicator displays while data is being fetched, and the search button is disabled to prevent duplicate requests
- **Error handling** — clear, distinct messages for an invalid city name versus a network/connection failure
- **Search history** — the last 5 searched cities are saved in `localStorage` and shown as clickable buttons; clicking one re-runs that search
- **Responsive design** — layout adapts across desktop, tablet, and mobile widths (breakpoints at 600px and 380px)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get an OpenWeatherMap API key**
   - Sign up for a free account at [openweathermap.org](https://openweathermap.org/)
   - Go to the **API keys** tab under your account and copy your key
   - Note: a newly generated key can take anywhere from a few minutes up to ~2 hours to activate

3. **Add your API key**
   - Open `script.js`
   - Replace the placeholder value with your own key:
     ```javascript
     const API_KEY = 'your_api_key_here';
     ```

4. **Run the project locally**
   - No build step or server is required — simply open `index.html` in your browser
   - For the best experience (and to avoid any local file-loading quirks), serve it with a lightweight local server, e.g.:
     ```bash
     npx serve .
     ```
     or, if you have Python installed:
     ```bash
     python3 -m http.server
     ```
     then visit `http://localhost:8000` (or whichever port is shown)

## How to Test

Manually verify each of the following in the browser:

1. **Valid search**
   - Type a real city name (e.g. `Nairobi`) and click Search, or press Enter
   - Confirm the current weather section and 5-day forecast populate correctly

2. **Loading state**
   - While a search is in progress, confirm the loading indicator appears and the Search button is disabled
   - Confirm both clear once the data loads

3. **Invalid city name**
   - Search a nonsense city name (e.g. `asdfgh`)
   - Confirm the message *"City not found. Please check the spelling and try again."* appears

4. **Network failure**
   - Disconnect your internet connection and attempt a search
   - Confirm the message *"Unable to connect. Check your internet connection."* appears

5. **Search history**
   - Search 5+ different cities
   - Confirm history buttons appear below the search bar, showing only the most recent 5 unique cities
   - Click a history button and confirm it re-runs the search for that city

6. **Responsive layout**
   - Open browser DevTools (`F12`) and toggle device/responsive mode (`Ctrl+Shift+M` / `Cmd+Shift+M`)
   - Test at desktop width, ≤600px, and ≤380px
   - Confirm the current weather section stacks correctly, the forecast grid adjusts column count, and nothing overlaps or overflows

## Deployment

This project is deployed as a static site via **GitHub Pages**:

1. Push the project to a GitHub repository
2. Go to the repository's **Settings → Pages**
3. Under **Source**, select the `main` branch and root folder
4. Save, and wait for GitHub to publish the site (usually within a minute or two)