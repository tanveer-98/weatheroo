import { Autocomplete } from '@mui/material'
import { useState } from 'react'
import TextField from '@mui/material/TextField'
import { suggestions } from '../constants'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaLocationDot } from 'react-icons/fa6'
import { LightTooltip } from './LightToolTip'
import { getLocation } from '../helper/getLatLon'




interface InewValue {
  id: number
  label: string
}

const SearchBox = ({handleSetQuery}:any) => {
  const [location, setLocation] = useState('')
  const onChangeHandler = (e: any) => {
    setLocation(e.target.value)
    // console.log(e.target.value)
   
  }
  const handleGetLocation = async () => {
    const data = await getLocation()
    handleSetQuery({lat: data.latitude, lon: data.longitude ,units:"metric"})
    // console.log(data)
  }

  const onSubmitHandler = (e: any) => {
    e.preventDefault()
    // console.log(location)
     handleSetQuery({q:location , units : "metric"})
  }
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4  items-center justify-center space-x-4 tracking-tight">
        <form
          action=""
          onSubmit={onSubmitHandler}
          className="flex flex-row space-x-8"
        >
          <div className="flex flex-row space-x-2">
            <Autocomplete
              freeSolo
              id="location-search-box"
              onInputChange={(event, value) => setLocation(value)}
              options={suggestions}
              sx={{ width: 300, color: 'white' }}
              className="outline-white border-white font-extralight text-white"
              renderInput={(params) => (
                <TextField {...params} label="Location" />
              )}
              onChange={(event: any, newValue: any) => {
                if (newValue !== null) setLocation(newValue!.label)
              }}
            />
            <button type="submit" className="bg-blue">
              <AiOutlineSearch className="text-2xl text-white" />
            </button>
          </div>
          <div className="flex flex-row space-x-4">
            <LightTooltip title="Get Current Location">
              <button type="button" className="bg-blue">
                <FaLocationDot
                  className="text-xl text-white hover:scale-110"
                  onClick={handleGetLocation}
                />
              </button>
            </LightTooltip>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBox
