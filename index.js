const axios = require('axios');
const cron = require('node-cron');

// OpenWeatherMap API key
const API_KEY = 'ea4187bb60f29da97f7d0e53bee0f506';  // Replace with your actual API key
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

// Function to convert temperature from Kelvin to Celsius
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

// Function to fetch weather data for a city
const fetchWeatherData = async (city) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
        const weatherData = response.data;
        
        const cityWeather = {
            city: weatherData.name,
            temperature: kelvinToCelsius(weatherData.main.temp),
            feels_like: kelvinToCelsius(weatherData.main.feels_like),
            weather_condition: weatherData.weather[0].main,
            timestamp: new Date(weatherData.dt * 1000).toLocaleString()  // Convert Unix timestamp to human-readable time
        };
        
        console.log(cityWeather);
        return cityWeather;
    } catch (error) {
        console.error(`Error fetching data for ${city}:`, error.message);
        return null;
    }
};

// Function to fetch weather data for all cities
const fetchAllCitiesWeather = async () => {
    for (const city of cities) {
        const cityWeather = await fetchWeatherData(city);
        if (cityWeather) {
            updateDailySummary(city, cityWeather);
            checkAlerts(city, cityWeather);
        }
    }
};

// Daily weather data storage
let dailyWeatherData = {};

// Function to update daily summary for each city
const updateDailySummary = (city, weatherData) => {
    const cityData = dailyWeatherData[city] || { temps: [], weatherConditions: {} };

    // Store temperature
    cityData.temps.push(parseFloat(weatherData.temperature));

    // Store weather condition counts
    const condition = weatherData.weather_condition;
    cityData.weatherConditions[condition] = (cityData.weatherConditions[condition] || 0) + 1;

    dailyWeatherData[city] = cityData;
};

// Function to calculate and display daily summary at the end of the day
const calculateDailySummary = () => {
    console.log("Daily Weather Summary:");
    for (const city in dailyWeatherData) {
        const cityData = dailyWeatherData[city];
        const avgTemp = (cityData.temps.reduce((sum, temp) => sum + temp, 0) / cityData.temps.length).toFixed(2);
        const maxTemp = Math.max(...cityData.temps).toFixed(2);
        const minTemp = Math.min(...cityData.temps).toFixed(2);

        // Determine dominant weather condition
        const dominantCondition = Object.keys(cityData.weatherConditions).reduce((a, b) =>
            cityData.weatherConditions[a] > cityData.weatherConditions[b] ? a : b
        );

        console.log(`${city}: Avg Temp: ${avgTemp}°C, Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C, Dominant Condition: ${dominantCondition}`);
    }
};

// Schedule weather data retrieval every 5 minutes
cron.schedule('*/5 * * * *', async () => {
    console.log('Fetching weather data...');
    await fetchAllCitiesWeather();
});

// Reset daily data and calculate daily summary at midnight
cron.schedule('0 0 * * *', () => {
    console.log("Calculating daily weather summary...");
    calculateDailySummary();
    dailyWeatherData = {};  // Reset data for next day
});

// Alert system
const alertThreshold = 35;  // Alert if temperature exceeds 35°C

const checkAlerts = (city, weatherData) => {
    if (parseFloat(weatherData.temperature) > alertThreshold) {
        console.log(`Alert! Temperature in ${city} exceeds ${alertThreshold}°C. Current Temp: ${weatherData.temperature}°C`);
        // You can implement email notifications here using nodemailer if needed
    }
};

// Initial call to fetch weather data
fetchAllCitiesWeather();
