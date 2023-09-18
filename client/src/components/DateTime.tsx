import React from 'react'
import { formatToLocalTime } from '../helper/formatToLocalTime'

const DateTime = ({weather: {dt,timezone,name,country}} :any) => {
const date = formatToLocalTime(dt,timezone)
  return (
    <>
      <div className="flex items-center justify-center my-12">
        <p className="text-white text-xl font-extralight">
          {date}
        </p>
      </div>
      <div className="flex items-center justify-center font-bold tracking-tighter text-white font-roboto">
        <p className="text-white text-2xl md:text-3xl font-medium">
          {name} , {country}
        </p>
      </div>
    </>
  )
}

export default DateTime
