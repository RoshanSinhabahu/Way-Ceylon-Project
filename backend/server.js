require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // Import database connection
const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// If you want real weather from OpenWeather, replace with your API key
const WEATHER_API_KEY = "dbd7518c79ed5f36698bf4ef8009ff4f";

app.use(cors());
app.use(express.json());

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: "Failed to authenticate token" });
    req.userId = decoded.id;
    next();
  });
};

// Utility function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// User Registration
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields required" });

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    await db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({ error: "Server error" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) return res.status(404).json({ error: "User not found" });

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Save Itinerary
app.post("/save-itinerary", verifyToken, async (req, res) => {
  const { itinerary } = req.body;
  if (!itinerary) return res.status(400).json({ error: "Itinerary data required" });

  try {
    await db.query("INSERT INTO saved_itineraries (user_id, itinerary) VALUES (?, ?)", [req.userId, JSON.stringify(itinerary)]);
    res.status(201).json({ message: "Itinerary saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get User's Itineraries
app.get("/my-itineraries", verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM saved_itineraries WHERE user_id = ? ORDER BY created_at DESC", [req.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Itinerary
app.delete("/my-itineraries/:id", verifyToken, async (req, res) => {
  try {
    await db.query("DELETE FROM saved_itineraries WHERE id = ? AND user_id = ?", [req.params.id, req.userId]);
    res.json({ message: "Itinerary deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Featured Destinations (Random High Likes)
app.get("/destinations/featured", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM destinations");
    // Add fake 'likes' count and shuffle
    const featured = shuffleArray(rows).slice(0, 8).map(place => ({
      ...place,
      likes: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000 // Random likes between 1000-5000
    }));
    res.json(featured);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Budget Friendly Destinations (Low Cost)
app.get("/destinations/budget", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM destinations WHERE cost <= 2500");
    const budgetFriendly = shuffleArray(rows).slice(0, 8);
    res.json(budgetFriendly);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/recommendations", async (req, res) => {
  const { days, categories } = req.body; // categories is an array

  try {
    // Fetch all destinations from the database
    // Fetch all destinations from the database
    console.log("Fetching data from MySQL database...");
    const [rows] = await db.query("SELECT * FROM destinations");
    console.log(`Fetched ${rows.length} destinations from database.`);

    // Filter destinations by selected categories
    // Note: Ensure categories coming from frontend match the DB values ('culture', 'beach', 'nature', 'adventure')
    let filtered = rows.filter(d => categories.includes(d.category));

    // Shuffle so results are random
    filtered = shuffleArray(filtered);

    const itinerary = [];
    let remainingDays = days;

    for (let place of filtered) {
      if (place.duration <= remainingDays) {
        // Fetch weather data (optional)
        // Note: 'weather' property is not in DB, so we initialize it here
        let weatherData = { condition: "N/A", avgTemp: "N/A" };

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

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
