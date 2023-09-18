import { getWeatherData } from "../services";

export const getFormattedData = (data: any) => {
  const {
    name : name,
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    dt,
    sys: { country, sunset, sunrise },
    weather,
    wind: { speed }
  } = data
   const {main:details , icon} = weather[0];
//    console.log(icon)
  return {
    name,
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    dt,
    country,
    sunset,
    sunrise,
    details , 
    icon,
    speed
  }
}

