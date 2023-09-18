import React, { useEffect, useState } from 'react'
import LocationButtons from '../components/LocationButtons'
import SearchBox from '../components/SearchBox'
import DateTime from '../components/DateTime'
import TemperatureDetails from '../components/TemperatureDetails'
import Forecast from '../components/Forecast'
// import { getWeatherData } from '../services'
// import { getFormattedData} from '../helper/getFormattedData'
import { getFormattedWeatherData } from '../helper/getFormattedWeatherData'
import { getFormattedForecastData } from '../helper/getFormattedForecastData'

const Home = () => {
  const [query, setQuery] = useState({ q: 'Bangalore', units: 'metric' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState<any>(null)
  const [dailyforecast, setDailyForecast] = useState<any>(null)
  const [hourlyforecast, setHourlyForecast] = useState<any>(null)
  
  const handleSetQuery = (query: any) => {
    // console.log('QUERY' + query)
    setQuery(query)
  }


  useEffect(() => {
    const fetchWeather = async () => {
      //   const data = await getWeatherData('weather', { q: 'dhubri' })
      const data = await getFormattedWeatherData(query)
    //   console.log(data)
      setWeather(data)
      const { lat, lon } = data
    //   console.log('lat lon')
    //   console.log(lat, lon)

      const { daily, hourly } = await getFormattedForecastData(
        lat,
        lon,
        'metric'
      )

    //   console.log('FORECAST')
    //   console.log(daily)
    //   console.log(hourly)

      setDailyForecast(daily)
      setHourlyForecast(hourly)
    }
    fetchWeather()
  }, [query])
  return (
    <div
      className="mx-auto max-w-screen-md mt-4  h-fit
  py-5 px-16 bg-gradient-to-br from-cyan-700 to-blue-700  shadow-xl 
  shadow-gray-400"
    >
      <LocationButtons handleSetQuery={handleSetQuery} />
      <SearchBox handleSetQuery={handleSetQuery} />
      <>
        {weather && (
          <>
            <DateTime weather={weather} />
            <TemperatureDetails weather={weather} />
            {dailyforecast && (
              <>
                <Forecast
                  forecast={hourlyforecast}
                  forecastType="Hourly Forecast"
                />
                <Forecast
                  forecast={dailyforecast}
                  forecastType="Daily Forecast"
                />
              </>
            )}
          </>
        )}
      </>
    </div>
  )
}

export default Home
