import  { useState, useEffect } from "react";
// import { AppBar, Typography, TextField, Toolbar } from "@material-ui/core";
import { Box, AppBar, Typography, TextField, Toolbar } from "@mui/material";

import axios from "axios";
import WeatherCard from "./WeatherCard.jsx";

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Mumbai");
  const [identifier, setIdentifier] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(city) {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=4a2439a92eb14beaa0c140618232611&q=${city}&days=1&aqi=no&alerts=no`
        );
        console.log(response.data);
        setWeatherData(response.data);
      } catch (e) {
        if (e.response.status === 400) {
          setError(e.response.data.error.message);
        } else {
          console.log(e.response.status);
        }
      } finally {
        setLoading(false);
      }
    }
    if (city) {
      fetchData(city);
    }
  }, [city]);

  const debounceSearch = (search, debounceTimeout) => {
    const func = (identifier) => {
      if (identifier) {
        clearTimeout(identifier);
      }
      identifier = setTimeout(() => {
        setCity(search);
      }, debounceTimeout);
      setIdentifier(identifier);
    };
    return func(identifier);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar className="header">
          <Typography variant="h6">Weather App</Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ marginTop: 4 }}>
          <TextField
            className="textfield"
            label="Enter location"
            variant="outlined"
            onChange={(e) => debounceSearch(e.target.value, 500)}
          />
        </Box>
        {loading ? (
          <p>Loading ...</p>
        ) : error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          weatherData && (
            <WeatherCard
              location={weatherData.location}
              weather={weatherData.current}
              icon={weatherData.current.condition.icon}
            />
          )
        )}
      </Box>
    </Box>
  );
}

export default WeatherApp;
