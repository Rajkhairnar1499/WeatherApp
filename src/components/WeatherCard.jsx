import { Box } from "@mui/system";
import "./WeatherApp.css";

function WeatherCard({ location, weather, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h1
        sx={{ fontSize: 24, marginTop: 4 }}
      >{` ${location.name}, ${location.country}`}</h1>
      <Box className="card">
        <Box>
          <img className="icon" src={icon} />
        </Box>
        <Box>
          <Box className="card-content">
            <p>Temperature</p>
            <p>{`${weather.temp_c}°C / ${weather.temp_f}°F`}</p>
          </Box>
          <Box className="card-content">
            <p>Condition</p>
            <p>{`${weather.condition.text}`}</p>
          </Box>
          <Box className="card-content">
            <p>Wind Speed</p>
            <p>{`${weather.wind_kph} km/h`}</p>
          </Box>
          <Box className="card-content">
            <p>Humidity</p>
            <p>{`${weather.humidity}%`}</p>
          </Box>
          <Box className="card-content">
            <p>Cloud Coverage</p>
            <p>{`${weather.cloud}%`}</p>
          </Box>
          <Box className="card-content">
            <p>Last Updated</p>
            <p>{`${weather.last_updated}`}</p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WeatherCard;
