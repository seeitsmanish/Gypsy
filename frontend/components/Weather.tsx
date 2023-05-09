"use client";
import React from "react";
import { useEffect, useState } from "react";

import styles from "../styles/weather.module.css";
import FeatherIcon from "feather-icons-react";

function Weather({ lat, lon }) {
  const [weatherObj, setWeatherObj] = useState({
    temp: 0,
    weather: "Not Available",
    wind: "-",
  });
  const key = "35f31b82fd9b0c3cd70bc65fc7dc9ed6";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    )
      .then((data) => data.json())
      .then((string) => {
        console.log(string);
        setWeatherObj({
          temp: string.main.temp,
          weather: string.weather[0].description,
          wind: string.wind.speed,
        });
      });
  }, [lat, lon]);

  const celsius = weatherObj.temp - 273.15; // Convert Kelvin to Celsius
  const temperature = `${Math.round(celsius)}°C`; // Round to nearest whole number and add degree symbol

  let iconClassName = "";
  if (celsius > 20) {
    iconClassName = "sun"; // Use sun icon for temperatures above 20°C
  } else if (celsius > 0) {
    iconClassName = "cloud"; // Use cloud icon for temperatures between 0°C and 20°C
  } else {
    iconClassName = "cloud-snow"; // Use snow icon for temperatures below 0°C
  }

  return (
    <div className={styles.display}>
      <div className={styles.division}>
        <FeatherIcon className={styles.icon} icon={iconClassName} />
        <div className={styles.data}>{temperature}</div>
      </div>
      <div>{weatherObj.weather}</div>

      <div className={styles.division}>
        <FeatherIcon className={styles.icon} icon="wind" />
        {weatherObj.wind}
      </div>
    </div>
  );
}

export default React.memo(Weather);
