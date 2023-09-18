import React from 'react'
import { suggestions } from '../constants'

const LocationButtons = ({ handleSetQuery }: any) => {
  const handleSet = (value: any) => {
    handleSetQuery({ q: value, units: 'metric' })
  }
  return (
    <div className="w-full flex justify-center flex-wrap">
      {suggestions.map((suggestion) => {
        return (
          <button
            onClick={() => handleSet(suggestion.label)}
            className="rounded-md w-fit-content text-white hover:text-slate-400 transition-all  duration-300 font-roboto mx-auto h-auto px-2 py-2 shadow-black hover:shadow-none"
          >
            {suggestion.label}
          </button>
        )
      })}
    </div>
  )
}

export default LocationButtons
