import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../modules/WeatherApp.module.scss";

const WeatherApp = () => {
  const [city, setCity] = useState("Tbilisi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "7613e4a1a94e6aabee506df6d295566d";

  const fetchWeatherData = () => {
    if (!city.trim()) {
      setError("You must enter a city to begin.");
      return;
    }
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((res) => {
        setWeatherData(res.data);
        setError(null);
      });
  };

  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  const handleSearch = () => {
    console.log("clicked");
    fetchWeatherData();
    setError(null);
  };

  return (
    <>
      <div className={styles["container"]}>
        <h1>Weather</h1>
        <div className={styles["input-container"]}>
          <input
            type="text"
            placeholder="Type City Here..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={styles["input-field"]}
          />
          <button onClick={handleSearch} className={styles["button"]}>
            Search
          </button>
        </div>
        {error && <p className={styles["error"]}>{error}</p>}
        {weatherData && (
          <div className={styles["weather-container"]}>
            <h2>{`Weather in ${weatherData.name || city}`}</h2>
            {weatherData.main && (
              <>
                <p
                  className={styles["weather-info"]}
                >{`${weatherData.main.temp}℃`}</p>
                <p
                  className={styles["weather-info"]}
                >{`Humidity: ${weatherData.main.humidity}%`}</p>
              </>
            )}
            {weatherData.wind && (
              <>
                <p
                  className={styles["weather-info"]}
                >{`Wind Speed: ${weatherData.wind.speed}`}</p>
              </>
            )}

            {weatherData.weather && (
              <>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                  className={styles["weather-icon"]}
                />
                <p
                  className={styles["weather-info"]}
                >{`Weather: ${weatherData.weather[0].description}`}</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherApp;
