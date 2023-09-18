import { getWeatherData } from '../services'
import { getFormattedData } from './getFormattedData'

export const getFormattedWeatherData = async (searchParams: any) => {
  const formattedCurrentWeather = await getWeatherData('weather', searchParams)
//   console.log(' weather details')
//   console.log(formattedCurrentWeather)

  return getFormattedData(formattedCurrentWeather)
}
