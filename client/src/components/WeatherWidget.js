import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = 'c377f2105bc0ec29775cf91edc9226ab';
        
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await response.json();
          if (data.cod !== 200) {
            throw new Error(data.message);
          }
          setWeather(data);
        } catch (error) {
          console.error("Weather fetch error:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }, (err) => {
        setError("Location access denied");
        setLoading(false);
      });
    } else {
      setError("Geolocation not supported");
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="weather-widget">Loading weather...</div>;
  if (error) return <div className="weather-widget">Error: {error}</div>;
  if (!weather || !weather.main) return null;

  return (
    <div className="weather-widget">
      <span>{Math.round(weather.main.temp)}°C</span>
      {weather.weather && weather.weather[0] && (
        <img 
          src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
        />
      )}
    </div>
  );
};

export default WeatherWidget;