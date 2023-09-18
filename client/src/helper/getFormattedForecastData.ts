import { getWeatherData } from '../services'
import { formatToLocalTime } from './formatToLocalTime'
import { getFormattedData } from './getFormattedData'

const formatForecastData = (data: any) => {
  const {
    city: { timezone },
    list
  } = data
  const uniqueDatelist = new Set()

  const daily = list.filter((item: any) => {
    if (!uniqueDatelist.has(item.dt_txt.split(' ')[0])) {
      uniqueDatelist.add(item.dt_txt.split(' ')[0])
      return true
    } else return false
  }).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'ccc'),
      temp: d.main.temp,
      icon: d.weather[0].icon
    }
  })
  // console.log('DAILY')
  // console.log(daily)

  // return first 5 elements
  const hourly = list.slice(1, 6).map((d: any) => {
    return {
      title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
      temp: d.main.temp,
      icon: d.weather[0].icon
    }
  })

  // console.log('HOURLY')
  // console.log(hourly)
  //   console.log(timezone)

  return {daily , hourly}
}

export const getFormattedForecastData = async (
  lat: any,
  lon: any,
  units: any
) => {
  console.log(lat, lon, units)
  const formattedCurrentForecast = await getWeatherData('forecast', {
    lat,
    lon,
    exclude: encodeURI('current,minutely,alerts'),
    units: units
  })

  //   return getFormattedData(formattedCurrentForecast)
//   console.log(formattedCurrentForecast)
//   console.log(formatForecastData(formattedCurrentForecast))
  return formatForecastData(formattedCurrentForecast)
}
