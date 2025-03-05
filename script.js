document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4bbd26ac842775674ba861b046343ba4';

    const cityInput = document.getElementById('city');
    const searchButton = document.getElementById('search');

    const dayName = document.getElementById('day-name');
    const dateElement = document.getElementById('date');
    const cityNameElement = document.getElementById('city-name');
    const temperatureElement = document.getElementById('temperature');
    const weatherDescElement = document.getElementById('weather-desc');
    const weatherIconElement = document.getElementById('weather-icon');

    const precipitationElement = document.getElementById('precipitation');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');

    // Fetch Weather Data
    const fetchWeather = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('City not found');
            const data = await response.json();
            updateWeatherUI(data);
        } catch (error) {
            alert('City not found or API error');
            console.error(error);
        }
    };

    // Update UI
    const updateWeatherUI = (data) => {
        const { name, weather, main, wind, sys } = data;
        const temperature = main.temp;
        const weatherDesc = weather[0].description;
        const iconCode = weather[0].icon;

        // Use OpenWeather API's weather icon
        const weatherIconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        dayName.textContent = new Date().toLocaleDateString('en-EN', { weekday: 'long' });
        dateElement.textContent = new Date().toLocaleDateString();
        cityNameElement.textContent = `${name}, ${sys.country}`;

        temperatureElement.textContent = `${temperature}°C`;
        weatherDescElement.textContent = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);

        // Display the correct weather icon
        weatherIconElement.src = weatherIconURL;
        weatherIconElement.alt = weatherDesc;
    };

    // Event Listeners
    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    });

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            searchButton.click();
        }
    });
});
