import React from 'react'
import { FaTemperatureHigh , FaTemperatureLow  } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { BsFillSunFill } from 'react-icons/bs'
import { TbSunset2 } from 'react-icons/tb'
import { FiWind } from 'react-icons/fi'
import { iconURLfromCode } from '../helper/iconUrl'
import { formatToLocalTime } from '../helper/formatToLocalTime'

const TemperatureDetails = ({ weather }: any) => {
  const {
    sunrise,
    sunset,
    details,
    temp,
    temp_max,
    temp_min,
    timezone,
    feels_like,
    humidity,
    speed,
    icon
  } = weather
  const iconurl = iconURLfromCode(icon)

  return (
    <>
      <div className="flex  flex-row text-white justify-center items-center my-6 py-4 text-xl">
        <p className="text-cyan-300">{details} </p>
      </div>
      <div className="flex flex-wrap flex-row items-center justify-center space-x-4 md:space-x-0 space-y-4 md:space-y-1 sm:justify-between text-white py-3">
        <img src={iconurl} alt="" className="w-20" />
        <p className="text-3xl">{temp}°</p>
        <div>
          <div className=" font-roboto flex flex-row justify-center items-center gap-4 text-left">
            <FaTemperatureHigh className="" />
            <p className="text-white text-sm font-light">
              RealFeel {feels_like}°
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex justify-start">
              <WiHumidity />
            </div>
            <p className="text-white text-sm font-light">
              Humidity {humidity} %
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-4">
            <div className="flex justify-start">
              <FiWind />
            </div>
            <p className="text-white text-sm font-light ml-auto">
              Wind Speed {speed} km/h
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-col-4 md:grid-cols-4 space-x-2 text-white font-roboto text-sm py-4">
        <div className="flex flex-row gap-4  justify-center md:justify-start">
          <div className="font-light flex flex-row justify-center items-center">
            <BsFillSunFill className="text-white mr-2" />
            SunRise :
            <span className="font-medium ml-2 text-[12px]">
              {formatToLocalTime(sunrise, timezone, 'hh:mm a')}
            </span>
          </div>
          <span className="font-light hidden md:flex md:justify-center md:items-center">
            |
          </span>
        </div>
        <div className="flex flex-row gap-4  justify-center md:justify-start">
          <div className="font-light flex flex-row justify-center items-center">
            <TbSunset2 className="text-white mr-2" />
            SunSet :
            <span className="font-medium ml-2 text-[12px]">
              {formatToLocalTime(sunset, timezone, 'hh:mm a')}{' '}
            </span>
          </div>
          <span className="font-light hidden md:flex md:justify-center md:items-center">
            |
          </span>
        </div>
        <div className="flex flex-row gap-4  justify-center md:justify-start">
          <div className="font-light flex flex-row justify-center items-center">
            <FaTemperatureHigh className="text-white mr-2" />
            HighTemp:
            <span className="font-medium ml-2 text-[12px]">{temp_max}°</span>
          </div>
          <span className="font-light hidden md:flex md:justify-center md:items-center">
            |
          </span>
        </div>
        <div className="flex flex-row gap-4  justify-center md:justify-start">
          <div className="font-light flex flex-row justify-center items-center">
            <FaTemperatureLow className="text-white mr-2 " />
            LowTemp:{' '}
            <span className="font-medium ml-2 text-[12px]">{temp_min}° </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TemperatureDetails
