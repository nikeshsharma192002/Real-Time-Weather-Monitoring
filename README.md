# Real-Time Weather Monitoring System

This project is a **real-time data processing system** that monitors weather conditions for several metro cities in India, provides daily weather summaries using rollups and aggregates, and triggers alerts when certain thresholds are breached. The system uses the OpenWeatherMap API to fetch live weather data at configurable intervals.

## Features

- **Weather Data Fetching:** Fetches real-time weather data every 5 minutes for major Indian cities: Delhi, Mumbai, Chennai, Bangalore, Kolkata, and Hyderabad.
- **Temperature Conversion:** Converts temperatures from Kelvin to Celsius.
- **Daily Summaries:** Aggregates weather data for each city daily, calculating:
  - Average temperature
  - Maximum temperature
  - Minimum temperature
  - Dominant weather condition
- **Alerting System:** Triggers alerts if the temperature exceeds a predefined threshold (35°C).
- **Cron Jobs:** Automates fetching data every 5 minutes and generates daily summaries at midnight.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side logic.
- **Axios**: Promise-based HTTP client for making API requests.
- **node-cron**: A scheduler for running tasks periodically (every 5 minutes and at midnight).
- **OpenWeatherMap API**: Provides weather data including temperature, weather conditions, and timestamps.

## Prerequisites

- [Node.js](https://nodejs.org/en/) installed on your system
- OpenWeatherMap API key (Sign up [here](https://openweathermap.org/api) for free access)
  
## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/nikeshsharma192002/Real-Time-Weather-Monitoring.git
cd weather-monitoring-system
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up API Key
  - Obtain an API key from OpenWeatherMap.
  - Replace the API_KEY value in index.js with your actual key:
```bash
const API_KEY = 'your_actual_api_key';
```

### 4. Run the Application
```bash
node index.js
```
The application will start fetching weather data and outputting it to the console. Daily summaries will be displayed at midnight, and alerts will be triggered if the temperature exceeds 35°C.

## Project Structure

  - **index.js**: Main application logic for fetching weather data, processing summaries, and handling alerts.
  - **package.json**: Contains metadata about the project and lists dependencies (axios, node-cron).

## Weather Parameters Used

  - **Main Weather Condition (main)**: E.g., Rain, Clear, Snow.
  - Temperature (temp)**: Current temperature in Celsius.
  - Feels Like (feels_like)**: Perceived temperature in Celsius.
  - Timestamp (dt)**: Unix timestamp representing the time of the data update.

## Rollups and Aggregates
  - **Daily Weather Summary**:
      - Average, maximum, and minimum temperatures
      - Dominant weather condition (most frequent)
  - **Alerts**:
      - If the temperature exceeds 35°C for two consecutive updates, an alert is triggered.

## Test Cases
  - **System Setup**: Verify the system starts correctly and connects to the OpenWeatherMap API with a valid key.
  - **Data Retrieval**: Ensure data is correctly fetched and parsed.
  - **Temperature Conversion**: Verify temperatures are converted from Kelvin to Celsius.
  - **Daily Summary**: Ensure daily summaries (average, max, min temperature) are computed accurately.
  - **Alerting System**: Test that alerts are triggered correctly when thresholds are exceeded.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
