// server.js
const express = require("express");
const cors = require("cors");
const destinations = require("./destinations");
const axios = require("axios");

const app = express();
const PORT = 5000;

// If you want real weather from OpenWeather, replace with your API key
const WEATHER_API_KEY = "dbd7518c79ed5f36698bf4ef8009ff4f"; 

app.use(cors());
app.use(express.json());

// Utility function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

app.post("/recommendations", async (req, res) => {
  const { days, categories } = req.body; // categories is an array

  // Filter destinations by selected categories
  let filtered = destinations.filter(d => categories.includes(d.category));

  // Shuffle so results are random
  filtered = shuffleArray(filtered);

  const itinerary = [];
  let remainingDays = days;

  for (let place of filtered) {
    if (place.duration <= remainingDays) {
      // Fetch weather data (optional)
      let weatherData = place.weather || { condition: "N/A", avgTemp: "N/A" };
      try {
        if (place.lat && place.lon && WEATHER_API_KEY !== "YOUR_API_KEY_HERE") {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${place.lat}&lon=${place.lon}&appid=${WEATHER_API_KEY}&units=metric`
          );
          const data = response.data;
          weatherData = {
            condition: data.weather[0].main,
            avgTemp: data.main.temp + "°C",
          };
        }
      } catch (err) {
        weatherData = { condition: "N/A", avgTemp: "N/A" };
      }

      itinerary.push({
        dayStart: days - remainingDays + 1,
        dayEnd: days - remainingDays + place.duration,
        ...place,
        weather: weatherData,
      });

      remainingDays -= place.duration;
    }
    if (remainingDays <= 0) break;
  }

  res.json(itinerary);
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
