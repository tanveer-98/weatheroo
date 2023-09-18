import React from 'react'
import { iconURLfromCode } from '../helper/iconUrl'
interface IDailyForecast {
  forecastType: string
  forecast: any
}
const DailyForecast = ({ forecastType, forecast }: IDailyForecast) => {
  // console.log('FORECAST')
  // console.log(forecast)
  const { title, temp, icon } = forecast
  
  const iconurl = iconURLfromCode(icon)
  // console.log(iconurl)
  return (
    <div className="mt-2 font-roboto flex flex-col justify-center items-center">
      <p className="uppercase font-bold tracking-widest text-white self-start mr-auto">
        {forecastType}
      </p>
      <hr className="my-2 bg-white h-[1px] w-full" />
      <div className="flex flex-row justify-around w-full items-center">

        {
          forecast.map((item:any)=>{
            return (
              <div className="flex flex-col justify-between">
                <p className="font-medium text-sm text-white"> {item.title}</p>
                <img
                  src={iconURLfromCode(item.icon)}
                  alt="weather icon"
                  className="w-12 my-2"
                />
                <p className="text-center font-[12px] text-white">
                  {item.temp}°
                </p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default DailyForecast
